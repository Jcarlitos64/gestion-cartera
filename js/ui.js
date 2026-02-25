// ==============================================
// ui.js - Utilidades de interfaz de usuario
// ==============================================

const UI = {
    /**
     * Copia texto al portapapeles
     */
    copiarTexto: function(texto, mensaje) {
        navigator.clipboard.writeText(texto).then(() => {
            this.mostrarAlerta(mensaje || '✅ Copiado al portapapeles', 'info');
        }).catch(() => {
            this.mostrarAlerta('❌ No se pudo copiar', 'warning');
        });
    },
    
    /**
     * Muestra una alerta flotante
     */
    mostrarAlerta: function(mensaje, tipo = 'info') {
        let alerta = document.createElement('div');
        alerta.style.position = 'fixed';
        alerta.style.bottom = '20px';
        alerta.style.right = '20px';
        alerta.style.padding = '15px 20px';
        alerta.style.background = tipo === 'info' ? '#2196F3' : '#FF9800';
        alerta.style.color = 'white';
        alerta.style.borderRadius = '8px';
        alerta.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        alerta.style.zIndex = '1000';
        alerta.style.cursor = 'pointer';
        alerta.style.maxWidth = '300px';
        alerta.style.wordWrap = 'break-word';
        alerta.innerHTML = mensaje + ' <span style="margin-left:10px; font-weight:bold;">✖</span>';
        
        alerta.onclick = () => alerta.remove();
        document.body.appendChild(alerta);
        
        setTimeout(() => {
            if (alerta.parentNode) alerta.remove();
        }, 5000);
    },
    
    /**
     * Aplica el tema claro u oscuro
     */
    aplicarTema: function(tema) {
        let body = document.body;
        
        if (tema === 'oscuro') {
            body.style.background = '#1a1a1a';
            
            document.querySelectorAll('.card, .menu').forEach(el => {
                el.style.background = '#2d2d2d';
                el.style.color = '#fff';
            });
            
            document.querySelectorAll('h1, h2, h3, h4, label, p').forEach(el => {
                el.style.color = '#eee';
            });
            
            document.querySelectorAll('input, select, .perfil-select, textarea').forEach(el => {
                el.style.background = '#3d3d3d';
                el.style.color = '#fff';
                el.style.borderColor = '#555';
            });
            
            document.querySelectorAll('table td, table th').forEach(el => {
                if (el.tagName === 'TH') {
                    el.style.background = '#444';
                } else {
                    el.style.background = '#2d2d2d';
                    el.style.color = '#eee';
                }
            });
            
        } else {
            body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            
            document.querySelectorAll('.card, .menu').forEach(el => {
                el.style.background = 'white';
                el.style.color = '#333';
            });
            
            document.querySelectorAll('h1, h2, h3, h4, label, p').forEach(el => {
                el.style.color = '';
            });
            
            document.querySelectorAll('input, select, .perfil-select, textarea').forEach(el => {
                el.style.background = 'white';
                el.style.color = '#333';
                el.style.borderColor = '#ccc';
            });
            
            document.querySelectorAll('table td, table th').forEach(el => {
                el.style.background = '';
                el.style.color = '';
            });
        }
    },
    
    /**
     * Formatea un número como moneda
     */
    formatearMoneda: function(valor) {
        return new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(valor) + ' €';
    },
    
    /**
     * Formatea un número como porcentaje
     */
    formatearPorcentaje: function(valor, decimales = 1) {
        return valor.toFixed(decimales) + '%';
    }
};