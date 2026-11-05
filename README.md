# DAM_22 - SanchezLucia · AP3 Netflix App

App móvil construida con **Expo + React Native** que replica el flujo de Netflix con 4 pantallas navegables.

## Pantallas

| # | Pantalla | Descripción |
|---|----------|-------------|
| 1 | **Login** | Captura email y contraseña. Redirige al Home al iniciar sesión. |
| 2 | **Principal (Home)** | Banner destacado + 3 filas horizontales de catálogo. |
| 3 | **Detalle** | Info completa de la película/serie seleccionada con tabs. |
| 4 | **Mi lista** | Títulos favoritos guardados en el dispositivo; permite abrir su detalle y quitarlos. |

## Stack técnico

- **Expo SDK 51** + **React Native 0.74**
- **React Navigation v6** (Native Stack) — navegación entre pantallas
- **StyleSheet & Flexbox** — maquetación y estilos
- **AsyncStorage 1.23.1** — persistencia local de Mi lista, compatible con el SDK del proyecto
- Componentes usados: `View`, `Text`, `TextInput`, `Image`, `Pressable`, `FlatList`, `ScrollView`

## Cómo correr el proyecto

1. Instalar dependencias:
   ```bash
   cd NetflixApp
   npm install
   ```

2. Iniciar Expo:
   ```bash
   npx expo start
   ```

3. Escanear el QR con **Expo Go** desde tu celular, o presionar `a` para Android / `i` para iOS (simulador).

   Este proyecto usa SDK 51. Para Android se necesita una versión compatible de Expo Go, disponible en [expo.dev/go](https://expo.dev/go?sdkVersion=51&platform=android&device=true). El Expo Go actual de la tienda puede requerir un SDK más reciente. En Windows se puede usar el emulador Android; el simulador iOS requiere macOS.

## Actividad: una funcionalidad avanzada

**Opción seleccionada: almacenamiento local.** Mi lista permite guardar películas y series para consultarlas más tarde. Los datos permanecen al cerrar y volver a abrir la aplicación, sin una base de datos externa ni permisos adicionales.

- En Inicio, «+ Mi lista» guarda Stranger Things; «Mi lista» en la barra superior abre los favoritos.
- En Detalle, el mismo botón agrega o quita el título y «Ver mi lista» abre la pantalla de favoritos.
- En Mi lista, tocar la portada o el nombre abre el detalle; «✓ En mi lista» quita el título.
- Una lista vacía muestra una invitación a explorar el catálogo.
- Los cambios se reflejan después de confirmar el guardado. Durante la carga y escritura se bloquean los botones para evitar cambios simultáneos.
- Si falla la carga, aparece «Reintentar carga» y se impide sobrescribir los datos existentes. Si falla el guardado, se conserva el estado anterior y se informa del error.

AsyncStorage guarda un arreglo JSON bajo `@netflixapp/my-list:v1`. Se conservan identificador, título, imagen y, cuando existen, año y géneros. La lista es compartida por la instalación: el login del proyecto es una demostración, no un sistema de cuentas. No se guardan credenciales ni se descargan películas; las portadas remotas necesitan conexión.

### Cómo demostrar la actividad

1. Iniciar la app e ingresar un correo y contraseña de prueba no vacíos; el login es simulado.
2. Abrir «Mi lista» y comprobar el estado vacío en una instalación nueva.
3. Volver a Inicio y guardar Stranger Things desde el banner.
4. Abrir El Irlandés desde «Populares en Netflix» y guardarlo desde Detalle.
5. Entrar en «Ver mi lista» y comprobar que aparecen ambos títulos una sola vez.
6. Cerrar completamente Expo Go, volver a abrir el proyecto e iniciar sesión. Abrir «Mi lista»: los títulos deben seguir allí.
7. Quitar un título, regresar a su detalle y comprobar que el botón vuelve a «+ Mi lista». Reiniciar y verificar que la eliminación persiste.
8. Quitar el último título y comprobar el estado vacío.

Para la entrega, capturar Mi lista con títulos y mostrar que conserva los datos tras reiniciar.

### Verificación realizada

Probado el 5 de noviembre de 2026 en el emulador **Pixel_8, Android 14**, con **Expo Go 2.31.2** compatible con SDK 51:

- Estado vacío visible.
- Stranger Things guardado desde Inicio y El Irlandés desde Detalle, sin confundir sus identificadores.
- Ambos títulos recuperados después de detener completamente Expo Go y volver a iniciar sesión.
- El Irlandés quitado desde Mi lista; su detalle vuelve a mostrar «+ Mi lista».

Capturas reales del emulador en [`NetflixApp/docs/evidencias`](NetflixApp/docs/evidencias): estado vacío, dos títulos guardados, recuperación tras reiniciar y título quitado.

Expo Go tuvo fallos de inicialización de `UIManager` al arrancar en desarrollo. La comprobación funcional se pudo realizar con:

```bash
npx expo start --no-dev --minify --localhost --port 8083 --android
```

Este comando está pensado para el emulador local; para un teléfono físico, usar `npx expo start` y conectar ambos equipos a la misma red.

### Pruebas del almacenamiento

Desde `NetflixApp`:

```bash
npm test
npx expo export --platform android --output-dir dist-check
```

Las pruebas verifican primera ejecución, recuperación en una nueva instancia, eliminación persistente, duplicados, identificadores distintos, filtrado de campos, datos corruptos y fallos de lectura/escritura. La exportación comprueba que el código compila para Android.

## Estructura de archivos

```
NetflixApp/
├── App.js                  # Navegación principal (Stack Navigator)
├── screens/
│   ├── LoginScreen.js      # Pantalla 1 - Login
│   ├── HomeScreen.js       # Pantalla 2 - Catálogo principal
│   ├── DetailScreen.js     # Pantalla 3 - Detalle de película
│   └── MyListScreen.js     # Favoritos guardados
├── components/             # Botón y mensajes de Mi lista
├── context/                # Estado compartido y coordinación del guardado
├── services/               # Lectura, validación y escritura de datos
├── tests/                  # Pruebas del almacenamiento
├── app.json                # Configuración Expo
└── package.json
```
