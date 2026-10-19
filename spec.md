# Spec — practica_react_native

Especificación de la **arquitectura** del monorepo. Por ahora solo se documenta la estructura; funcionalidad, pantallas y roadmap quedan fuera de este documento.

## 1. Objetivo

Monorepo para practicar React Native/Expo, organizado como workspace de aplicaciones (`apps/*`) con una app móvil que se desarrolla y prueba en caliente mediante **Expo Go** desde un dispositivo físico.

## 2. Tipo de monorepo

- Estructura de **monorepo por carpetas** con raíz `apps/` (convención Nx/Turborepo-style "apps/*").
- **Sin tooling de monorepo en la raíz** por ahora: no hay `package.json` raíz, workspaces npm/bun niPackageManager turbo. Cada app es un proyecto npm independiente con su propio `package.json` y `package-lock.json`.
- `apps/mobile` es la única app operativa. `apps/web` existe como placeholder vacío (reservado para una futura app web Expo).

## 3. Estructura de directorios

```
practica_react_native/
├── README.md                  # notas y comandos de arranque
├── .gitattributes
├── apps/
│   ├── mobile/                # app Expo (SDK 57) — única app activa
│   │   ├── app.json           # configuración Expo (scheme, plugins, experiments)
│   │   ├── package.json       # name: "mobile", main: expo-router/entry
│   │   ├── package-lock.json
│   │   ├── tsconfig.json      # extends expo/tsconfig.base, alias @/* -> ./src/*
│   │   ├── expo-env.d.ts
│   │   ├── AGENTS.md          # reglas para agentes (docs Expo versionadas, comandos)
│   │   ├── scripts/
│   │   │   └── reset-project.js
│   │   ├── assets/            # iconos, splash, imágenes
│   │   │   ├── images/
│   │   │   └── expo.icon/
│   │   └── src/
│   │       ├── app/           # rutas Expo Router (file-based routing)
│   │       │   ├── _layout.tsx
│   │       │   ├── index.tsx
│   │       │   └── explore.tsx
│   │       ├── components/    # UI reutilizable (themed-*, app-tabs, animated-icon…)
│   │       │   └── ui/
│   │       ├── constants/     # theme.ts (colores, spacing)
│   │       ├── hooks/         # use-color-scheme, use-theme
│   │       └── global.css
│   └── web/                   # placeholder vacío (sin proyecto aún)
└── .git/
```

## 4. Stack de la app móvil

| Capa | Elección | Versión |
|---|---|---|
| Runtime | Expo SDK | ~57.0.30 |
| UI | React Native + React | 0.86.3 / 19.2.3 |
| Navegación | Expo Router (file-based) | ~57.0.28 |
| Animación | react-native-reanimated + worklets | 4.5.1 / 0.10.1 |
| Gestos | react-native-gesture-handler | ~2.32.0 |
| Web fallback | react-native-web | ~0.21.0 |
| Lenguaje | TypeScript (strict) | ~6.0.3 |
| Lint | expo lint | — |

Experimentos habilitados en `app.json`:
- `typedRoutes: true` — rutas tipadas generadas por Expo Router.
- `reactCompiler: true` — React Compiler activo.

Plugins: `expo-router`, `expo-splash-screen`.

## 5. Convenciones de arquitectura (apps/mobile)

- **Routing**: todo en `src/app/`. Cada archivo = una pantalla; `_layout.tsx` define el navigator (layout actual: `ThemeProvider` + `AppTabs` con tabs). Código no-ruta (componentes, hooks, constantes) vive fuera de `src/app/`.
- **Alias de imports**: `@/*` → `src/*` y `@/assets/*` → `assets/*` (definidos en `tsconfig.json`).
- **Plataforma**: resolución nativa de variantes `.web.tsx` / `.web.ts` para web (p. ej. `app-tabs.web.tsx`, `use-color-scheme.web.ts`).
- **Tema**: `src/constants/theme.ts` + hooks `use-theme` / `use-color-scheme`; componentes `ThemedText` / `ThemedView` envuelven el theming.
- **Native code**: no existen directorios `ios/` ni `android/` (Continuous Native Generation). No se generan/editan a mano; la config nativa va en `app.json` y config plugins.
- **Dependencias nativas**: solo módulos incluidos en Expo Go mientras se pruebe en Expo Go. Cualquier librería con código nativo propio exige development build.

## 6. Flujo de prueba con Expo Go (mobile)

1. Arrancar el dev server desde el paquete de la app:
   ```bash
   cd apps/mobile
   npx expo start
   ```
2. Escanear el **QR** con la app **Expo Go** (Android) o la cámara/Camera Roll (iOS) en el mismo segmento de red que el equipo de desarrollo.
3. Expo Go carga el bundle JS vía Metro; hot reload / Fast Refresh activo.
4. Dev menu: sacudir el dispositivo, o atajo `cmd+d` (iOS) / `cmd+m` (Android) en el emulador; `m` en la terminal del Metro.

Scripts disponibles en `apps/mobile/package.json`: `start`, `android`, `ios`, `web`, `lint`, `reset-project`.

Comandos de verificación (antes de dar por done cualquier tarea):
```bash
npx expo lint
npx tsc --noEmit
```

## 7. Fuente de verdad de versiones Expo

Expo introduce breaking changes en cada SDK. Antes de tocar APIs de Expo/React Native:

1. Leer la versión mayor de `expo` en `apps/mobile/package.json`.
2. Consultar la doc versionada: `https://docs.expo.dev/versions/v<major>.0.0/`.
3. Índice global con correcciones a mitos comunes de LLMs: `https://docs.expo.dev/llms.txt`.

Instalar dependencias siempre con `npx expo install <paquete>` (resuelve versiones compatibles con el SDK), nunca con `npm add` directo.

## 8. Extensiones previstas (fuera de alcance de este spec)

- `apps/web`: app Expo web dentro del mismo monorepo.
- Raíz con `package.json` + workspaces (npm/bun) y scripts compartidos cuando haya >1 app.
- Development builds (`eas build --profile development`) al necesitar módulos nativos fuera de Expo Go.
