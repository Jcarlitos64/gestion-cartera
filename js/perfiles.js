// ==============================================
// perfiles.js - Gestión de perfiles (predefinidos y personalizados)
// ==============================================

const Perfiles = {
    // Perfiles predefinidos (5 perfiles)
    predefinidos: PERFILES_PREDEFINIDOS,
    
    // Perfiles personalizados
    personalizados: [],
    
    /**
     * Inicializa los perfiles
     */
    init: function() {
        this.cargarPersonalizados();
    },
    
    /**
     * Carga los perfiles personalizados del storage
     */
    cargarPersonalizados: function() {
        this.personalizados = Storage.cargarPerfiles();
    },
    
    /**
     * Guarda los perfiles personalizados en storage
     */
    guardarPersonalizados: function() {
        Storage.guardarPerfiles(this.personalizados);
    },
    
    /**
     * Obtiene un perfil predefinido por su clave
     */
    obtenerPredefinido: function(clave) {
        return this.predefinidos[clave] || null;
    },
    
    /**
     * Aplica un perfil a los inputs de porcentajes
     */
    aplicarPerfil: function(perfil) {
        document.getElementById('pctMonetario').value = perfil.monetario;
        document.getElementById('pctRFCorto').value = perfil.rfCorto;
        document.getElementById('pctRFMedio').value = perfil.rfMedio;
        document.getElementById('pctRV').value = perfil.rv;
        document.getElementById('pctAlternativos').value = perfil.alternativos;
        
        // Guardar en storage
        Storage.guardarPorcentajes({
            monetario: perfil.monetario,
            rfCorto: perfil.rfCorto,
            rfMedio: perfil.rfMedio,
            rv: perfil.rv,
            alternativos: perfil.alternativos
        });
        
        // Actualizar UI si existe la función
        if (typeof Cartera !== 'undefined' && Cartera.actualizarUI) {
            Cartera.actualizarUI();
        }
    },
    
    /**
     * Aplica un perfil predefinido
     */
    aplicarPredefinido: function(clave) {
        let perfil = this.obtenerPredefinido(clave);
        if (perfil) {
            this.aplicarPerfil(perfil);
            return true;
        }
        return false;
    },
    
    /**
     * Aplica un perfil personalizado por índice
     */
    aplicarPersonalizado: function(indice) {
        if (indice >= 0 && indice < this.personalizados.length) {
            this.aplicarPerfil(this.personalizados[indice]);
            return true;
        }
        return false;
    },
    
    /**
     * Añade un nuevo perfil personalizado
     */
    agregarPersonalizado: function(nombre, monetario, rfCorto, rfMedio, rv, alternativos) {
        // Validar que sumen 100
        let total = monetario + rfCorto + rfMedio + rv + alternativos;
        if (Math.abs(total - 100) > 0.01) {
            return { success: false, message: `Los porcentajes deben sumar 100%. Actual: ${total.toFixed(1)}%` };
        }
        
        let nuevo = {
            nombre: nombre,
            monetario: monetario,
            rfCorto: rfCorto,
            rfMedio: rfMedio,
            rv: rv,
            alternativos: alternativos
        };
        
        this.personalizados.push(nuevo);
        this.guardarPersonalizados();
        return { success: true, perfil: nuevo };
    },
    
    /**
     * Edita un perfil personalizado existente
     */
    editarPersonalizado: function(indice, nombre, monetario, rfCorto, rfMedio, rv, alternativos) {
        if (indice < 0 || indice >= this.personalizados.length) {
            return { success: false, message: 'Perfil no encontrado' };
        }
        
        // Validar que sumen 100
        let total = monetario + rfCorto + rfMedio + rv + alternativos;
        if (Math.abs(total - 100) > 0.01) {
            return { success: false, message: `Los porcentajes deben sumar 100%. Actual: ${total.toFixed(1)}%` };
        }
        
        this.personalizados[indice] = {
            nombre: nombre,
            monetario: monetario,
            rfCorto: rfCorto,
            rfMedio: rfMedio,
            rv: rv,
            alternativos: alternativos
        };
        
        this.guardarPersonalizados();
        return { success: true };
    },
    
    /**
     * Elimina un perfil personalizado
     */
    eliminarPersonalizado: function(indice) {
        if (indice < 0 || indice >= this.personalizados.length) {
            return false;
        }
        this.personalizados.splice(indice, 1);
        this.guardarPersonalizados();
        return true;
    },
    
    /**
     * Actualiza el selector de perfiles en el DOM
     */
    actualizarSelector: function(selectorId) {
        let select = document.getElementById(selectorId);
        if (!select) return;
        
        select.innerHTML = '<option value="">-- Selecciona un perfil --</option>';
        this.personalizados.forEach((p, index) => {
            let opt = document.createElement('option');
            opt.value = index;
            opt.text = p.nombre;
            select.appendChild(opt);
        });
    },
    
    /**
     * Valida que los porcentajes actuales sumen 100
     */
    validarPorcentajesActuales: function() {
        let p1 = parseFloat(document.getElementById('pctMonetario').value) || 0;
        let p2 = parseFloat(document.getElementById('pctRFCorto').value) || 0;
        let p3 = parseFloat(document.getElementById('pctRFMedio').value) || 0;
        let p4 = parseFloat(document.getElementById('pctRV').value) || 0;
        let p5 = parseFloat(document.getElementById('pctAlternativos').value) || 0;
        let total = p1 + p2 + p3 + p4 + p5;
        
        let totalElement = document.getElementById('totalPorcentajes');
        if (totalElement) {
            totalElement.value = total.toFixed(1) + '%';
        }
        
        return Math.abs(total - 100) < 0.01;
    }
};