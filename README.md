# 📊 SISTEMA DE GESTIÓN FINANCIERA

Bienvenido a tu **asistente personal de inversiones**. Esta aplicación te permite gestionar tu cartera, analizar activos, rebalancear inversiones y tomar decisiones informadas con ayuda de inteligencia artificial.

---

## 📑 ÍNDICE
1. [Primeros pasos](#primeros-pasos)
2. [Estructura de la aplicación](#estructura-de-la-aplicación)
3. [Guía paso a paso](#guía-paso-a-paso)
   - [Configurar cartera nueva](#-configurar-cartera-nueva)
   - [Añadir fondos y ETFs](#-añadir-fondos-y-etfs)
   - [Analizar un activo con IA](#-analizar-un-activo-con-ia)
   - [Importar cartera desde captura](#-importar-cartera-desde-captura)
   - [Rebalancear cartera](#-rebalancear-cartera)
   - [Plan DCA](#-plan-dca)
4. [Explicación de cada botón](#explicación-de-cada-botón)
5. [Preguntas frecuentes](#preguntas-frecuentes)

---

## 🚀 PRIMEROS PASOS

### Acceso a la aplicación
- **Web:** `https://tu-proyecto.vercel.app`
- **Inicio:** Comienza en `index.html`

### Pantalla de inicio
Tienes dos opciones:
- **🚀 INICIAR APLICACIÓN** → Si ya tienes datos guardados, va directo al Dashboard. Si es tu primera vez, te lleva a configurar.
- **✨ CONFIGURAR NUEVA CARTERA** → Para empezar desde cero (aunque ya tengas datos).

---

## 🏗️ ESTRUCTURA DE LA APLICACIÓN

| Página | Función |
|--------|---------|
| **Dashboard** | Resumen global y gráfico de distribución |
| **Cartera Principal** | Gestionar fondos, ETFs, efectivo y rebalanceos |
| **Histórico** | Registro de todos los cambios y variaciones |
| **Analizador** | Analizar activos con ayuda de IA |
| **Composición** | Ver detalle de todos tus activos |
| **Gráficos** | Evolución temporal de la cartera |
| **Herramientas** | Exportar/importar datos, múltiples carteras, temas |
| **Ayuda** | Esta guía completa |

---

## 📘 GUÍA PASO A PASO

### 🔧 CONFIGURAR CARTERA NUEVA

1. Desde `index.html`, haz clic en **"CONFIGURAR NUEVA CARTERA"**
2. Introduce tu **Capital Total**
3. Distribuye el capital entre:
   - Efectivo
   - Fondos
   - ETFs/Acciones
   - Inmobiliario
4. Selecciona un **perfil de riesgo** (los porcentajes se ajustarán automáticamente)
5. Haz clic en **"INICIAR CARTERA"**

✅ Ya tienes tu cartera creada. Ahora puedes añadir detalles.

---

### 📈 AÑADIR FONDOS Y ETFs

#### Para añadir un ETF o acción:
1. Ve a **Cartera Principal**
2. En la sección **"ETFs Y ACCIONES INDIVIDUALES"**, haz clic en **"+ Añadir ETF/Acción"**
3. Rellena los datos:
   - Tipo (ETF o Acción)
   - ISIN/Ticker
   - Nombre
   - Cantidad
   - Precio de compra
   - Precio actual
4. Los cálculos de % y ganancia/pérdida se hacen automáticamente

#### Para modificar fondos por categoría:
- En la tabla **"FONDOS POR CATEGORÍA"** puedes editar directamente el **Importe Actual**
- Al cambiar un valor, el efectivo se ajusta automáticamente

---

### 🔍 ANALIZAR UN ACTIVO CON IA (Flujo completo)

Esta es la función más potente. Te permite obtener un análisis profesional de cualquier acción, fondo o ETF.

#### PASO 1: Obtener el ISIN
- Busca el ISIN del activo (ej: US01609W1027 para Alibaba)
- Si no lo sabes, busca en Google "ISIN de [nombre empresa]"

#### PASO 2: Ir al Analizador
- Haz clic en **"Analizador"** en el menú superior

#### PASO 3: Usar el asistente (4 pasos)

**PASO 1 - Introducir ISIN:**
- Escribe el ISIN en el campo
- Selecciona el tipo (Acción, Fondo o ETF)

**PASO 2 - Aportar información (opcional pero recomendable):**
- **📸 Adjuntar captura** → Si tienes capturas de pantalla de gráficos o datos
- **📋 Adjuntar texto** → Si has copiado texto de un extracto
- **📄 Adjuntar documento** → Si tienes informes en PDF

> 💡 Puedes adjuntar todo lo que quieras. La IA lo tendrá en cuenta.

**PASO 3 - Generar prompt:**
- Haz clic en **"GENERAR PROMPT COMPLETO"**
- **Se copiará automáticamente** al portapapeles un prompt enorme con todo el contexto
- **Se abrirá DeepSeek** en una nueva pestaña

**PASO 4 - En DeepSeek:**
1. Pega el prompt (Ctrl+V / Cmd+V)
2. Si adjuntaste capturas, súbelas ahora
3. Pulsa Enter y espera
4. DeepSeek te devolverá un **JSON** con todos los datos
5. **Copia ese JSON** (selecciona todo y Ctrl+C)

**PASO 5 - Volver a la aplicación:**
1. Vuelve a la pestaña del Analizador
2. En el **PASO 4**, pega el JSON en el área de texto
3. Haz clic en **"PROCESAR JSON Y VEREDICTO"**

✅ **¡Listo!** Verás:
- Todos los campos rellenados automáticamente
- Un veredicto claro: **COMPRAR, MANTENER o VENDER**
- Precio objetivo y stop loss recomendado
- Análisis fundamental y técnico

---

### 📸 IMPORTAR CARTERA DESDE CAPTURA

Si quieres cargar tu cartera real desde MyInvestor, tu banco o bróker:

1. Ve a **"Importar Cartera"** desde el menú o desde Herramientas

2. **Opción A - Captura de pantalla:**
   - Haz una captura de tu cartera
   - Haz clic en **"📸 GENERAR PROMPT"**
   - Se mostrará el prompt en pantalla
   - **CÓPIALO MANUALMENTE** (Ctrl+C)
   - Ve a DeepSeek, pégalo y adjunta la imagen
   - Copia el JSON resultante

3. **Opción B - Texto copiado:**
   - Copia el texto de tu extracto
   - Pégalo en el área de texto
   - Haz clic en **"📋 GENERAR PROMPT"**
   - Copia el prompt manualmente
   - Ve a DeepSeek y pégalo
   - Copia el JSON resultante

4. **Paso final:**
   - Pega el JSON en el área **"PEGA AQUÍ EL JSON"**
   - Haz clic en **"IMPORTAR CARTERA"**

✅ Los fondos y ETFs se cargarán automáticamente con todos sus datos.

---

### 🔄 REBALANCEAR CARTERA

#### Rebalanceo Directo:
1. En **Cartera Principal**, haz clic en **"Calcular"** (en Rebalanceo Directo)
2. Verás las acciones necesarias:
   - 🔴 Categorías con superávit (se redistribuirán)
   - 🟢 Categorías con déficit (recibirán)
   - 💶 Uso de efectivo si es necesario
3. Si estás de acuerdo, haz clic en **"Aplicar Rebalanceo"**

#### Rebalanceo vía DCA (Aportaciones periódicas):
1. Ajusta el **aporte periódico** y la **periodicidad**
2. Haz clic en **"Calcular Plan DCA"**
3. Verás qué categorías necesitan aportes y cuántos periodos
4. El sistema prioriza siempre las que tienen mayor déficit

---

### 📅 PLAN DCA (Aportaciones Periódicas)

1. En **Cartera Principal**, ve a la sección DCA
2. Ajusta:
   - **Aporte periódico** (cantidad)
   - **Periodicidad** (semanal, mensual, trimestral, etc.)
3. La **próxima fecha** se calcula automáticamente
4. La tabla muestra cómo se distribuiría según % objetivo
5. La **recomendación DCA** te dice cuánto falta en cada categoría

---

## 🎯 EXPLICACIÓN DE CADA BOTÓN

### En Dashboard
| Botón | Qué hace |
|-------|----------|
| (Los cards) | Muestran totales de cartera, fondos, ETFs y otros |

### En Cartera Principal
| Botón | Qué hace |
|-------|----------|
| **Perfiles predefinidos** | Aplica porcentajes de ultraconservador a arriesgado |
| **➕ Nuevo** (perfiles) | Crea un perfil personalizado |
| **✏️ Editar** | Modifica perfil seleccionado |
| **🗑️ Borrar** | Elimina perfil |
| **📥 Cargar** | Aplica perfil seleccionado a los porcentajes |
| **+ Añadir ETF/Acción** | Añade fila para nuevo activo |
| **Calcular** (Rebalanceo) | Muestra acciones necesarias sin aplicar |
| **Aplicar Rebalanceo** | Ejecuta el rebalanceo y guarda |
| **Calcular Plan DCA** | Muestra distribución óptima de aportes |
| **💾 GUARDAR TODO** | Guarda estado actual en histórico |
| **📊 RESUMEN** | Muestra popup con totales |

### En Analizador
| Botón | Qué hace |
|-------|----------|
| **📋** (junto a ISIN) | Copia ISIN al portapapeles |
| **🔍 Buscar** | Abre búsqueda en Yahoo Finance |
| **📸 Adjuntar captura** | Añade captura a la lista (sin copiar) |
| **📋 Adjuntar texto** | Añade texto a la lista |
| **📄 Adjuntar documento** | Añade documento a la lista |
| **🎯 GENERAR PROMPT COMPLETO** | Crea prompt con todo el contexto y lo copia |
| **🔍 EJECUTAR BÚSQUEDA** | Mismo que generar prompt |
| **📥 PROCESAR JSON Y VEREDICTO** | Carga el JSON y muestra análisis |

### En Histórico
| Botón | Qué hace |
|-------|----------|
| **📥 Exportar CSV** | Descarga todo el histórico en Excel |
| **🗑️ Limpiar Histórico** | Borra todos los registros (reinicía cartera) |

### En Composición
| Botón | Qué hace |
|-------|----------|
| **📥 Exportar CSV** | Descarga composición actual |
| **🔄 Actualizar** | Recarga la página |
| **📸 Importar desde captura** | Va a la página de importación |

### En Gráficos
| Botón | Qué hace |
|-------|----------|
| **Últimos 7/30/90 días** | Filtra el rango de tiempo |
| **Todo el histórico** | Muestra todos los datos |

### En Herramientas
| Botón | Qué hace |
|-------|----------|
| **Exportar a archivo** | Guarda backup completo (JSON) |
| **Importar desde archivo** | Restaura backup |
| **➕ Nueva** (cartera) | Crea cartera independiente |
| **📂 Cargar** | Cambia a cartera seleccionada |
| **✏️ Renombrar** | Cambia nombre de cartera |
| **🗑️ Borrar** | Elimina cartera |
| **Guardar configuración** (alertas) | Guarda preferencias de notificaciones |
| **☀️ Claro / 🌙 Oscuro** | Cambia tema de la app |
| **📥 IR A IMPORTAR CARTERA** | Va a página de importación |

---

## ❓ PREGUNTAS FRECUENTES

### ¿Por qué al pegar el JSON da error?
- Revisa que el JSON tenga **todas las comillas** cerradas
- Asegúrate de que no haya texto antes o después del JSON
- Usa un validador online si tienes dudas

### ¿Se pueden tener varias carteras?
Sí. En **Herramientas → Múltiples Carteras** puedes crear, renombrar y cambiar entre carteras independientes.

### ¿Cómo guardo mis datos?
Los datos se guardan **automáticamente** en tu navegador. Puedes hacer backup con **Exportar a archivo**.

### ¿Puedo usar otra IA que no sea DeepSeek?
Sí. En el Analizador tienes botones para Gemini, ChatGPT y Claude. El proceso es el mismo.

### ¿Qué hago si la web se ve sin estilos en Vercel?
Asegúrate de:
1. Las rutas a CSS son `href="css/estilo.css"` (sin / al inicio)
2. Has subido el archivo **`.nojekyll`** a la raíz

### ¿Los perfiles personalizados se guardan?
Sí, se guardan en el navegador y también en los backups.

### ¿Cómo sé si debo COMPRAR, MANTENER o VENDER?
El Analizador te dará un veredicto basado en:
- Análisis fundamental (PER, BPA, crecimiento...)
- Análisis técnico (tendencias, soportes...)
- Contexto geopolítico y macroeconómico
- Movimientos de grandes inversores
- Noticias recientes

---

## 🆘 SOPORTE

Si encuentras algún error o necesitas ayuda:
- Revisa esta guía
- Asegúrate de tener la última versión
- Comprueba que los JSON sean válidos

---

**¡Feliz inversión!** 🚀💰
