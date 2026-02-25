// ==============================================
// analisis.js - Lógica del analizador financiero
// ==============================================

const Analisis = {
    // Elementos del DOM
    elementos: {},
    
    /**
     * Inicializa el analizador
     */
    init: function() {
        this.cacheElementos();
        this.registrarEventListeners();
    },
    
    /**
     * Cachea los elementos del DOM
     */
    cacheElementos: function() {
        const ids = [
            'tipo', 'isin', 'tickerYahoo', 'jsonInput',
            'precio', 'bpa', 'vc', 'ventas', 'dividendo', 'fcf',
            'capitalizacion', 'per', 'peg', 'roe', 'roce',
            'deuda_ebitda', 'ev_ebitda', 'fcf_yield', 'beta',
            'p_cf', 'p_ventas', 'p_valor_contable',
            'volumen', 'max52', 'min52', 'media50', 'media200',
            'tir', 'duration', 'rating_medio', 'ytw', 'tracking_error', 'ter',
            'efectivo_total', 'deuda_total', 'patrimonio_neto',
            'ratio_deuda_patrimonio', 'liquidez',
            'comision', 'exito', 'patrimonio', 'rating',
            'resultados'
        ];
        
        ids.forEach(id => {
            this.elementos[id] = document.getElementById(id);
        });
    },
    
    /**
     * Registra event listeners
     */
    registrarEventListeners: function() {
        // No hay eventos específicos por ahora
    },
    
    /**
     * Busca ticker en Yahoo Finance
     */
    buscarTickerYahoo: function() {
        let isin = this.elementos.isin?.value.trim();
        if (!isin) {
            UI.mostrarAlerta('Primero introduce un ISIN', 'warning');
            return;
        }
        window.open(`https://finance.yahoo.com/lookup?s=${isin}`, '_blank');
    },
    
    /**
     * Genera prompt avanzado con análisis técnico y fundamental
     */
    generarPromptAvanzado: function() {
        let tipo = this.elementos.tipo?.value || 'ACCION';
        let isin = this.elementos.isin?.value || '';
        let ticker = this.elementos.tickerYahoo?.value.trim() || isin;
        let precio = this.elementos.precio?.value || '0';
        
        let prompt = `🔍 **ANÁLISIS COMPLETO PARA DECISIÓN DE INVERSIÓN**

Activo: ${ticker} (${isin})
Tipo: ${tipo}
Precio actual: ${precio} €

Por favor, realiza un análisis EXHAUSTIVO que incluya:

## 1. ANÁLISIS TÉCNICO (para determinar momentos de compra/venta)
- **Soportes y resistencias**: ¿Cuáles son los niveles clave?
- **Tendencias**: ¿Está en tendencia alcista, bajista o lateral?
- **Medias móviles**: ¿Precio por encima/debajo de MA50 y MA200?
- **RSI**: ¿Sobrecompra (>70) o sobreventa (<30)?
- **MACD**: ¿Señal de compra o venta?
- **Volumen**: ¿Hay volumen significativo en los movimientos?
- **Patrones de velas**: ¿Formaciones relevantes?

## 2. ANÁLISIS DE CICLOS Y ESTACIONALIDAD
- **Comportamiento histórico**: ¿En qué meses suele subir/bajar?
- **Ciclos de mercado**: ¿En qué fase del ciclo se encuentra?
- **Comparativa con máximos/mínimos**: ¿A qué distancia está de máximos históricos?
- **Correcciones típicas**: ¿Qué porcentaje de caída ha tenido en correcciones anteriores?

## 3. ANÁLISIS FUNDAMENTAL AVANZADO
- **Valoración**: ¿Está cara o barata comparada con su media histórica?
- **Múltiplos**: PER, P/VC, EV/EBITDA vs sector
- **Crecimiento**: Crecimiento de BPA, ventas y FCF últimos años
- **Ratios de rentabilidad**: ROE, ROCE, márgenes
- **Salud financiera**: Deuda/EBITDA, liquidez

## 4. GRANDES TENEDORES (INSIDERS E INSTITUCIONALES)
- **% de insiders**: ¿Están comprando o vendiendo?
- **Principales instituciones**: BlackRock, Vanguard, etc. ¿Aumentan o reducen?
- **Cambios recientes**: Movimientos significativos en el accionariado

## 5. ANÁLISIS DE RIESGOS
- **Riesgos específicos**: Dependencia de clientes, regulación, competencia
- **Riesgos macro**: Sensibilidad a tipos de interés, inflación, ciclo económico
- **Riesgos geopolíticos**: Exposición a regiones conflictivas

## 6. CATALIZADORES PRÓXIMOS
- **Próximos resultados**: Fecha y expectativas
- **Eventos corporativos**: Splits, dividendos, fusiones
- **Noticias relevantes**: Próximos lanzamientos, contratos

## 7. ANÁLISIS DE ESCENARIOS
- **Escenario alcista**: ¿Qué tendría que pasar para que suba un 20%?
- **Escenario bajista**: ¿Qué podría provocar una caída del 20%?
- **Stop loss recomendado**: ¿Dónde poner el stop?

## 8. RECOMENDACIÓN FINAL
Basado en TODO lo anterior:
- **¿COMPRAR, MANTENER o VENDER?**
- **Horizonte temporal recomendado** (corto/medio/largo)
- **Precio objetivo** con rango (mínimo-máximo)
- **Estrategia de entrada**: ¿Compra única o DCA?
- **Estrategia de salida**: ¿Cuándo vender?

Por favor, estructura la respuesta de forma clara con secciones y datos concretos. Sé específico en los porcentajes y niveles.`;
        
        return prompt;
    },
    
    /**
     * Prepara captura básica
     */
    prepararCaptura: function() {
        let isin = this.elementos.isin?.value.trim();
        let ticker = this.elementos.tickerYahoo?.value.trim();
        let identificador = ticker || isin;
        
        if (!identificador) {
            UI.mostrarAlerta('Por favor, introduce un ISIN o Ticker Yahoo', 'warning');
            return;
        }
        
        let prompt = `📸 ANÁLISIS BÁSICO POR CAPTURA

Activo: ${identificador}

Adjunto captura de pantalla con información de este activo.

Por favor, extrae los datos financieros principales y devuélveme un JSON con:
- Precio actual
- BPA
- Valor contable
- Ventas por acción
- Dividendo
- FCF

Devuélveme SOLO el JSON.`;
        
        UI.copiarTexto(prompt, '✅ Prompt básico copiado');
        window.open('https://chat.deepseek.com', '_blank');
    },
    
    /**
     * Prepara captura avanzada con análisis técnico
     */
    prepararCapturaAvanzada: function() {
        let isin = this.elementos.isin?.value.trim();
        let ticker = this.elementos.tickerYahoo?.value.trim();
        let identificador = ticker || isin;
        
        if (!identificador) {
            UI.mostrarAlerta('Por favor, introduce un ISIN o Ticker Yahoo', 'warning');
            return;
        }
        
        let prompt = `📸 **ANÁLISIS COMPLETO CON GRÁFICOS**

Adjunto capturas de pantalla con:
1. Gráfico de precios (1 año, 5 años)
2. Indicadores técnicos (RSI, MACD, volumen)
3. Datos fundamentales

Activo: ${identificador}

Por favor, analiza las imágenes y proporciona:

## ANÁLISIS TÉCNICO
- Identifica soportes y resistencias clave
- ¿Hay patrones de velas relevantes?
- Señales de compra/venta en RSI, MACD

## ANÁLISIS DE TENDENCIA
- ¿Está en tendencia alcista, bajista o lateral?
- Comparativa con medias móviles (MA50, MA200)
- Volumen: ¿confirma la tendencia?

## MOMENTO ACTUAL
- ¿Está en zona de sobrecompra o sobreventa?
- ¿Cerca de máximos o mínimos históricos?
- ¿Buena entrada ahora o esperar?

## RECOMENDACIÓN
- COMPRAR AHORA, ESPERAR o VENDER
- Precio objetivo a corto/medio plazo
- Stop loss recomendado

Devuélveme un análisis detallado basado en las imágenes.`;
        
        UI.copiarTexto(prompt, '✅ Prompt avanzado para captura copiado');
        window.open('https://chat.deepseek.com', '_blank');
    },
    
    /**
     * Procesa JSON básico
     */
    procesarJSON: function() {
        let texto = this.elementos.jsonInput?.value.trim();
        if (!texto) {
            UI.mostrarAlerta('No hay texto para procesar', 'warning');
            return;
        }
        
        try {
            let datos = JSON.parse(texto);
            
            if (datos.precio !== undefined && this.elementos.precio) this.elementos.precio.value = datos.precio;
            if (datos.bpa !== undefined && this.elementos.bpa) this.elementos.bpa.value = datos.bpa;
            if (datos.vc !== undefined && this.elementos.vc) this.elementos.vc.value = datos.vc;
            if (datos.ventas !== undefined && this.elementos.ventas) this.elementos.ventas.value = datos.ventas;
            if (datos.dividendo !== undefined && this.elementos.dividendo) this.elementos.dividendo.value = datos.dividendo;
            if (datos.fcf !== undefined && this.elementos.fcf) this.elementos.fcf.value = datos.fcf;
            
            UI.mostrarAlerta('✅ Datos básicos cargados desde JSON', 'info');
        } catch (e) {
            UI.mostrarAlerta('Error al parsear JSON: ' + e.message, 'warning');
        }
    },
    
    /**
     * Procesa JSON ampliado
     */
    procesarJSONExtendido: function() {
        let texto = this.elementos.jsonInput?.value.trim();
        if (!texto) {
            UI.mostrarAlerta('No hay texto para procesar', 'warning');
            return;
        }
        
        try {
            let datos = JSON.parse(texto);
            
            const setValor = (id, valor) => {
                let el = document.getElementById(id);
                if (el && valor != null && !isNaN(valor)) {
                    el.value = valor;
                }
            };
            
            // Datos básicos
            if (datos.datos_basicos) {
                let b = datos.datos_basicos;
                setValor('precio', b.precio);
                setValor('bpa', b.bpa);
                setValor('per', b.per);
                setValor('capitalizacion', b.capitalizacion);
                setValor('dividendo', b.dividendo);
                
                // Calcular rentabilidad por dividendo
                if (b.precio && b.dividendo && b.precio > 0) {
                    // No hay campo específico, pero se puede mostrar después
                }
            }
            
            // Ratios avanzados
            if (datos.ratios_avanzados) {
                let r = datos.ratios_avanzados;
                setValor('peg', r.peg);
                setValor('beta', r.beta);
                if (r.roe) setValor('roe', r.roe);
                if (r.roce) setValor('roce', r.roce);
                if (r.deuda_ebitda) setValor('deuda_ebitda', r.deuda_ebitda);
            }
            
            // Estadísticas de mercado
            if (datos.estadisticas_mercado) {
                let e = datos.estadisticas_mercado;
                setValor('volumen', e.volumen_medio);
                setValor('max52', e.max_52_semanas);
                setValor('min52', e.min_52_semanas);
                setValor('media50', e.media_50_dias);
                setValor('media200', e.media_200_dias);
            }
            
            // Balance
            if (datos.balance) {
                let bal = datos.balance;
                setValor('efectivo_total', bal.efectivo_total);
                setValor('deuda_total', bal.deuda_total);
                setValor('patrimonio_neto', bal.patrimonio_neto);
                
                // Calcular ratio deuda/patrimonio
                if (bal.deuda_total && bal.patrimonio_neto && bal.patrimonio_neto > 0) {
                    setValor('ratio_deuda_patrimonio', bal.deuda_total / bal.patrimonio_neto);
                }
            }
            
            UI.mostrarAlerta('✅ JSON ampliado procesado correctamente', 'info');
            
            // Mostrar panel completo
            this.mostrarPanelCompleto(datos);
            
        } catch (e) {
            UI.mostrarAlerta('Error al parsear JSON ampliado: ' + e.message, 'warning');
            console.error('Error detallado:', e);
        }
    },
    
    /**
     * Muestra panel completo de análisis
     */
    mostrarPanelCompleto: function(datos) {
        if (!this.elementos.resultados) return;
        
        let html = '<div style="max-height: 600px; overflow-y: auto; padding-right: 10px;">';
        
        // Datos básicos
        if (datos.datos_basicos) {
            let b = datos.datos_basicos;
            html += '<div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 20px;">';
            html += '<h3 style="color: #0d47a1; margin-bottom: 15px; border-bottom: 2px solid #90caf9; padding-bottom: 5px;">📌 DATOS BÁSICOS</h3>';
            html += '<table style="width:100%; border-collapse: collapse;">';
            html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Nombre</strong></td><td style="padding: 8px;">${b.nombre || 'N/A'}</td></tr>`;
            html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Ticker</strong></td><td style="padding: 8px;">${b.ticker || 'N/A'}</td></tr>`;
            html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>ISIN</strong></td><td style="padding: 8px;">${b.isin || 'N/A'}</td></tr>`;
            html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Precio</strong></td><td style="padding: 8px; font-weight: bold;">${b.precio ? b.precio.toFixed(2) + ' €' : 'N/A'}</td></tr>`;
            
            if (b.variacion_diaria !== undefined) {
                let clase = b.variacion_diaria >= 0 ? 'positivo' : 'negativo';
                let signo = b.variacion_diaria >= 0 ? '+' : '';
                html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Variación diaria</strong></td><td style="padding: 8px;" class="${clase}">${signo}${b.variacion_diaria.toFixed(2)}%</td></tr>`;
            }
            
            html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Capitalización</strong></td><td style="padding: 8px;">${b.capitalizacion ? b.capitalizacion.toFixed(2) + ' M€' : 'N/A'}</td></tr>`;
            html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>PER</strong></td><td style="padding: 8px;">${b.per ? b.per.toFixed(2) : 'N/A'}</td></tr>`;
            html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>BPA</strong></td><td style="padding: 8px;">${b.bpa ? b.bpa.toFixed(2) + ' €' : 'N/A'}</td></tr>`;
            
            if (b.dividendo) {
                html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Dividendo</strong></td><td style="padding: 8px;">${b.dividendo.toFixed(2)} €`;
                if (b.rentabilidad_dividendo) {
                    html += ` (${b.rentabilidad_dividendo.toFixed(2)}%)`;
                }
                html += '</td></tr>';
            }
            
            html += '</table></div>';
        }
        
        // Ratios avanzados
        if (datos.ratios_avanzados) {
            let r = datos.ratios_avanzados;
            html += '<div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin-bottom: 20px;">';
            html += '<h3 style="color: #e65100; margin-bottom: 15px; border-bottom: 2px solid #ffb74d; padding-bottom: 5px;">📊 RATIOS AVANZADOS</h3>';
            html += '<table style="width:100%; border-collapse: collapse;">';
            
            if (r.peg !== undefined) html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>PEG</strong></td><td style="padding: 8px;">${r.peg.toFixed(2)}</td></tr>`;
            if (r.roe !== undefined) html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>ROE</strong></td><td style="padding: 8px;">${r.roe.toFixed(1)}%</td></tr>`;
            if (r.roce !== undefined) html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>ROCE</strong></td><td style="padding: 8px;">${r.roce.toFixed(1)}%</td></tr>`;
            if (r.beta !== undefined) html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Beta</strong></td><td style="padding: 8px;">${r.beta.toFixed(2)}</td></tr>`;
            if (r.deuda_ebitda !== undefined) html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Deuda/EBITDA</strong></td><td style="padding: 8px;">${r.deuda_ebitda.toFixed(2)}</td></tr>`;
            
            html += '</table></div>';
        }
        
        // Estadísticas de mercado
        if (datos.estadisticas_mercado) {
            let e = datos.estadisticas_mercado;
            html += '<div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">';
            html += '<h3 style="color: #2e7d32; margin-bottom: 15px; border-bottom: 2px solid #81c784; padding-bottom: 5px;">📈 ESTADÍSTICAS DE MERCADO</h3>';
            html += '<table style="width:100%; border-collapse: collapse;">';
            
            if (e.volumen_medio !== undefined) html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Volumen medio</strong></td><td style="padding: 8px;">${e.volumen_medio.toLocaleString()}</td></tr>`;
            if (e.max_52_semanas !== undefined) html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Máx 52 semanas</strong></td><td style="padding: 8px;">${e.max_52_semanas.toFixed(2)} €</td></tr>`;
            if (e.min_52_semanas !== undefined) html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Mín 52 semanas</strong></td><td style="padding: 8px;">${e.min_52_semanas.toFixed(2)} €</td></tr>`;
            if (e.media_50_dias !== undefined) html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Media 50 días</strong></td><td style="padding: 8px;">${e.media_50_dias.toFixed(2)} €</td></tr>`;
            if (e.media_200_dias !== undefined) html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Media 200 días</strong></td><td style="padding: 8px;">${e.media_200_dias.toFixed(2)} €</td></tr>`;
            
            html += '</table></div>';
        }
        
        // Balance
        if (datos.balance) {
            let bal = datos.balance;
            html += '<div style="background: #e0f7fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">';
            html += '<h3 style="color: #006064; margin-bottom: 15px; border-bottom: 2px solid #4dd0e1; padding-bottom: 5px;">🏦 BALANCE</h3>';
            html += '<table style="width:100%; border-collapse: collapse;">';
            
            if (bal.efectivo_total !== undefined) html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Efectivo total</strong></td><td style="padding: 8px;">${bal.efectivo_total.toFixed(2)} M€</td></tr>`;
            if (bal.deuda_total !== undefined) html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Deuda total</strong></td><td style="padding: 8px;">${bal.deuda_total.toFixed(2)} M€</td></tr>`;
            if (bal.patrimonio_neto !== undefined) html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Patrimonio neto</strong></td><td style="padding: 8px;">${bal.patrimonio_neto.toFixed(2)} M€</td></tr>`;
            
            if (bal.deuda_total && bal.patrimonio_neto && bal.patrimonio_neto > 0) {
                let ratio = bal.deuda_total / bal.patrimonio_neto;
                html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;"><strong>Ratio Deuda/Patrimonio</strong></td><td style="padding: 8px;">${ratio.toFixed(2)}</td></tr>`;
            }
            
            html += '</table></div>';
        }
        
        // Recomendación final
        if (datos.recomendacion_final) {
            let rec = datos.recomendacion_final;
            let clase = 'badge-warning';
            if (rec.includes('COMPRAR')) clase = 'badge-success';
            else if (rec.includes('VENDER')) clase = 'badge-danger';
            
            let bgColor = clase === 'badge-success' ? '#d4edda' : (clase === 'badge-danger' ? '#f8d7da' : '#fff3cd');
            let textColor = clase === 'badge-success' ? '#155724' : (clase === 'badge-danger' ? '#721c24' : '#856404');
            
            html += `<div style="background: ${bgColor}; color: ${textColor}; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 5px solid ${textColor};">`;
            html += '<h3 style="margin-bottom: 10px;">🎯 RECOMENDACIÓN FINAL</h3>';
            html += `<p style="line-height: 1.6; margin-bottom: 0;">${rec}</p>`;
            html += '</div>';
        }
        
        html += '</div>';
        
        this.elementos.resultados.innerHTML = html;
    },
    
    /**
     * Análisis básico con datos actuales
     */
    analizarBasico: function() {
        let precio = parseFloat(this.elementos.precio?.value) || 0;
        let bpa = parseFloat(this.elementos.bpa?.value) || 0;
        let vc = parseFloat(this.elementos.vc?.value) || 0;
        let ventas = parseFloat(this.elementos.ventas?.value) || 0;
        let dividendo = parseFloat(this.elementos.dividendo?.value) || 0;
        let fcf = parseFloat(this.elementos.fcf?.value) || 0;
        
        let per = bpa > 0 ? (precio / bpa).toFixed(2) : 'N/A';
        let pvc = vc > 0 ? (precio / vc).toFixed(2) : 'N/A';
        let rentabilidad = precio > 0 ? ((dividendo / precio) * 100).toFixed(2) : 'N/A';
        let pVentas = ventas > 0 ? (precio / ventas).toFixed(2) : 'N/A';
        let pFCF = fcf > 0 ? (precio / fcf).toFixed(2) : 'N/A';
        
        let html = '<h3>📊 RATIOS BÁSICOS</h3>';
        html += '<table style="width:100%; border-collapse: collapse;">';
        html += '<tr><th style="background: #667eea; color: white; padding: 10px;">Ratio</th><th style="background: #667eea; color: white; padding: 10px;">Valor</th></tr>';
        html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;">PER</td><td style="padding: 8px; font-weight: bold;">${per}</td></tr>`;
        html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;">P/VC</td><td style="padding: 8px; font-weight: bold;">${pvc}</td></tr>`;
        html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;">Rentabilidad por dividendo</td><td style="padding: 8px; font-weight: bold;">${rentabilidad}%</td></tr>`;
        html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;">P/Ventas</td><td style="padding: 8px; font-weight: bold;">${pVentas}</td></tr>`;
        html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px;">P/FCF</td><td style="padding: 8px; font-weight: bold;">${pFCF}</td></tr>`;
        html += '</table>';
        
        if (this.elementos.resultados) {
            this.elementos.resultados.innerHTML = html;
        }
    },
    
    /**
     * Genera prompt genérico
     */
    generarPrompt: function() {
        let tipo = this.elementos.tipo?.value || 'ACCION';
        let isin = this.elementos.isin?.value || '';
        let ticker = this.elementos.tickerYahoo?.value.trim() || isin;
        
        let prompt = `🎯 ANÁLISIS DE ACTIVO FINANCIERO

Tipo: ${tipo}
ISIN/Ticker: ${isin}
Ticker Yahoo: ${ticker}

Por favor, proporciona un análisis completo incluyendo:
- Ratios fundamentales (PER, BPA, etc.)
- Análisis de crecimiento
- Salud financiera
- Riesgos y oportunidades
- Recomendación final (COMPRAR/MANTENER/VENDER)`;
        
        UI.copiarTexto(prompt, '✅ Prompt copiado');
    },
    
    /**
     * Genera prompt para JSON
     */
    generarPromptJSON: function() {
        let isin = this.elementos.isin?.value.trim();
        if (!isin) {
            UI.mostrarAlerta('Primero introduce un ISIN', 'warning');
            return;
        }
        
        let prompt = `Dame los datos financieros del ISIN ${isin} en formato JSON con esta estructura:
{
  "datos_basicos": {
    "nombre": "Nombre completo",
    "ticker": "Ticker",
    "isin": "${isin}",
    "precio": 0,
    "variacion_diaria": 0,
    "capitalizacion": 0,
    "per": 0,
    "bpa": 0,
    "dividendo": 0,
    "rentabilidad_dividendo": 0
  },
  "ratios_avanzados": {
    "peg": 0,
    "beta": 0
  },
  "estadisticas_mercado": {
    "volumen_medio": 0,
    "max_52_semanas": 0,
    "min_52_semanas": 0,
    "media_50_dias": 0,
    "media_200_dias": 0
  },
  "balance": {
    "efectivo_total": 0,
    "deuda_total": 0,
    "patrimonio_neto": 0
  },
  "recomendacion_final": "texto con recomendación"
}`;
        
        UI.copiarTexto(prompt, '✅ Prompt JSON copiado');
        window.open('https://chat.deepseek.com', '_blank');
    },
    
    // ==============================================
    // FUNCIONES PARA ENVIAR A IAS
    // ==============================================
    
    enviarADeepSeek: function() {
        this.generarPrompt();
        window.open('https://chat.deepseek.com', '_blank');
    },
    
    enviarADeepSeekAvanzado: function() {
        let prompt = this.generarPromptAvanzado();
        UI.copiarTexto(prompt, '✅ Prompt avanzado copiado');
        window.open('https://chat.deepseek.com', '_blank');
    },
    
    enviarAGemini: function() {
        this.generarPrompt();
        window.open('https://gemini.google.com', '_blank');
    },
    
    enviarAGeminiAvanzado: function() {
        let prompt = this.generarPromptAvanzado();
        UI.copiarTexto(prompt, '✅ Prompt avanzado copiado');
        window.open('https://gemini.google.com', '_blank');
    },
    
    enviarAChatGPT: function() {
        this.generarPrompt();
        window.open('https://chat.openai.com', '_blank');
    },
    
    enviarAChatGPTAvanzado: function() {
        let prompt = this.generarPromptAvanzado();
        UI.copiarTexto(prompt, '✅ Prompt avanzado copiado');
        window.open('https://chat.openai.com', '_blank');
    },
    
    enviarAClaude: function() {
        this.generarPrompt();
        window.open('https://claude.ai', '_blank');
    },
    
    enviarAClaudeAvanzado: function() {
        let prompt = this.generarPromptAvanzado();
        UI.copiarTexto(prompt, '✅ Prompt avanzado copiado');
        window.open('https://claude.ai', '_blank');
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('isin')) {
        Analisis.init();
    }
});