// ==============================================
// storage.js - Gestión unificada de localStorage
// ==============================================

const Storage = {
    // ==============================================
    // DATOS DE CARTERA
    // ==============================================
    
    /**
     * Guarda los datos actuales en el histórico
     */
    guardarTodo: function(datos) {
        // Calcular totales por categoría
        let monetario = 0, rfCorto = 0, rfMedio = 0, rv = 0, alternativos = 0;
        
        if (datos.fondos) {
            datos.fondos.forEach(f => {
                let valor = f.cantidad * f.precioActual;
                switch(f.categoria) {
                    case 'monetario': monetario += valor; break;
                    case 'rfCorto': rfCorto += valor; break;
                    case 'rfMedio': rfMedio += valor; break;
                    case 'rv': rv += valor; break;
                    case 'alternativos': alternativos += valor; break;
                }
            });
        }
        
        // Sumar totales directos
        if (datos.monetario) monetario += datos.monetario;
        if (datos.rfCorto) rfCorto += datos.rfCorto;
        if (datos.rfMedio) rfMedio += datos.rfMedio;
        if (datos.rv) rv += datos.rv;
        if (datos.alternativos) alternativos += datos.alternativos;
        
        let totalFondos = monetario + rfCorto + rfMedio + rv + alternativos;
        let totalETFs = (datos.etfs || []).reduce((s, e) => s + e.cantidad * e.precioActual, 0);
        let total = totalFondos + totalETFs + (datos.efectivo || 0) + (datos.inmobiliario || 0);
        
        let registro = {
            fecha: new Date().toLocaleDateString(),
            hora: new Date().toLocaleTimeString(),
            timestamp: Date.now(),
            monetario: monetario,
            rfCorto: rfCorto,
            rfMedio: rfMedio,
            rv: rv,
            alternativos: alternativos,
            efectivo: datos.efectivo || 0,
            inmobiliario: datos.inmobiliario || 0,
            fondos: datos.fondos ? datos.fondos.map(f => ({...f})) : [],
            etfs: datos.etfs ? datos.etfs.map(e => ({...e})) : [],
            total: total,
            porcentajes: this.obtenerPorcentajes()
        };
        
        let historico = this.obtenerHistorico();
        historico.push(registro);
        localStorage.setItem('historicoRebalanceos', JSON.stringify(historico));
        return registro;
    },
    
    /**
     * Carga los últimos datos guardados
     */
    cargarUltimosDatos: function() {
        let historico = this.obtenerHistorico();
        if (historico.length > 0) {
            let ultimo = historico[historico.length - 1];
            return {
                monetario: ultimo.monetario || 0,
                rfCorto: ultimo.rfCorto || 0,
                rfMedio: ultimo.rfMedio || 0,
                rv: ultimo.rv || 0,
                alternativos: ultimo.alternativos || 0,
                efectivo: ultimo.efectivo || 0,
                inmobiliario: ultimo.inmobiliario || 0,
                fondos: ultimo.fondos || [],
                etfs: ultimo.etfs || []
            };
        }
        return {
            monetario: 0, rfCorto: 0, rfMedio: 0, rv: 0, alternativos: 0,
            efectivo: 0, inmobiliario: 0, fondos: [], etfs: []
        };
    },
    
    /**
     * Obtiene el histórico completo
     */
    obtenerHistorico: function() {
        return JSON.parse(localStorage.getItem('historicoRebalanceos')) || [];
    },
    
    /**
     * Limpia el histórico
     */
    limpiarHistorico: function() {
        localStorage.removeItem('historicoRebalanceos');
    },
    
    // ==============================================
    // PORCENTAJES OBJETIVO
    // ==============================================
    
    /**
     * Guarda los porcentajes objetivo
     */
    guardarPorcentajes: function(pcts) {
        localStorage.setItem('pctMonetario', pcts.monetario || 5);
        localStorage.setItem('pctRFCorto', pcts.rfCorto || 15);
        localStorage.setItem('pctRFMedio', pcts.rfMedio || 25);
        localStorage.setItem('pctRV', pcts.rv || 40);
        localStorage.setItem('pctAlternativos', pcts.alternativos || 15);
    },
    
    /**
     * Obtiene los porcentajes objetivo
     */
    obtenerPorcentajes: function() {
        return {
            monetario: parseFloat(localStorage.getItem('pctMonetario')) || 5,
            rfCorto: parseFloat(localStorage.getItem('pctRFCorto')) || 15,
            rfMedio: parseFloat(localStorage.getItem('pctRFMedio')) || 25,
            rv: parseFloat(localStorage.getItem('pctRV')) || 40,
            alternativos: parseFloat(localStorage.getItem('pctAlternativos')) || 15
        };
    },
    
    /**
     * Valida que los porcentajes sumen 100
     */
    validarPorcentajes: function(pcts) {
        let total = pcts.monetario + pcts.rfCorto + pcts.rfMedio + pcts.rv + pcts.alternativos;
        return Math.abs(total - 100) < 0.01;
    },
    
    // ==============================================
    // PERFILES PERSONALIZADOS
    // ==============================================
    
    /**
     * Carga los perfiles guardados
     */
    cargarPerfiles: function() {
        let guardados = localStorage.getItem('perfilesPersonalizados');
        return guardados ? JSON.parse(guardados) : [];
    },
    
    /**
     * Guarda los perfiles
     */
    guardarPerfiles: function(perfiles) {
        localStorage.setItem('perfilesPersonalizados', JSON.stringify(perfiles));
    },
    
    // ==============================================
    // CARTERAS MÚLTIPLES
    // ==============================================
    
    /**
     * Guarda el estado en la cartera activa
     */
    guardarEstadoEnCartera: function(carteraActiva) {
        let carteras = JSON.parse(localStorage.getItem('carteras')) || {};
        
        let datosActuales = {
            historico: this.obtenerHistorico(),
            perfiles: this.cargarPerfiles(),
            porcentajes: this.obtenerPorcentajes(),
            alertas: this.cargarAlertas(),
            tema: localStorage.getItem('tema') || TEMA_PREDETERMINADO
        };
        
        carteras[carteraActiva] = datosActuales;
        localStorage.setItem('carteras', JSON.stringify(carteras));
    },
    
    /**
     * Carga una cartera por nombre
     */
    cargarCartera: function(nombre) {
        let carteras = JSON.parse(localStorage.getItem('carteras')) || {};
        if (!carteras[nombre]) return false;
        
        let datos = carteras[nombre];
        localStorage.setItem('historicoRebalanceos', JSON.stringify(datos.historico || []));
        localStorage.setItem('perfilesPersonalizados', JSON.stringify(datos.perfiles || []));
        
        if (datos.porcentajes) {
            this.guardarPorcentajes(datos.porcentajes);
        }
        
        if (datos.alertas) this.guardarAlertas(datos.alertas);
        if (datos.tema) {
            localStorage.setItem('tema', datos.tema);
            if (typeof UI !== 'undefined' && UI.aplicarTema) {
                UI.aplicarTema(datos.tema);
            }
        }
        
        localStorage.setItem('carteraActiva', nombre);
        return true;
    },
    
    // ==============================================
    // ALERTAS
    // ==============================================
    
    /**
     * Carga la configuración de alertas
     */
    cargarAlertas: function() {
        return JSON.parse(localStorage.getItem('alertas')) || {
            rebalanceo: false,
            etfPerdida: false
        };
    },
    
    /**
     * Guarda la configuración de alertas
     */
    guardarAlertas: function(alertas) {
        localStorage.setItem('alertas', JSON.stringify(alertas));
    },
    
    // ==============================================
    // EXPORTACIÓN / IMPORTACIÓN
    // ==============================================
    
    /**
     * Exporta todos los datos
     */
    exportarTodo: function() {
        let datos = {
            version: '2.0',
            fecha: new Date().toISOString(),
            carteraActiva: localStorage.getItem('carteraActiva') || 'default',
            carteras: JSON.parse(localStorage.getItem('carteras')) || {},
            alertas: this.cargarAlertas(),
            tema: localStorage.getItem('tema') || TEMA_PREDETERMINADO
        };
        
        let blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `backup_cartera_${new Date().toISOString().slice(0,10)}.json`;
        link.click();
    },
    
    /**
     * Importa datos desde archivo
     */
    importarDatos: function(jsonData) {
        try {
            let datos = JSON.parse(jsonData);
            
            if (!datos.version) {
                throw new Error('El archivo no parece un backup válido');
            }
            
            if (datos.carteras) localStorage.setItem('carteras', JSON.stringify(datos.carteras));
            if (datos.carteraActiva) localStorage.setItem('carteraActiva', datos.carteraActiva);
            if (datos.alertas) this.guardarAlertas(datos.alertas);
            if (datos.tema) {
                localStorage.setItem('tema', datos.tema);
            }
            
            if (datos.carteraActiva) {
                this.cargarCartera(datos.carteraActiva);
            }
            
            return { success: true, message: 'Datos importados correctamente' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
};