# DAM_22 - SanchezLucia · AP3 Netflix App

App móvil construida con **Expo + React Native** que replica el flujo de Netflix con 3 pantallas navegables.

## Pantallas

| # | Pantalla | Descripción |
|---|----------|-------------|
| 1 | **Login** | Captura email y contraseña. Redirige al Home al iniciar sesión. |
| 2 | **Principal (Home)** | Banner destacado + 3 filas horizontales de catálogo. |
| 3 | **Detalle** | Info completa de la película/serie seleccionada con tabs. |

## Stack técnico

- **Expo SDK 51** + **React Native 0.74**
- **React Navigation v6** (Native Stack) — navegación entre pantallas
- **StyleSheet & Flexbox** — maquetación y estilos
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

## Estructura de archivos

```
NetflixApp/
├── App.js                  # Navegación principal (Stack Navigator)
├── screens/
│   ├── LoginScreen.js      # Pantalla 1 - Login
│   ├── HomeScreen.js       # Pantalla 2 - Catálogo principal
│   └── DetailScreen.js     # Pantalla 3 - Detalle de película
├── app.json                # Configuración Expo
└── package.json
```
