# 📊 SISTEMA DE GESTIÓN FINANCIERA

Bienvenido a tu **asistente personal de inversiones**. Esta aplicación te permite gestionar tu cartera, analizar activos, rebalancear inversiones y tomar decisiones informadas con ayuda de inteligencia artificial.

---

## 📑 ÍNDICE
1. [Primeros pasos](#primeros-pasos)
2. [Estructura de la aplicación](#estructura-de-la-aplicación)
3. [Guía paso a paso](#guía-paso-a-paso)
   - [Configurar cartera nueva](#configurar-cartera-nueva)
   - [Añadir fondos y ETFs](#añadir-fondos-y-etfs)
   - [Analizar un activo con IA](#analizar-un-activo-con-ia)
   - [Importar cartera desde captura](#importar-cartera-desde-captura)
   - [Rebalancear cartera](#rebalancear-cartera)
   - [Plan DCA](#plan-dca)
4. [Explicación de cada botón](#explicación-de-cada-botón)
5. [Preguntas frecuentes](#preguntas-frecuentes)

---

## PRIMEROS PASOS

### Acceso a la aplicación
- **Web:** `https://tu-proyecto.vercel.app`
- **Inicio:** Comienza en `index.html`

### Pantalla de inicio
Tienes dos opciones:
- **🚀 INICIAR APLICACIÓN** → Si ya tienes datos guardados, va directo al Dashboard. Si es tu primera vez, te lleva a configurar.
- **✨ CONFIGURAR NUEVA CARTERA** → Para empezar desde cero (aunque ya tengas datos).

---

## ESTRUCTURA DE LA APLICACIÓN

| Página | Función | Cómo llegar |
|--------|---------|-------------|
| **Dashboard** | Resumen global y gráfico de distribución | Menú principal > 🏠 Dashboard |
| **Cartera Principal** | Gestionar fondos, ETFs, efectivo y rebalanceos | Menú principal > 📈 Cartera Principal |
| **Histórico** | Registro de todos los cambios y variaciones | Menú principal > 🔄 Histórico |
| **Analizador** | Analizar activos con ayuda de IA | Menú principal > 🔍 Analizador |
| **Composición** | Ver detalle de todos tus activos | Menú principal > 📊 Composición |
| **Gráficos** | Evolución temporal de la cartera | Menú principal > 📈 Gráficos |
| **Herramientas** | Exportar/importar datos, múltiples carteras, temas | Menú principal > 🛠️ Herramientas |
| **Ayuda** | Esta guía completa | Menú principal > ❓ Ayuda |

---

## GUÍA PASO A PASO

### Configurar cartera nueva

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

### Añadir fondos y ETFs

#### Para añadir un ETF o acción:
1. Ve a **Cartera Principal**
2. En la sección **"ETFs Y ACCIONES INDIVIDUALES"**, busca el botón **"+ Añadir ETF/Acción"**
3. Rellena los datos:
   - **Tipo**: ETF o Acción
   - **ISIN/Ticker**: Código del activo
   - **Nombre**: Nombre completo
   - **Cantidad**: Número de participaciones/acciones
   - **Precio de compra**: Lo que pagaste
   - **Precio actual**: Valor actual
4. Los cálculos de % y ganancia/pérdida se hacen automáticamente

#### Para modificar fondos por categoría:
- En la tabla **"FONDOS POR CATEGORÍA"** puedes editar directamente el **Importe Actual** (columna con campo de texto)
- Al cambiar un valor, el efectivo se ajusta automáticamente
- La **desviación** te indica si estás por encima (verde) o por debajo (rojo) del objetivo

---

### Analizar un activo con IA

Esta es la función más potente. Te permite obtener un análisis profesional de cualquier acción, fondo o ETF.

#### 📌 **PASO 1: Obtener el ISIN**
- Busca el ISIN del activo (ej: US01609W1027 para Alibaba)
- Si no lo sabes, busca en Google "ISIN de [nombre empresa]"

#### 📌 **PASO 2: Ir al Analizador**
- Haz clic en **"Analizador"** en el menú superior

#### 📌 **PASO 3: Usar el asistente (4 pasos)**

**🔹 PASO 1 - Introducir ISIN:**
- Escribe el ISIN en el campo
- Selecciona el tipo (Acción, Fondo o ETF)

**🔹 PASO 2 - Aportar información (opcional pero recomendable):**
- **📸 Adjuntar captura** → Si tienes capturas de pantalla de gráficos o datos
- **📋 Adjuntar texto** → Si has copiado texto de un extracto
- **📄 Adjuntar documento** → Si tienes informes en PDF

> 💡 Puedes adjuntar todo lo que quieras. La IA lo tendrá en cuenta.

**🔹 PASO 3 - Generar prompt:**
- Haz clic en **"GENERAR PROMPT COMPLETO"**
- **Se copiará automáticamente** al portapapeles un prompt enorme con todo el contexto
- **Se abrirá DeepSeek** en una nueva pestaña

**🔹 PASO 4 - En DeepSeek:**
1. Pega el prompt (Ctrl+V / Cmd+V)
2. Si adjuntaste capturas, súbelas ahora
3. Pulsa Enter y espera (puede tardar 30-60 segundos)
4. DeepSeek te devolverá un **JSON** con todos los datos
5. **Copia ese JSON** (selecciona todo y Ctrl+C)

**🔹 PASO 5 - Volver a la aplicación:**
1. Vuelve a la pestaña del Analizador
2. En el **PASO 4**, pega el JSON en el área de texto
3. Haz clic en **"PROCESAR JSON Y VEREDICTO"**

✅ **¡Listo!** Verás:
- Todos los campos rellenados automáticamente
- Un veredicto claro: **COMPRAR, MANTENER o VENDER** (con color de fondo)
- Precio objetivo y stop loss recomendado
- Análisis fundamental, técnico y contexto geopolítico

---

### Importar cartera desde captura

Si quieres cargar tu cartera real desde MyInvestor, tu banco o bróker:

#### 📌 **Paso 1: Acceder**
- Ve a **"Importar Cartera"** desde el menú o desde Herramientas

#### 📌 **Paso 2: Elegir método**

**Opción A - Captura de pantalla:**
1. Haz una captura de tu cartera (pantallazo)
2. Haz clic en **"📸 GENERAR PROMPT"** (NO copia nada automáticamente)
3. Verás el prompt en un recuadro
4. **Cópialo MANUALMENTE** (selecciona y Ctrl+C)
5. Ve a DeepSeek, pega el prompt y adjunta la imagen
6. Copia el JSON resultante

**Opción B - Texto copiado:**
1. Copia el texto de tu extracto bancario
2. Pégalo en el área de texto
3. Haz clic en **"📋 GENERAR PROMPT"**
4. Copia el prompt manualmente
5. Ve a DeepSeek y pégalo (sin imagen)
6. Copia el JSON resultante

#### 📌 **Paso 3: Importar**
1. Vuelve a la aplicación
2. Pega el JSON en el área **"PEGA AQUÍ EL JSON"**
3. Haz clic en **"IMPORTAR CARTERA"**

✅ Los fondos y ETFs se cargarán automáticamente con todos sus datos. La página te redirigirá a Cartera Principal para que veas el resultado.

---

### Rebalancear cartera

#### Rebalanceo Directo:
1. En **Cartera Principal**, busca la sección **"Rebalanceo Directo"**
2. Haz clic en **"Calcular"**
3. Verás las acciones necesarias:
   - 🔴 **Categorías con superávit**: tienen excedente (se redistribuirá)
   - 🟢 **Categorías con déficit**: necesitan más dinero
   - 💶 **Uso de efectivo**: si después de redistribuir sigue faltando
4. Si estás de acuerdo, haz clic en **"Aplicar Rebalanceo"**
5. Se guardará automáticamente en el histórico

#### Rebalanceo vía DCA (Aportaciones periódicas):
1. En la misma sección, ve a **"Rebalanceo vía DCA"**
2. Ajusta el **aporte periódico** (cantidad)
3. Selecciona la **periodicidad** (semanal, mensual...)
4. Haz clic en **"Calcular Plan DCA"**
5. Verás:
   - Qué categorías necesitan aportes
   - Cuánto dinero necesitan
   - Cuántos periodos se requieren con el aporte actual
   - Priorización automática de las más deficitarias

---

### Plan DCA

1. En **Cartera Principal**, ve a la sección **"PLAN DCA"**
2. Ajusta los parámetros:
   - **Aporte periódico**: cantidad a invertir cada vez
   - **Periodicidad**: semanal, mensual, trimestral, semestral o anual
3. La **próxima fecha** se calcula automáticamente según la periodicidad
4. La tabla **"Distribución de la aportación"** muestra cómo se repartiría según los porcentajes objetivo
5. La **"Recomendación DCA"** te dice:
   - Cuánto falta en cada categoría
   - Cuántos periodos se necesitan
   - Si la cartera está equilibrada

---

## EXPLICACIÓN DE CADA BOTÓN

### En Dashboard
| Botón | Dónde está | Qué hace |
|-------|------------|----------|
| **Cards de resumen** | Parte superior | Muestran totales de cartera, fondos, ETFs y otros |
| (Gráfico) | Centro | Muestra distribución actual en gráfico de tarta |
| (Tabla) | Abajo | Últimos 5 movimientos con variación |

### En Cartera Principal
| Botón | Dónde está | Qué hace |
|-------|------------|----------|
| **UltraConservador / Conservador / Equilibrado / Crecimiento / Arriesgado** | Perfiles predefinidos | Aplica porcentajes preestablecidos |
| **➕ Nuevo** | Perfiles personalizados | Abre modal para crear perfil propio |
| **✏️ Editar** | Perfiles personalizados | Modifica perfil seleccionado |
| **🗑️ Borrar** | Perfiles personalizados | Elimina perfil (pide confirmación) |
| **📥 Cargar** | Perfiles personalizados | Aplica perfil seleccionado a los porcentajes |
| **+ Añadir ETF/Acción** | Tabla de ETFs | Añade una fila nueva para un activo |
| **Calcular** (en Rebalanceo Directo) | Sección Rebalanceo | Muestra acciones necesarias sin aplicar cambios |
| **Aplicar Rebalanceo** | Sección Rebalanceo | Ejecuta el rebalanceo y guarda en histórico |
| **Calcular Plan DCA** | Sección Rebalanceo vía DCA | Muestra distribución óptima de aportes |
| **💾 GUARDAR TODO** | Botones generales | Guarda estado actual en histórico |
| **📊 RESUMEN** | Botones generales | Muestra popup con totales actuales |

### En Analizador
| Botón | Dónde está | Qué hace |
|-------|------------|----------|
| **📋** (junto a ISIN) | Campo ISIN | Copia el ISIN al portapapeles |
| **🔍 Buscar** | Campo Ticker Yahoo | Abre búsqueda en Yahoo Finance |
| **📸 Adjuntar captura** | Asistente paso 2 | Añade captura a la lista (sin copiar) |
| **📋 Adjuntar texto** | Asistente paso 2 | Añade texto a la lista |
| **📄 Adjuntar documento** | Asistente paso 2 | Añade documento a la lista |
| **🎯 GENERAR PROMPT COMPLETO** | Asistente paso 3 | Crea prompt con todo el contexto y lo copia |
| **🔍 EJECUTAR BÚSQUEDA** | Asistente paso 3 | Mismo que generar prompt |
| **📥 PROCESAR JSON Y VEREDICTO** | Asistente paso 4 | Carga el JSON y muestra análisis completo |

### En Histórico
| Botón | Dónde está | Qué hace |
|-------|------------|----------|
| **📥 Exportar CSV** | Parte superior | Descarga todo el histórico en formato Excel/CSV |
| **🗑️ Limpiar Histórico** | Parte superior | Borra todos los registros (reinicía la cartera) |

### En Composición
| Botón | Dónde está | Qué hace |
|-------|------------|----------|
| **📥 Exportar CSV** | Botones de acción | Descarga composición actual |
| **🔄 Actualizar** | Botones de acción | Recarga la página |
| **📸 Importar desde captura** | Botones de acción | Va a la página de importación |

### En Gráficos
| Botón | Dónde está | Qué hace |
|-------|------------|----------|
| **Últimos 7 días** | Selector de rango | Filtra los últimos 7 días |
| **Últimos 30 días** | Selector de rango | Filtra los últimos 30 días |
| **Últimos 90 días** | Selector de rango | Filtra los últimos 90 días |
| **Todo el histórico** | Selector de rango | Muestra todos los datos disponibles |

### En Herramientas
| Botón | Dónde está | Qué hace |
|-------|------------|----------|
| **Exportar a archivo** | Exportar/Importar | Guarda backup completo (archivo JSON) |
| **Importar desde archivo** | Exportar/Importar | Restaura backup desde archivo |
| **➕ Nueva** | Múltiples carteras | Crea cartera independiente |
| **📂 Cargar** | Múltiples carteras | Cambia a cartera seleccionada |
| **✏️ Renombrar** | Múltiples carteras | Cambia nombre de cartera |
| **🗑️ Borrar** | Múltiples carteras | Elimina cartera (excepto 'default') |
| **Guardar configuración** | Alertas | Guarda preferencias de notificaciones |
| **☀️ Claro** | Tema | Cambia a tema claro |
| **🌙 Oscuro** | Tema | Cambia a tema oscuro |
| **📥 IR A IMPORTAR CARTERA** | Importar desde captura | Va a página de importación |

---

## PREGUNTAS FRECUENTES

### ERRORES COMUNES

#### ¿Por qué al pegar el JSON da error "Unexpected token"?
- **Causa**: El JSON tiene un error de formato
- **Solución**: Revisa que:
  - Todas las comillas estén cerradas
  - No haya comas después del último elemento
  - No haya texto antes o después del JSON (solo el JSON)
  - Puedes probar en https://jsonlint.com para validar

#### ¿Por qué la web se ve sin estilos (todo texto) en Vercel?
- **Causa**: Problema con las rutas de CSS
- **Solución**: Asegúrate de:
  1. Las rutas en los HTML son `href="css/estilo.css"` (sin / al inicio)
  2. Has subido el archivo **`.nojekyll`** a la raíz del proyecto
  3. Las carpetas `css` y `js` están en el mismo nivel que los HTML

#### ¿Por qué no se guardan mis datos al recargar?
- **Causa**: El localStorage del navegador se borró o está lleno
- **Solución**: 
  - Usa la función **Exportar a archivo** para hacer backup
  - Comprueba que no navegas en modo incógnito

### CONSEJOS ÚTILES

#### ¿Puedo usar otra IA que no sea DeepSeek?
Sí. En el Analizador tienes botones para:
- **Gemini** (Google)
- **ChatGPT** (OpenAI)
- **Claude** (Anthropic)

El proceso es el mismo: generas el prompt, lo copias, vas a la IA, lo pegas y vuelves con el JSON.

#### ¿Cómo sé qué perfil de riesgo elegir?
| Perfil | Descripción | Para quién |
|--------|-------------|------------|
| **UltraConservador** | 95% RF, 5% RV | Jubilados, aversión total al riesgo |
| **Conservador** | 80% RF, 20% RV | Perfil prudente, cerca de jubilación |
| **Equilibrado** | 50% RF, 50% RV | Horizonte medio, tolerancia media |
| **Crecimiento** | 30% RF, 70% RV | Horizonte largo, busca crecimiento |
| **Arriesgado** | 10% RF, 90% RV | Joven, alta tolerancia, busca máximo crecimiento |

#### ¿Los perfiles personalizados se guardan?
Sí, se guardan en el navegador y también en los backups que hagas con **Exportar a archivo**.

#### ¿Cómo interpreto el veredicto del Analizador?
- **COMPRAR (verde)** → El activo está infravalorado, con buen contexto y perspectivas positivas
- **MANTENER (amarillo)** → Dudas, esperar mejores señales, o está en precio justo
- **VENDER (rojo)** → Sobrevalorado, riesgos altos, o mejor oportunidad en otro lado

El veredicto incluye:
- Precio objetivo (a cuánto podría llegar)
- Stop loss (cuándo cortar pérdidas)
- Fundamento (por qué se recomienda eso)

---

## 🆘 ¿NECESITAS AYUDA?

Si encuentras algún error o necesitas asistencia:
1. Revisa esta guía
2. Asegúrate de tener la última versión
3. Comprueba que los JSON sean válidos
4. Exporta un backup antes de hacer cambios importantes

---

**¡Feliz inversión!** 🚀💰
