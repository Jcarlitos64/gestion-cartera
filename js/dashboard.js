// ==============================================
// dashboard.js - Lógica del dashboard principal
// ==============================================

const Dashboard = {
    // Elementos del DOM
    elementos: {},
    
    // Gráfico
    grafico: null,
    
    /**
     * Inicializa el dashboard
     */
    init: function() {
        this.cacheElementos();
        this.cargarDatos();
        this.registrarEventListeners();
    },
    
    /**
     * Cachea los elementos del DOM
     */
    cacheElementos: function() {
        const ids = [
            'totalCartera', 'totalFondos', 'totalETFs', 'totalOtros',
            'tablaUltimosMovimientos', 'graficoDistribucion'
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
     * Carga y muestra los datos
     */
    cargarDatos: function() {
        let historico = Storage.obtenerHistorico();
        let ultimo = historico.length > 0 ? historico[historico.length - 1] : null;
        
        if (ultimo) {
            this.mostrarResumen(ultimo);
            this.mostrarGrafico(ultimo);
        }
        
        this.mostrarUltimosMovimientos(historico);
    },
    
    /**
     * Muestra el resumen de cifras
     */
    mostrarResumen: function(ultimo) {
        let fondos = (ultimo.monetario || 0) + (ultimo.rfCorto || 0) + 
                     (ultimo.rfMedio || 0) + (ultimo.rv || 0) + (ultimo.alternativos || 0);
        let etfsTotal = (ultimo.etfs || []).reduce((sum, e) => sum + (e.cantidad * e.precioActual), 0);
        let otros = (ultimo.efectivo || 0) + (ultimo.inmobiliario || 0);
        let total = fondos + etfsTotal + otros;
        
        if (this.elementos.totalFondos) {
            this.elementos.totalFondos.innerText = UI.formatearMoneda(fondos);
        }
        if (this.elementos.totalETFs) {
            this.elementos.totalETFs.innerText = UI.formatearMoneda(etfsTotal);
        }
        if (this.elementos.totalOtros) {
            this.elementos.totalOtros.innerText = UI.formatearMoneda(otros);
        }
        if (this.elementos.totalCartera) {
            this.elementos.totalCartera.innerText = UI.formatearMoneda(total);
        }
    },
    
    /**
     * Muestra el gráfico de distribución
     */
    mostrarGrafico: function(ultimo) {
        if (!this.elementos.graficoDistribucion) return;
        
        let etfsTotal = (ultimo.etfs || []).reduce((sum, e) => sum + (e.cantidad * e.precioActual), 0);
        
        let datos = [
            ultimo.monetario || 0,
            ultimo.rfCorto || 0,
            ultimo.rfMedio || 0,
            ultimo.rv || 0,
            ultimo.alternativos || 0,
            etfsTotal,
            ultimo.efectivo || 0,
            ultimo.inmobiliario || 0
        ];
        
        let etiquetas = ['Monetario', 'RF Corto', 'RF Medio', 'RV', 'Alternativos', 'ETFs/Acc', 'Efectivo', 'Inmobiliario'];
        
        // Filtrar valores cero
        let datosFiltrados = [];
        let etiquetasFiltradas = [];
        let coloresFiltrados = [];
        
        for (let i = 0; i < datos.length; i++) {
            if (datos[i] > 0.01) {
                datosFiltrados.push(datos[i]);
                etiquetasFiltradas.push(etiquetas[i]);
                coloresFiltrados.push(COLORES_GRAFICOS[i % COLORES_GRAFICOS.length]);
            }
        }
        
        if (datosFiltrados.length === 0) {
            datosFiltrados = [1];
            etiquetasFiltradas = ['Sin datos'];
            coloresFiltrados = ['#ccc'];
        }
        
        // Destruir gráfico anterior si existe
        if (this.grafico) {
            this.grafico.destroy();
        }
        
        let ctx = this.elementos.graficoDistribucion.getContext('2d');
        this.grafico = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: etiquetasFiltradas,
                datasets: [{
                    data: datosFiltrados,
                    backgroundColor: coloresFiltrados,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: { font: { size: 12 } }
                    },
                    tooltip: { 
                        callbacks: { 
                            label: (ctx) => `${ctx.label}: ${ctx.raw.toFixed(2)} €` 
                        } 
                    }
                }
            }
        });
    },
    
    /**
     * Muestra los últimos movimientos
     */
    mostrarUltimosMovimientos: function(historico) {
        if (!this.elementos.tablaUltimosMovimientos) return;
        
        if (historico.length === 0) {
            this.elementos.tablaUltimosMovimientos.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px;">No hay movimientos</td></tr>';
            return;
        }
        
        // Últimos 5 movimientos (más recientes primero)
        let ultimos = historico.slice(-5).reverse();
        let html = '';
        
        for (let i = 0; i < ultimos.length; i++) {
            let anterior = (i < ultimos.length - 1) ? ultimos[i + 1].total : ultimos[i].total;
            let variacion = ultimos[i].total - anterior;
            let claseVariacion = variacion >= 0 ? 'positivo' : 'negativo';
            let signo = variacion >= 0 ? '+' : '';
            
            html += `<tr>
                <td>${ultimos[i].fecha || '-'}</td>
                <td>${anterior.toFixed(2)} €</td>
                <td>${ultimos[i].total.toFixed(2)} €</td>
                <td class="${claseVariacion}">${signo}${variacion.toFixed(2)} €</td>
            </tr>`;
        }
        
        this.elementos.tablaUltimosMovimientos.innerHTML = html;
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('graficoDistribucion')) {
        Dashboard.init();
    }
});