// ==============================================
// cartera.js - VERSIÓN SIMPLE Y DEFINITIVA
// ==============================================

// ==============================================
// CONFIGURACIÓN GLOBAL
// ==============================================
const PERFILES = {
    ultraconservador: { nombre: "UltraConservador", monetario: 30, rfCorto: 30, rfMedio: 25, rv: 10, alternativos: 5 },
    conservador: { nombre: "Conservador", monetario: 20, rfCorto: 25, rfMedio: 25, rv: 20, alternativos: 10 },
    equilibrado: { nombre: "Equilibrado", monetario: 5, rfCorto: 15, rfMedio: 25, rv: 40, alternativos: 15 },
    crecimiento: { nombre: "Crecimiento", monetario: 2, rfCorto: 10, rfMedio: 20, rv: 55, alternativos: 13 },
    arriesgado: { nombre: "Arriesgado", monetario: 0, rfCorto: 5, rfMedio: 15, rv: 70, alternativos: 10 }
};

// ==============================================
// VARIABLES GLOBALES
// ==============================================
let carteraActual = null;
let archivoActual = null;
let clickEnProceso = false; // Para evitar dobles clics

// ==============================================
// FUNCIONES DE UTILIDAD
// ==============================================
function formatearMoneda(valor) {
    if (isNaN(valor) || valor === null || valor === undefined) return '0,00 €';
    return valor.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

function mostrarModalGuardado(callback) {
    // Eliminar modal previo si existiera
    const previo = document.getElementById('_modalGuardado');
    if (previo) previo.remove();

    const overlay = document.createElement('div');
    overlay.id = '_modalGuardado';
    overlay.style.cssText = [
        'position:fixed', 'inset:0',
        'background:rgba(0,0,0,0.5)',
        'display:flex', 'justify-content:center', 'align-items:center',
        'z-index:99999'
    ].join(';');

    const box = document.createElement('div');
    box.style.cssText = [
        'background:white', 'border-radius:15px',
        'padding:35px 40px', 'max-width:420px', 'width:90%',
        'text-align:center', 'box-shadow:0 20px 60px rgba(0,0,0,0.3)'
    ].join(';');

    box.innerHTML = '<div style="font-size:48px;margin-bottom:15px">💾</div>' +
        '<h3 style="color:#333;margin-bottom:12px;font-size:20px">Archivo guardado</h3>' +
        '<p style="color:#555;line-height:1.6;margin-bottom:25px">' +
        'El archivo se ha descargado en la carpeta <strong>Descargas</strong> de tu navegador.<br><br>' +
        'Muévelo a la carpeta donde quieras conservarlo.' +
        '</p>' +
        '<button id="_btnAceptarModal" style="background:#4CAF50;color:white;border:none;' +
        'padding:12px 40px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer">' +
        'Aceptar</button>';

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById('_btnAceptarModal').addEventListener('click', function() { overlay.remove(); if (callback) callback(); });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) { overlay.remove(); if (callback) callback(); } });
}

// ==============================================
// GESTIÓN DE ARCHIVOS
// ==============================================
function guardarEnArchivo(datos, nombreSugerido = 'mi-cartera.json') {
    try {
        const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = nombreSugerido;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        archivoActual = nombreSugerido;
        
        // Mostrar mensaje flotante
        mostrarModalGuardado();
        
        return true;
    } catch (error) {
        return false;
    }
}

// ==============================================
// FUNCIONES DE CÁLCULO
// ==============================================
function calcularTotales(cartera) {
    if (!cartera) return { totalFondos: 0, total: 0 };
    
    const totalFondos = (cartera.monetario || 0) + (cartera.rfCorto || 0) + 
                        (cartera.rfMedio || 0) + (cartera.rv || 0) + (cartera.alternativos || 0);
    
    const total = totalFondos + (cartera.efectivo || 0) + (cartera.inmobiliario || 0);
    
    return { totalFondos, total };
}

// ==============================================
// INICIALIZACIÓN
// ==============================================
// La lógica de configuracion-inicial.html se gestiona
// completamente desde el propio HTML para evitar
// listeners duplicados en el botón iniciarCartera.

// Funciones globales
window.guardarEnArchivo = guardarEnArchivo;
window.formatearMoneda = formatearMoneda;
window.mostrarModalGuardado = mostrarModalGuardado;