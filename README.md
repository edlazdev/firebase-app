# Vue 3 + Firebase Auth

Aplicación de autenticación construida con Vue 3, Firebase Authentication, Pinia y Vue Router. Permite registrar usuarios, iniciar y cerrar sesión, con rutas protegidas que redirigen al login si el usuario no está autenticado.

## Tecnologías

- [Vue 3](https://vuejs.org/) — Framework progresivo con Composition API (`<script setup>`)
- [Vite](https://vitejs.dev/) — Bundler y servidor de desarrollo
- [Firebase Authentication](https://firebase.google.com/docs/auth) — Autenticación con email y contraseña
- [Pinia](https://pinia.vuejs.org/) — Manejo de estado global
- [Vue Router 4](https://router.vuejs.org/) — Enrutamiento con navigation guards

## Funcionalidades

- Registro de usuario con email y contraseña
- Inicio de sesión
- Cierre de sesión
- Ruta `/` protegida — redirige a `/login` si no hay sesión activa
- Persistencia de sesión mediante `onAuthStateChanged` de Firebase
- Manejo de errores con feedback visual al usuario

## Estructura del proyecto

```
src/
├── firebaseConfig.js     # Inicialización de Firebase (usa variables de entorno)
├── main.js               # Entrada de la aplicación
├── router.js             # Rutas y navigation guard
├── App.vue               # Layout principal con navbar
├── stores/
│   └── user.js           # Store Pinia para autenticación
└── views/
    ├── HomeView.vue      # Vista protegida (requiere sesión)
    ├── LoginView.vue     # Formulario de login
    └── RegisterView.vue  # Formulario de registro
```

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd firebase-app

# Instalar dependencias
npm install
```

## Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Activa **Authentication > Email/Password**
3. Copia las credenciales de tu app web
4. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

> El archivo `.env` está incluido en `.gitignore` y no debe subirse al repositorio.

## Uso

```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## Rutas

| Ruta        | Acceso       | Descripción                     |
|-------------|-------------|----------------------------------|
| `/`         | Autenticado | Vista principal con email activo |
| `/login`    | Público     | Formulario de inicio de sesión   |
| `/register` | Público     | Formulario de registro           |
