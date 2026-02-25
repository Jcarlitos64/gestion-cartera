// ==============================================
// cartera.js - Lógica principal de gestión de cartera
// ==============================================

const Cartera = {
    // Elementos del DOM (se inicializan en init)
    elementos: {},
    
    // Datos actuales
    datos: {
        monetario: 0,
        rfCorto: 0,
        rfMedio: 0,
        rv: 0,
        alternativos: 0,
        efectivo: 0,
        inmobiliario: 0
    },
    
    /**
     * Inicializa la página de cartera
     */
    init: function() {
        this.cacheElementos();
        this.cargarDatosIniciales();
        this.registrarEventListeners();
        this.actualizarUI();
        
        // Mostrar configuración inicial si no hay histórico
        let historico = Storage.obtenerHistorico();
        if (historico.length === 0) {
            let configDiv = document.getElementById('configInicial');
            if (configDiv) configDiv.style.display = 'block';
        } else {
            let configDiv = document.getElementById('configInicial');
            if (configDiv) configDiv.style.display = 'none';
        }
        
        // Inicializar ETFs
        if (typeof ETFs !== 'undefined') {
            ETFs.init();
        }
        
        // Actualizar selector de perfiles
        if (typeof Perfiles !== 'undefined') {
            Perfiles.actualizarSelector('selectorPerfil');
        }
        
        // Inicializar fecha DCA
        let fechaGuardada = localStorage.getItem('ultimaFechaDCA');
        if (fechaGuardada) {
            let fechaInput = document.getElementById('fechaAporte');
            if (fechaInput) fechaInput.value = fechaGuardada;
        } else {
            this.calcularProximaFecha();
        }
    },
    
    /**
     * Cachea los elementos del DOM
     */
    cacheElementos: function() {
        const ids = [
            'totalCartera', 'totalFondos', 'totalETFs', 'totalOtros',
            'impMon', 'impRFC', 'impRFM', 'impRV', 'impAlt',
            'efectivo', 'inmobiliario',
            'pctMonetario', 'pctRFCorto', 'pctRFMedio', 'pctRV', 'pctAlternativos',
            'totalPorcentajes',
            'dispPctMon', 'dispPctRFC', 'dispPctRFM', 'dispPctRV', 'dispPctAlt',
            'antMon', 'antRFC', 'antRFM', 'antRV', 'antAlt',
            'objMon', 'objRFC', 'objRFM', 'objRV', 'objAlt',
            'desvMon', 'desvRFC', 'desvRFM', 'desvRV', 'desvAlt',
            'capitalInicial', 'fondosInicial', 'etfsInicial', 'inmobiliarioInicial', 'efectivoInicial',
            'aporteMensual', 'periocidad', 'fechaAporte', 'tablaDCA', 'recomendacionDCA',
            'accionesDirectas', 'accionesDCA'
        ];
        
        ids.forEach(id => {
            this.elementos[id] = document.getElementById(id);
        });
    },
    
    /**
     * Carga los datos iniciales desde storage
     */
    cargarDatosIniciales: function() {
        let datos = Storage.cargarUltimosDatos();
        
        this.datos = {
            monetario: datos.monetario || 0,
            rfCorto: datos.rfCorto || 0,
            rfMedio: datos.rfMedio || 0,
            rv: datos.rv || 0,
            alternativos: datos.alternativos || 0,
            efectivo: datos.efectivo || 0,
            inmobiliario: datos.inmobiliario || 0
        };
        
        // Actualizar inputs
        if (this.elementos.impMon) this.elementos.impMon.value = this.datos.monetario;
        if (this.elementos.impRFC) this.elementos.impRFC.value = this.datos.rfCorto;
        if (this.elementos.impRFM) this.elementos.impRFM.value = this.datos.rfMedio;
        if (this.elementos.impRV) this.elementos.impRV.value = this.datos.rv;
        if (this.elementos.impAlt) this.elementos.impAlt.value = this.datos.alternativos;
        if (this.elementos.efectivo) this.elementos.efectivo.value = this.datos.efectivo;
        if (this.elementos.inmobiliario) this.elementos.inmobiliario.value = this.datos.inmobiliario;
        
        // Guardar valores anteriores
        this.guardarValoresAnteriores();
        
        // Cargar porcentajes
        let pcts = Storage.obtenerPorcentajes();
        if (this.elementos.pctMonetario) this.elementos.pctMonetario.value = pcts.monetario;
        if (this.elementos.pctRFCorto) this.elementos.pctRFCorto.value = pcts.rfCorto;
        if (this.elementos.pctRFMedio) this.elementos.pctRFMedio.value = pcts.rfMedio;
        if (this.elementos.pctRV) this.elementos.pctRV.value = pcts.rv;
        if (this.elementos.pctAlternativos) this.elementos.pctAlternativos.value = pcts.alternativos;
    },
    
    /**
     * Registra los event listeners
     */
    registrarEventListeners: function() {
        // Inputs de fondos
        FONDO_IDS.forEach(id => {
            let el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', (e) => {
                    this.ajustarFondo(e.target);
                    this.calcularRebalanceoDCA();
                });
            }
        });
        
        // Inputs de efectivo e inmobiliario
        if (this.elementos.efectivo) {
            this.elementos.efectivo.addEventListener('change', () => {
                this.actualizarUI();
                this.calcularRebalanceoDCA();
            });
        }
        if (this.elementos.inmobiliario) {
            this.elementos.inmobiliario.addEventListener('change', () => {
                this.actualizarUI();
                this.calcularRebalanceoDCA();
            });
        }
        
        // Inputs de porcentajes
        PCT_IDS.forEach(id => {
            let el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', () => {
                    Perfiles.validarPorcentajesActuales();
                    Storage.guardarPorcentajes({
                        monetario: parseFloat(document.getElementById('pctMonetario').value) || 0,
                        rfCorto: parseFloat(document.getElementById('pctRFCorto').value) || 0,
                        rfMedio: parseFloat(document.getElementById('pctRFMedio').value) || 0,
                        rv: parseFloat(document.getElementById('pctRV').value) || 0,
                        alternativos: parseFloat(document.getElementById('pctAlternativos').value) || 0
                    });
                    this.actualizarUI();
                    this.calcularRebalanceoDCA();
                });
            }
        });
        
        // Inputs de configuración inicial
        ['capitalInicial', 'fondosInicial', 'etfsInicial', 'inmobiliarioInicial'].forEach(id => {
            let el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', () => this.actualizarEfectivoInicial());
            }
        });
        
        // Listener para DCA (aporte mensual)
        let aporteInput = document.getElementById('aporteMensual');
        if (aporteInput) {
            aporteInput.addEventListener('input', () => {
                this.calcularDCA();
                this.calcularRebalanceoDCA();
            });
        }
        
        // Listener para periodicidad
        let periocidad = document.getElementById('periocidad');
        if (periocidad) {
            periocidad.addEventListener('change', () => {
                this.calcularProximaFecha();
                this.calcularDCA();
                this.calcularRebalanceoDCA();
            });
        }
        
        // Listener para fecha (cuando el usuario la cambie manualmente)
        let fechaInput = document.getElementById('fechaAporte');
        if (fechaInput) {
            fechaInput.addEventListener('change', () => {
                if (fechaInput.value) {
                    localStorage.setItem('ultimaFechaDCA', fechaInput.value);
                }
            });
        }
    },
    
    /**
     * Guarda los valores anteriores de los inputs
     */
    guardarValoresAnteriores: function() {
        FONDO_IDS.forEach(id => {
            let el = document.getElementById(id);
            if (el) {
                el.setAttribute('data-valor-anterior', el.value);
            }
        });
    },
    
    /**
     * Actualiza el efectivo inicial en configuración
     */
    actualizarEfectivoInicial: function() {
        let capital = parseFloat(this.elementos.capitalInicial?.value) || 0;
        let fondos = parseFloat(this.elementos.fondosInicial?.value) || 0;
        let etfs = parseFloat(this.elementos.etfsInicial?.value) || 0;
        let inmobiliario = parseFloat(this.elementos.inmobiliarioInicial?.value) || 0;
        
        if (this.elementos.efectivoInicial) {
            this.elementos.efectivoInicial.value = (capital - fondos - etfs - inmobiliario).toFixed(2);
        }
    },
    
    /**
     * Inicializa la cartera con los datos de configuración
     */
    inicializar: function() {
        let capital = parseFloat(this.elementos.capitalInicial?.value) || 0;
        let fondosInicial = parseFloat(this.elementos.fondosInicial?.value) || 0;
        let etfsInicial = parseFloat(this.elementos.etfsInicial?.value) || 0;
        let inmobiliarioInicial = parseFloat(this.elementos.inmobiliarioInicial?.value) || 0;
        let efectivoInicial = parseFloat(this.elementos.efectivoInicial?.value) || 0;
        
        // Validar que la suma sea correcta
        let sumaAsignada = fondosInicial + etfsInicial + inmobiliarioInicial + efectivoInicial;
        if (Math.abs(sumaAsignada - capital) > 0.01) {
            UI.mostrarAlerta('La suma de activos no coincide con el capital total', 'warning');
            return;
        }
        
        // Validar porcentajes
        if (!Perfiles.validarPorcentajesActuales()) {
            let total = parseFloat(this.elementos.totalPorcentajes?.value) || 0;
            UI.mostrarAlerta(`Los porcentajes deben sumar 100%. Actual: ${total}`, 'warning');
            return;
        }
        
        let pcts = [
            parseFloat(this.elementos.pctMonetario?.value) || 0,
            parseFloat(this.elementos.pctRFCorto?.value) || 0,
            parseFloat(this.elementos.pctRFMedio?.value) || 0,
            parseFloat(this.elementos.pctRV?.value) || 0,
            parseFloat(this.elementos.pctAlternativos?.value) || 0
        ];
        
        // Distribuir los fondos según porcentajes
        let fondos = pcts.map(p => fondosInicial * p / 100);
        
        if (this.elementos.impMon) this.elementos.impMon.value = fondos[0].toFixed(2);
        if (this.elementos.impRFC) this.elementos.impRFC.value = fondos[1].toFixed(2);
        if (this.elementos.impRFM) this.elementos.impRFM.value = fondos[2].toFixed(2);
        if (this.elementos.impRV) this.elementos.impRV.value = fondos[3].toFixed(2);
        if (this.elementos.impAlt) this.elementos.impAlt.value = fondos[4].toFixed(2);
        if (this.elementos.efectivo) this.elementos.efectivo.value = efectivoInicial.toFixed(2);
        if (this.elementos.inmobiliario) this.elementos.inmobiliario.value = inmobiliarioInicial.toFixed(2);
        
        // Limpiar ETFs si no hay valor inicial
        if (etfsInicial === 0 && typeof ETFs !== 'undefined') {
            ETFs.lista = [];
            ETFs.renderizar();
        } else if (etfsInicial > 0) {
            UI.mostrarAlerta('Has indicado un valor en ETFs/Acciones. Deberás añadirlos manualmente en la tabla de ETFs.', 'info');
        }
        
        this.guardarValoresAnteriores();
        this.actualizarUI();
        this.guardarTodo();
        
        // Ocultar configuración inicial y marcar como configurada
        let configDiv = document.getElementById('configInicial');
        if (configDiv) configDiv.style.display = 'none';
        
        localStorage.setItem('carteraConfigurada', 'true');
        
        UI.mostrarAlerta('✅ Cartera inicializada correctamente', 'info');
    },
    
    /**
     * Ajusta un fondo y actualiza el efectivo
     */
    ajustarFondo: function(input) {
        let nuevo = parseFloat(input.value) || 0;
        let anterior = parseFloat(input.getAttribute('data-valor-anterior')) || 0;
        let dif = nuevo - anterior;
        
        if (this.elementos.efectivo) {
            let efectivo = parseFloat(this.elementos.efectivo.value) || 0;
            this.elementos.efectivo.value = (efectivo - dif).toFixed(2);
        }
        
        input.setAttribute('data-valor-anterior', nuevo);
        this.actualizarUI();
    },
    
    /**
     * Actualiza toda la interfaz
     */
    actualizarUI: function() {
        // Obtener valores actuales
        let fondos = [
            parseFloat(this.elementos.impMon?.value) || 0,
            parseFloat(this.elementos.impRFC?.value) || 0,
            parseFloat(this.elementos.impRFM?.value) || 0,
            parseFloat(this.elementos.impRV?.value) || 0,
            parseFloat(this.elementos.impAlt?.value) || 0
        ];
        
        let totalFondos = fondos.reduce((a, b) => a + b, 0);
        let efectivo = parseFloat(this.elementos.efectivo?.value) || 0;
        let inmobiliario = parseFloat(this.elementos.inmobiliario?.value) || 0;
        let totalETFs = typeof ETFs !== 'undefined' ? ETFs.calcularTotal() : 0;
        let total = totalFondos + totalETFs + efectivo + inmobiliario;
        
        // Actualizar resúmenes
        if (this.elementos.totalFondos) {
            this.elementos.totalFondos.innerText = UI.formatearMoneda(totalFondos);
        }
        if (this.elementos.totalETFs) {
            this.elementos.totalETFs.innerText = UI.formatearMoneda(totalETFs);
        }
        if (this.elementos.totalOtros) {
            this.elementos.totalOtros.innerText = UI.formatearMoneda(efectivo + inmobiliario);
        }
        if (this.elementos.totalCartera) {
            this.elementos.totalCartera.innerText = UI.formatearMoneda(total);
        }
        
        // Actualizar porcentajes mostrados en la tabla
        let pcts = [
            parseFloat(this.elementos.pctMonetario?.value) || 0,
            parseFloat(this.elementos.pctRFCorto?.value) || 0,
            parseFloat(this.elementos.pctRFMedio?.value) || 0,
            parseFloat(this.elementos.pctRV?.value) || 0,
            parseFloat(this.elementos.pctAlternativos?.value) || 0
        ];
        
        // Validar suma de porcentajes
        let totalPct = pcts.reduce((a, b) => a + b, 0);
        if (this.elementos.totalPorcentajes) {
            this.elementos.totalPorcentajes.value = totalPct.toFixed(1) + '%';
        }
        
        let dispPcts = ['dispPctMon', 'dispPctRFC', 'dispPctRFM', 'dispPctRV', 'dispPctAlt'];
        dispPcts.forEach((id, i) => {
            if (this.elementos[id]) {
                this.elementos[id].innerText = pcts[i] + '%';
            }
        });
        
        // Calcular objetivos (sobre total de fondos)
        let objetivos = pcts.map(p => totalFondos * p / 100);
        let objIds = ['objMon', 'objRFC', 'objRFM', 'objRV', 'objAlt'];
        objIds.forEach((id, i) => {
            if (this.elementos[id]) {
                this.elementos[id].innerText = UI.formatearMoneda(objetivos[i]);
            }
        });
        
        // Calcular desviaciones
        let desvIds = ['desvMon', 'desvRFC', 'desvRFM', 'desvRV', 'desvAlt'];
        desvIds.forEach((id, i) => {
            if (this.elementos[id]) {
                if (objetivos[i] > 0) {
                    let desv = ((fondos[i] - objetivos[i]) / objetivos[i] * 100).toFixed(1);
                    this.elementos[id].innerHTML = desv + '%';
                    // Aplicar clase de color
                    if (parseFloat(desv) > 0) {
                        this.elementos[id].className = 'positivo';
                    } else if (parseFloat(desv) < 0) {
                        this.elementos[id].className = 'negativo';
                    } else {
                        this.elementos[id].className = '';
                    }
                } else {
                    this.elementos[id].innerHTML = '-';
                    this.elementos[id].className = '';
                }
            }
        });
        
        // Actualizar valores anteriores desde histórico
        let historico = Storage.obtenerHistorico();
        if (historico.length > 0) {
            let anterior = historico[historico.length - 1];
            let antIds = ['antMon', 'antRFC', 'antRFM', 'antRV', 'antAlt'];
            let antVals = [anterior.monetario, anterior.rfCorto, anterior.rfMedio, anterior.rv, anterior.alternativos];
            antIds.forEach((id, i) => {
                if (this.elementos[id]) {
                    this.elementos[id].innerText = UI.formatearMoneda(antVals[i] || 0);
                }
            });
        }
        
        // Actualizar ETFs
        if (typeof ETFs !== 'undefined') {
            ETFs.renderizar();
        }
        
        // Calcular DCA
        this.calcularDCA();
    },
    
    /**
     * Calcula el plan DCA
     */
    calcularDCA: function() {
        let aporte = parseFloat(document.getElementById('aporteMensual')?.value) || 0;
        let pcts = [
            parseFloat(this.elementos.pctMonetario?.value) || 0,
            parseFloat(this.elementos.pctRFCorto?.value) || 0,
            parseFloat(this.elementos.pctRFMedio?.value) || 0,
            parseFloat(this.elementos.pctRV?.value) || 0,
            parseFloat(this.elementos.pctAlternativos?.value) || 0
        ];
        
        let cats = ['Monetario', 'RF Corto', 'RF Medio', 'RV', 'Alternativos'];
        let tablaDCA = document.getElementById('tablaDCA');
        
        if (tablaDCA) {
            let html = '';
            for (let i = 0; i < 5; i++) {
                if (pcts[i] > 0) {
                    html += `<tr><td>${cats[i]}</td><td>${pcts[i]}%</td><td>${(aporte * pcts[i] / 100).toFixed(2)} €</td></tr>`;
                }
            }
            tablaDCA.innerHTML = html;
        }
        
        // Recomendación DCA
        let fondos = [
            parseFloat(this.elementos.impMon?.value) || 0,
            parseFloat(this.elementos.impRFC?.value) || 0,
            parseFloat(this.elementos.impRFM?.value) || 0,
            parseFloat(this.elementos.impRV?.value) || 0,
            parseFloat(this.elementos.impAlt?.value) || 0
        ];
        let totalFondos = fondos.reduce((a, b) => a + b, 0);
        let objetivos = pcts.map(p => totalFondos * p / 100);
        
        let necesidades = [];
        for (let i = 0; i < 5; i++) {
            if (fondos[i] < objetivos[i]) {
                necesidades.push({
                    cat: cats[i],
                    falta: objetivos[i] - fondos[i],
                    aporteMensual: aporte * pcts[i] / 100
                });
            }
        }
        
        let recomDCA = document.getElementById('recomendacionDCA');
        if (recomDCA) {
            let html = '';
            necesidades.forEach(n => {
                let periodos = n.aporteMensual > 0 ? Math.ceil(n.falta / n.aporteMensual) : 0;
                html += `✅ ${n.cat}: necesita ${n.falta.toFixed(2)} € (${periodos} periodos)<br>`;
            });
            recomDCA.innerHTML = html || '✅ Cartera equilibrada en fondos';
        }
        
        // Actualizar también el panel de rebalanceo DCA
        this.calcularRebalanceoDCA();
    },
    
    /**
     * Calcula la próxima fecha según periodicidad
     */
    calcularProximaFecha: function() {
        let periocidad = document.getElementById('periocidad')?.value || 'mensual';
        let fechaInput = document.getElementById('fechaAporte');
        if (!fechaInput) return;
        
        let hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        let nuevaFecha = new Date(hoy);
        
        switch(periocidad) {
            case 'semanal':
                nuevaFecha.setDate(hoy.getDate() + 7);
                break;
            case 'mensual':
                nuevaFecha.setMonth(hoy.getMonth() + 1);
                break;
            case 'trimestral':
                nuevaFecha.setMonth(hoy.getMonth() + 3);
                break;
            case 'semestral':
                nuevaFecha.setMonth(hoy.getMonth() + 6);
                break;
            case 'anual':
                nuevaFecha.setFullYear(hoy.getFullYear() + 1);
                break;
            default:
                nuevaFecha.setMonth(hoy.getMonth() + 1);
        }
        
        // Formatear a YYYY-MM-DD para input type="date"
        let año = nuevaFecha.getFullYear();
        let mes = String(nuevaFecha.getMonth() + 1).padStart(2, '0');
        let dia = String(nuevaFecha.getDate()).padStart(2, '0');
        fechaInput.value = `${año}-${mes}-${dia}`;
        
        // Guardar en localStorage para persistencia
        localStorage.setItem('ultimaFechaDCA', fechaInput.value);
    },
    
    /**
     * Guarda la fecha cuando el usuario la cambia manualmente
     */
    guardarFechaManual: function() {
        let fechaInput = document.getElementById('fechaAporte');
        if (fechaInput && fechaInput.value) {
            localStorage.setItem('ultimaFechaDCA', fechaInput.value);
        }
    },
       /**
     * Calcula las acciones de rebalanceo directo (lógica corregida)
     */
    calcularRebalanceo: function() {
        let fondos = [
            parseFloat(this.elementos.impMon?.value) || 0,
            parseFloat(this.elementos.impRFC?.value) || 0,
            parseFloat(this.elementos.impRFM?.value) || 0,
            parseFloat(this.elementos.impRV?.value) || 0,
            parseFloat(this.elementos.impAlt?.value) || 0
        ];
        let totalFondos = fondos.reduce((a, b) => a + b, 0);
        let pcts = [
            parseFloat(this.elementos.pctMonetario?.value) || 0,
            parseFloat(this.elementos.pctRFCorto?.value) || 0,
            parseFloat(this.elementos.pctRFMedio?.value) || 0,
            parseFloat(this.elementos.pctRV?.value) || 0,
            parseFloat(this.elementos.pctAlternativos?.value) || 0
        ];
        let objetivos = pcts.map(p => totalFondos * p / 100);
        
        let cats = ['Monetario', 'RF Corto', 'RF Medio', 'RV', 'Alternativos'];
        
        // Identificar categorías con déficit y superávit
        let deficit = [];
        let superavit = [];
        let totalDeficit = 0;
        let totalSuperavit = 0;
        
        for (let i = 0; i < 5; i++) {
            let dif = objetivos[i] - fondos[i];
            if (dif > 0.01) {
                // Tiene déficit
                deficit.push({
                    indice: i,
                    nombre: cats[i],
                    falta: dif,
                    actual: fondos[i],
                    objetivo: objetivos[i]
                });
                totalDeficit += dif;
            } else if (dif < -0.01) {
                // Tiene superávit
                superavit.push({
                    indice: i,
                    nombre: cats[i],
                    sobra: Math.abs(dif),
                    actual: fondos[i],
                    objetivo: objetivos[i]
                });
                totalSuperavit += Math.abs(dif);
            }
        }
        
        let efectivoDisponible = parseFloat(this.elementos.efectivo?.value) || 0;
        let html = '<h3>Plan de Rebalanceo:</h3>';
        
        if (deficit.length === 0 && superavit.length === 0) {
            html += '<p style="color: #4CAF50;">✅ Cartera perfectamente equilibrada. No necesita rebalanceo.</p>';
            if (this.elementos.accionesDirectas) {
                this.elementos.accionesDirectas.innerHTML = html;
            }
            return;
        }
        
        html += '<ul>';
        
        // PASO 1: Redistribuir superávit entre déficit
        if (superavit.length > 0) {
            html += '<li style="color: #FF9800; margin-top: 10px;">📤 Categorías con excedente (se redistribuirá):</li>';
            
            // Hacemos una copia de los déficits para no modificar el original
            let deficitRestante = deficit.map(d => ({ ...d }));
            let sobranteTotal = totalSuperavit;
            
            superavit.forEach(s => {
                html += `<li style="color: #FF9800; margin-left: 20px;">🔸 ${s.nombre}: excedente ${s.sobra.toFixed(2)} €</li>`;
            });
            
            // Redistribuir el superávit entre las categorías con déficit
            if (deficit.length > 0) {
                html += '<li style="color: #4CAF50; margin-top: 10px;">📥 Redistribución del excedente:</li>';
                
                // Distribuir proporcionalmente según necesidad
                let asignaciones = [];
                for (let i = 0; i < deficit.length; i++) {
                    let d = deficit[i];
                    let proporcion = d.falta / totalDeficit;
                    let asignado = totalSuperavit * proporcion;
                    
                    // No asignar más de lo que necesita
                    asignado = Math.min(asignado, d.falta);
                    
                    if (asignado > 0.01) {
                        asignaciones.push({
                            nombre: d.nombre,
                            cantidad: asignado,
                            faltaRestante: d.falta - asignado
                        });
                        
                        // Actualizar déficit restante
                        let idx = deficitRestante.findIndex(x => x.nombre === d.nombre);
                        if (idx !== -1) {
                            deficitRestante[idx].falta -= asignado;
                            if (deficitRestante[idx].falta < 0.01) {
                                deficitRestante.splice(idx, 1);
                            }
                        }
                        
                        sobranteTotal -= asignado;
                    }
                }
                
                asignaciones.forEach(a => {
                    html += `<li style="margin-left: 20px;">🔄 ${a.nombre}: recibe ${a.cantidad.toFixed(2)} € del excedente</li>`;
                });
                
                // Actualizar lista de déficit restante
                deficit = deficitRestante;
                totalDeficit = deficit.reduce((sum, d) => sum + d.falta, 0);
            }
        }
        
        // PASO 2: Usar efectivo para cubrir déficit restante
        if (deficit.length > 0) {
            html += '<li style="color: #2196F3; margin-top: 10px;">💰 Uso de efectivo para cubrir déficit restante:</li>';
            
            let efectivoNecesario = 0;
            for (let i = 0; i < deficit.length; i++) {
                let d = deficit[i];
                let usarEfectivo = Math.min(d.falta, efectivoDisponible);
                if (usarEfectivo > 0.01) {
                    html += `<li style="margin-left: 20px;">💶 ${d.nombre}: necesita ${d.falta.toFixed(2)} € - se usarán ${usarEfectivo.toFixed(2)} € de efectivo</li>`;
                    efectivoNecesario += usarEfectivo;
                    efectivoDisponible -= usarEfectivo;
                } else {
                    html += `<li style="margin-left: 20px; color: #f44336;">⚠️ ${d.nombre}: necesita ${d.falta.toFixed(2)} € pero no hay suficiente efectivo</li>`;
                }
            }
        }
        
        // PASO 3: Si sobra efectivo después de todo
        if (efectivoDisponible > 0.01) {
            html += `<li style="color: #795548; margin-top: 10px;">💵 Efectivo restante después del rebalanceo: ${efectivoDisponible.toFixed(2)} € (se mantiene en efectivo)</li>`;
        }
        
        // PASO 4: Si después de redistribuir y usar efectivo aún hay superávit
        if (superavit.length > 0 && deficit.length === 0 && totalSuperavit > 0) {
            html += '<li style="color: #795548; margin-top: 10px;">📤 Excedente no necesario para rebalanceo:';
            superavit.forEach(s => {
                html += `<br>   • ${s.nombre}: ${s.sobra.toFixed(2)} € (irá a efectivo)`;
            });
            html += '</li>';
        }
        
        html += '</ul>';
        
        // Resumen final
        html += '<div style="background: #e3f2fd; padding: 10px; border-radius: 5px; margin-top: 15px;">';
        html += '<strong>📋 Instrucciones:</strong><br>';
        
        if (superavit.length > 0) {
            html += '• Vender/traspasar el excedente de las categorías con superávit<br>';
        }
        if (deficit.length > 0) {
            html += '• Comprar en las categorías con déficit usando el excedente redistribuido y efectivo si es necesario<br>';
        }
        if (efectivoDisponible > 0.01 && deficit.length === 0) {
            html += '• El efectivo sobrante puede mantenerse o invertirse según estrategia<br>';
        }
        
        html += '</div>';
        
        if (this.elementos.accionesDirectas) {
            this.elementos.accionesDirectas.innerHTML = html;
        }
    },
    
    /**
     * Calcula las acciones de rebalanceo vía DCA (lógica corregida)
     */
    calcularRebalanceoDCA: function() {
        let fondos = [
            parseFloat(this.elementos.impMon?.value) || 0,
            parseFloat(this.elementos.impRFC?.value) || 0,
            parseFloat(this.elementos.impRFM?.value) || 0,
            parseFloat(this.elementos.impRV?.value) || 0,
            parseFloat(this.elementos.impAlt?.value) || 0
        ];
        let totalFondos = fondos.reduce((a, b) => a + b, 0);
        let pcts = [
            parseFloat(this.elementos.pctMonetario?.value) || 0,
            parseFloat(this.elementos.pctRFCorto?.value) || 0,
            parseFloat(this.elementos.pctRFMedio?.value) || 0,
            parseFloat(this.elementos.pctRV?.value) || 0,
            parseFloat(this.elementos.pctAlternativos?.value) || 0
        ];
        let objetivos = pcts.map(p => totalFondos * p / 100);
        let aporte = parseFloat(document.getElementById('aporteMensual')?.value) || 0;
        
        let cats = ['Monetario', 'RF Corto', 'RF Medio', 'RV', 'Alternativos'];
        
        // Identificar categorías con déficit y superávit
        let deficit = [];
        let superavit = [];
        let totalDeficit = 0;
        
        for (let i = 0; i < 5; i++) {
            let dif = objetivos[i] - fondos[i];
            if (dif > 0.01) {
                // Tiene déficit
                deficit.push({
                    indice: i,
                    nombre: cats[i],
                    falta: dif,
                    porcentaje: pcts[i],
                    urgencia: dif / (pcts[i] / 100) // Déficit normalizado por peso
                });
                totalDeficit += dif;
            } else if (dif < -0.01) {
                // Tiene superávit
                superavit.push({
                    indice: i,
                    nombre: cats[i],
                    sobra: Math.abs(dif)
                });
            }
        }
        
        let html = '<h3>Plan DCA inteligente:</h3>';
        
        if (deficit.length === 0) {
            html += '<p style="color: #4CAF50;">✅ Cartera equilibrada. No necesita rebalanceo.</p>';
            if (this.elementos.accionesDCA) {
                this.elementos.accionesDCA.innerHTML = html;
            }
            return;
        }
        
        // Ordenar déficit por urgencia (mayor necesidad primero)
        deficit.sort((a, b) => b.urgencia - a.urgencia);
        
        html += '<ul>';
        
        // Si hay superávit, recomendamos no aportar a esas categorías
        if (superavit.length > 0) {
            html += '<li style="color: #FF9800;">⚠️ Categorías con superávit (no recibirán aportes):</li>';
            superavit.forEach(s => {
                html += `<li style="color: #FF9800; margin-left: 20px;">🔸 ${s.nombre}: sobra ${s.sobra.toFixed(2)} €</li>`;
            });
        }
        
        html += '<li style="color: #2196F3; margin-top: 10px;">📊 Distribución de la aportación:</li>';
        
        // Calcular distribución de la aportación (TODO a las que tienen déficit)
        let aporteRestante = aporte;
        let necesidadesPendientes = [];
        
        // Primera pasada: asignar a la más urgente hasta cubrir su déficit
        for (let i = 0; i < deficit.length; i++) {
            let d = deficit[i];
            let cantidadAAsignar = Math.min(d.falta, aporteRestante);
            
            if (cantidadAAsignar > 0) {
                necesidadesPendientes.push({
                    nombre: d.nombre,
                    cantidad: cantidadAAsignar,
                    faltaRestante: d.falta - cantidadAAsignar
                });
                aporteRestante -= cantidadAAsignar;
            }
            
            if (aporteRestante <= 0) break;
        }
        
        // Si sobra aporte después de cubrir todos los déficits, sobra a efectivo
        if (aporteRestante > 0) {
            necesidadesPendientes.push({
                nombre: 'Efectivo',
                cantidad: aporteRestante,
                faltaRestante: 0
            });
        }
        
        // Mostrar la distribución
        necesidadesPendientes.forEach(n => {
            html += `<li style="margin-left: 20px;">✅ ${n.nombre}: +${n.cantidad.toFixed(2)} €</li>`;
        });
        
        html += '</ul>';
        
        // Calcular periodos necesarios
        if (totalDeficit > 0 && aporte > 0) {
            let periodos = Math.ceil(totalDeficit / aporte);
            html += `<p style="background: #e3f2fd; padding: 10px; border-radius: 5px; margin-top: 10px;">
                <strong>📅 Periodos necesarios:</strong> ${periodos} periodos (${aporte.toFixed(2)} €/periodo) para equilibrar toda la cartera.<br>
                <small>Nota: A medida que se equilibren categorías, la distribución se ajustará automáticamente.</small>
            </p>`;
        }
        
        // Mostrar advertencia si hay categorías con déficit que no reciben aporte este periodo
        if (aporteRestante <= 0 && deficit.some(d => d.falta > 0)) {
            let pendientes = deficit.filter(d => d.falta > 0);
            if (pendientes.length > 0) {
                html += '<p style="color: #f44336; margin-top: 10px;">⚠️ El aporte actual no es suficiente para cubrir todos los déficits. Se priorizaron las categorías con mayor necesidad.</p>';
            }
        }
        
        if (this.elementos.accionesDCA) {
            this.elementos.accionesDCA.innerHTML = html;
        }
    },
    
    /**
     * Aplica el rebalanceo directo
     */
    aplicarRebalanceoDirecto: function() {
        let fondos = [
            parseFloat(this.elementos.impMon?.value) || 0,
            parseFloat(this.elementos.impRFC?.value) || 0,
            parseFloat(this.elementos.impRFM?.value) || 0,
            parseFloat(this.elementos.impRV?.value) || 0,
            parseFloat(this.elementos.impAlt?.value) || 0
        ];
        let totalFondos = fondos.reduce((a, b) => a + b, 0);
        let pcts = [
            parseFloat(this.elementos.pctMonetario?.value) || 0,
            parseFloat(this.elementos.pctRFCorto?.value) || 0,
            parseFloat(this.elementos.pctRFMedio?.value) || 0,
            parseFloat(this.elementos.pctRV?.value) || 0,
            parseFloat(this.elementos.pctAlternativos?.value) || 0
        ];
        let objetivos = pcts.map(p => totalFondos * p / 100);
        
        let ids = FONDO_IDS;
        for (let i = 0; i < 5; i++) {
            let el = document.getElementById(ids[i]);
            if (el) {
                el.value = objetivos[i].toFixed(2);
                el.setAttribute('data-valor-anterior', objetivos[i]);
            }
        }
        
        this.actualizarUI();
        this.guardarTodo();
        this.calcularRebalanceo();
        UI.mostrarAlerta('Rebalanceo aplicado y guardado', 'info');
    },
    
    /**
     * Guarda todos los datos
     */
    guardarTodo: function() {
        let datos = {
            monetario: parseFloat(this.elementos.impMon?.value) || 0,
            rfCorto: parseFloat(this.elementos.impRFC?.value) || 0,
            rfMedio: parseFloat(this.elementos.impRFM?.value) || 0,
            rv: parseFloat(this.elementos.impRV?.value) || 0,
            alternativos: parseFloat(this.elementos.impAlt?.value) || 0,
            efectivo: parseFloat(this.elementos.efectivo?.value) || 0,
            inmobiliario: parseFloat(this.elementos.inmobiliario?.value) || 0,
            etfs: typeof ETFs !== 'undefined' ? ETFs.obtenerTodos() : []
        };
        
        Storage.guardarTodo(datos);
        UI.mostrarAlerta('✅ Datos guardados', 'info');
    },
    
    /**
     * Muestra un resumen
     */
    mostrarResumen: function() {
        let total = parseFloat(this.elementos.totalCartera?.innerText) || 0;
        let fondos = parseFloat(this.elementos.totalFondos?.innerText) || 0;
        let etfsTotal = parseFloat(this.elementos.totalETFs?.innerText) || 0;
        let otros = parseFloat(this.elementos.totalOtros?.innerText) || 0;
        
        UI.mostrarAlerta(
            `📊 Total: ${total.toFixed(2)} €\nFondos: ${fondos.toFixed(2)} €\nETFs: ${etfsTotal.toFixed(2)} €\nOtros: ${otros.toFixed(2)} €`,
            'info'
        );
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cuerpoETFs')) {
        Cartera.init();
    }
});