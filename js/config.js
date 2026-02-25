// ==============================================
// config.js - Configuración global y constantes
// ==============================================

// Perfiles predefinidos (AHORA CON 5 PERFILES)
const PERFILES_PREDEFINIDOS = {
    ultraconservador: { 
        nombre: "UltraConservador", 
        monetario: 30, 
        rfCorto: 30, 
        rfMedio: 25, 
        rv: 10, 
        alternativos: 5 
    },
    conservador: { 
        nombre: "Conservador", 
        monetario: 20, 
        rfCorto: 25, 
        rfMedio: 25, 
        rv: 20, 
        alternativos: 10 
    },
    equilibrado: { 
        nombre: "Equilibrado", 
        monetario: 5, 
        rfCorto: 15, 
        rfMedio: 25, 
        rv: 40, 
        alternativos: 15 
    },
    crecimiento: { 
        nombre: "Crecimiento", 
        monetario: 2, 
        rfCorto: 10, 
        rfMedio: 20, 
        rv: 55, 
        alternativos: 13 
    },
    arriesgado: { 
        nombre: "Arriesgado", 
        monetario: 0, 
        rfCorto: 5, 
        rfMedio: 15, 
        rv: 70, 
        alternativos: 10 
    }
};

// Nombres de categorías
const CATEGORIAS = [
    { id: 'monetario', nombre: 'Monetario', campo: 'monetario' },
    { id: 'rfCorto', nombre: 'RF Corto', campo: 'rfCorto' },
    { id: 'rfMedio', nombre: 'RF Medio', campo: 'rfMedio' },
    { id: 'rv', nombre: 'Renta Variable', campo: 'rv' },
    { id: 'alternativos', nombre: 'Alternativos', campo: 'alternativos' }
];

// IDs de los inputs de porcentajes
const PCT_IDS = [
    'pctMonetario',
    'pctRFCorto', 
    'pctRFMedio',
    'pctRV',
    'pctAlternativos'
];

// IDs de los inputs de importes de fondos
const FONDO_IDS = [
    'impMon',
    'impRFC',
    'impRFM', 
    'impRV',
    'impAlt'
];

// Colores para gráficos
const COLORES_GRAFICOS = [
    '#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#FF5722',
    '#00BCD4', '#795548', '#607D8B', '#E91E63', '#3F51B5'
];

// Configuración de tema
const TEMA_PREDETERMINADO = 'claro';