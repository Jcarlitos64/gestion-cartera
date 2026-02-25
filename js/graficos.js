// ==============================================
// graficos.js - Lógica de gráficos de evolución
// ==============================================

const Graficos = {
    // Elementos del DOM
    elementos: {},
    
    // Gráficos
    chartTotal: null,
    chartCategorias: null,
    
    // Rango seleccionado (días)
    diasRango: 0,
    
    /**
     * Inicializa los gráficos
     */
    init: function() {
        this.cacheElementos();
        this.registrarEventListeners();
        this.cargarDatos();
    },
    
    /**
     * Cachea los elementos del DOM
     */
    cacheElementos: function() {
        const ids = [
            'graficoTotal', 'graficoCategorias',
            'variacionTotal', 'mejorMomento', 'peorMomento'
        ];
        
        ids.forEach(id => {
            this.elementos[id] = document.getElementById(id);
        });
    },
    
    /**
     * Registra event listeners
     */
    registrarEventListeners: function() {
        // Los botones de rango se manejan con onclick en HTML
    },
    
    /**
     * Cambia el rango de tiempo
     */
    cambiarRango: function(dias, event) {
        this.diasRango = dias;
        
        // Actualizar clase activa en botones
        document.querySelectorAll('.btn-rango').forEach(btn => {
            btn.classList.remove('activo');
        });
        if (event && event.target) {
            event.target.classList.add('activo');
        }
        
        this.cargarDatos();
    },
    
    /**
     * Filtra registros por rango
     */
    filtrarPorRango: function(registros) {
        if (this.diasRango === 0) return registros;
        
        let fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - this.diasRango);
        
        return registros.filter(r => new Date(r.timestamp) >= fechaLimite);
    },
    
    /**
     * Carga y muestra los datos
     */
    cargarDatos: function() {
        let historico = Storage.obtenerHistorico();
        if (historico.length === 0) {
            this.mostrarSinDatos();
            return;
        }
        
        // Ordenar por fecha
        historico.sort((a, b) => a.timestamp - b.timestamp);
        
        // Filtrar por rango
        let filtrados = this.filtrarPorRango(historico);
        if (filtrados.length === 0) {
            this.mostrarSinDatos();
            return;
        }
        
        this.mostrarEstadisticas(filtrados);
        this.mostrarGraficoTotal(filtrados);
        this.mostrarGraficoCategorias(filtrados);
    },
    
    /**
     * Muestra mensaje de sin datos
     */
    mostrarSinDatos: function() {
        if (this.elementos.variacionTotal) {
            this.elementos.variacionTotal.innerHTML = '0%';
        }
        if (this.elementos.mejorMomento) {
            this.elementos.mejorMomento.innerText = '0 €';
        }
        if (this.elementos.peorMomento) {
            this.elementos.peorMomento.innerText = '0 €';
        }
        
        // Destruir gráficos si existen
        if (this.chartTotal) {
            this.chartTotal.destroy();
            this.chartTotal = null;
        }
        if (this.chartCategorias) {
            this.chartCategorias.destroy();
            this.chartCategorias = null;
        }
    },
    
    /**
     * Muestra estadísticas de evolución
     */
    mostrarEstadisticas: function(registros) {
        let totales = registros.map(r => r.total);
        let variacion = ((totales[totales.length - 1] - totales[0]) / totales[0] * 100).toFixed(1);
        
        if (this.elementos.variacionTotal) {
            this.elementos.variacionTotal.innerHTML = `<span class="${variacion >= 0 ? 'positivo' : 'negativo'}">${variacion}%</span>`;
        }
        
        let maxTotal = Math.max(...totales);
        let minTotal = Math.min(...totales);
        
        if (this.elementos.mejorMomento) {
            this.elementos.mejorMomento.innerText = maxTotal.toFixed(2) + ' €';
        }
        if (this.elementos.peorMomento) {
            this.elementos.peorMomento.innerText = minTotal.toFixed(2) + ' €';
        }
    },
    
    /**
     * Muestra gráfico de evolución total
     */
    mostrarGraficoTotal: function(registros) {
        if (!this.elementos.graficoTotal) return;
        
        let fechas = registros.map(r => r.fecha);
        let totales = registros.map(r => r.total);
        
        // Destruir gráfico anterior
        if (this.chartTotal) {
            this.chartTotal.destroy();
        }
        
        let ctx = this.elementos.graficoTotal.getContext('2d');
        this.chartTotal = new Chart(ctx, {
            type: 'line',
            data: {
                labels: fechas,
                datasets: [{
                    label: 'Total Cartera (€)',
                    data: totales,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.1,
                    fill: true,
                    pointRadius: 3,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `${ctx.raw.toFixed(2)} €`
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: (value) => value.toFixed(0) + ' €'
                        }
                    }
                }
            }
        });
    },
    
    /**
     * Muestra gráfico de evolución por categorías
     */
    mostrarGraficoCategorias: function(registros) {
        if (!this.elementos.graficoCategorias) return;
        
        let fechas = registros.map(r => r.fecha);
        
        let monetario = registros.map(r => r.monetario || 0);
        let rfCorto = registros.map(r => r.rfCorto || 0);
        let rfMedio = registros.map(r => r.rfMedio || 0);
        let rv = registros.map(r => r.rv || 0);
        let alternativos = registros.map(r => r.alternativos || 0);
        let etfsPorRegistro = registros.map(r => 
            (r.etfs || []).reduce((sum, e) => sum + e.cantidad * e.precioActual, 0)
        );
        let efectivo = registros.map(r => r.efectivo || 0);
        let inmobiliario = registros.map(r => r.inmobiliario || 0);
        
        // Destruir gráfico anterior
        if (this.chartCategorias) {
            this.chartCategorias.destroy();
        }
        
        let ctx = this.elementos.graficoCategorias.getContext('2d');
        this.chartCategorias = new Chart(ctx, {
            type: 'line',
            data: {
                labels: fechas,
                datasets: [
                    { label: 'Monetario', data: monetario, borderColor: '#4CAF50', tension: 0.1 },
                    { label: 'RF Corto', data: rfCorto, borderColor: '#2196F3', tension: 0.1 },
                    { label: 'RF Medio', data: rfMedio, borderColor: '#FFC107', tension: 0.1 },
                    { label: 'RV', data: rv, borderColor: '#9C27B0', tension: 0.1 },
                    { label: 'Alternativos', data: alternativos, borderColor: '#FF5722', tension: 0.1 },
                    { label: 'ETFs', data: etfsPorRegistro, borderColor: '#00BCD4', tension: 0.1 },
                    { label: 'Efectivo', data: efectivo, borderColor: '#795548', tension: 0.1 },
                    { label: 'Inmobiliario', data: inmobiliario, borderColor: '#607D8B', tension: 0.1 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `${ctx.dataset.label}: ${ctx.raw.toFixed(2)} €`
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: (value) => value.toFixed(0) + ' €'
                        }
                    }
                }
            }
        });
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('graficoTotal')) {
        Graficos.init();
    }
});