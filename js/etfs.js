// ==============================================
// etfs.js - Gestión de ETFs y acciones
// ==============================================

const ETFs = {
    // Array de ETFs
    lista: [],
    
    /**
     * Inicializa
     */
    init: function() {
        let datos = Storage.cargarUltimosDatos();
        this.lista = datos.etfs || [];
        this.renderizar();
    },
    
    /**
     * Obtiene todos los ETFs
     */
    obtenerTodos: function() {
        return this.lista;
    },
    
    /**
     * Añade un nuevo ETF vacío
     */
    agregar: function() {
        this.lista.push({
            tipo: 'ETF',
            isin: '',
            nombre: '',
            cantidad: 0,
            precioCompra: 0,
            precioActual: 0
        });
        this.renderizar();
    },
    
    /**
     * Elimina un ETF por índice
     */
    eliminar: function(index) {
        this.lista.splice(index, 1);
        this.renderizar();
        if (typeof Cartera !== 'undefined') {
            Cartera.actualizarUI();
        }
    },
    
    /**
     * Actualiza un campo de un ETF
     */
    actualizar: function(index, campo, valor) {
        if (campo === 'cantidad' || campo === 'precioCompra' || campo === 'precioActual') {
            this.lista[index][campo] = parseFloat(valor) || 0;
        } else {
            this.lista[index][campo] = valor;
        }
        if (typeof Cartera !== 'undefined') {
            Cartera.actualizarUI();
        }
    },
    
    /**
     * Calcula el total de todos los ETFs
     */
    calcularTotal: function() {
        return this.lista.reduce((sum, e) => sum + (e.cantidad * e.precioActual), 0);
    },
    
    /**
     * Renderiza la tabla de ETFs
     */
    renderizar: function() {
        let tbody = document.getElementById('cuerpoETFs');
        if (!tbody) return;
        
        let total = 0;
        let totalCarteraElem = document.getElementById('totalCartera');
        if (totalCarteraElem) {
            total = parseFloat(totalCarteraElem.innerText) || 0;
        }
        
        let html = '';
        this.lista.forEach((e, i) => {
            let valorActual = e.cantidad * e.precioActual;
            let valorCompra = e.cantidad * e.precioCompra;
            let rend = valorCompra > 0 ? ((valorActual - valorCompra) / valorCompra * 100).toFixed(1) : 0;
            let pct = total > 0 ? (valorActual / total * 100).toFixed(1) : 0;
            
            html += `<tr>
                <td>
                    <select onchange="ETFs.actualizar(${i}, 'tipo', this.value)">
                        <option value="ETF" ${e.tipo === 'ETF' ? 'selected' : ''}>ETF</option>
                        <option value="ACCION" ${e.tipo === 'ACCION' ? 'selected' : ''}>Acción</option>
                    </select>
                </td>
                <td><input type="text" value="${e.isin}" onchange="ETFs.actualizar(${i}, 'isin', this.value)" placeholder="ISIN"></td>
                <td><input type="text" value="${e.nombre}" onchange="ETFs.actualizar(${i}, 'nombre', this.value)" placeholder="Nombre"></td>
                <td><input type="number" value="${e.cantidad}" onchange="ETFs.actualizar(${i}, 'cantidad', this.value)" step="0.01" min="0"></td>
                <td><input type="number" value="${e.precioCompra}" onchange="ETFs.actualizar(${i}, 'precioCompra', this.value)" step="0.01" min="0"></td>
                <td><input type="number" value="${e.precioActual}" onchange="ETFs.actualizar(${i}, 'precioActual', this.value)" step="0.01" min="0"></td>
                <td>${valorActual.toFixed(2)} €</td>
                <td>${pct}%</td>
                <td class="${rend >= 0 ? 'positivo' : 'negativo'}">${rend}%</td>
                <td><button class="btn-remove" onclick="ETFs.eliminar(${i})">🗑️</button></td>
            </tr>`;
        });
        
        tbody.innerHTML = html;
    }
};