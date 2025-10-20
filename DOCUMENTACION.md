# 🌅 Aurora Hotel - Landing Page

## 📄 Descripción del Proyecto

Aurora Hotel Landing Page es una aplicación web moderna y completamente responsive diseñada para la promoción y gestión de reservas del Hotel Aurora. La plataforma combina una experiencia visual elegante con funcionalidades avanzadas de reservas y consultas, integrando geolocalización para análisis estadísticos.

---

## 🛠️ Stack Tecnológico

### **Frontend Core**
- **React 19.1.1** - Biblioteca principal para la interfaz de usuario
- **TypeScript 5.9.3** - Tipado estático para mayor robustez del código
- **Vite 7.1.7** - Build tool moderno con HMR (Hot Module Replacement)

### **Enrutamiento y Navegación**
- **React Router DOM 7.9.3** - Navegación client-side SPA
- **Scroll Behavior Smooth** - Navegación suave entre secciones

### **Estilos y UI**
- **Tailwind CSS 4.1.14** - Framework utility-first para estilos
- **PostCSS 8.5.6** + **Autoprefixer 10.4.21** - Procesamiento de CSS
- **CSS Custom Properties** - Variables CSS personalizadas
- **Responsive Design** - Breakpoints: mobile (sm), tablet (md), desktop (lg), large (xl)

### **Componentes y Librerías UI**
- **Swiper.js 12.0.2** - Carrusel de imágenes avanzado con autoplay
- **React Calendar 6.0.0** - Calendario interactivo para disponibilidad
- **React Icons 5.5.0** - Biblioteca de iconos (IoCheckmarkCircle, IoCloseCircle)

### **APIs y Servicios**
- **Geolocation API** - Ubicación GPS del navegador
- **OpenStreetMap Nominatim** - Geocodificación inversa gratuita
- **ipapi.co** - Geolocalización por IP como fallback
- **Custom API Integration** - Backend propio para reservas y consultas

### **Desarrollo y Calidad**
- **ESLint 9.36.0** - Linting y estándares de código
- **TypeScript ESLint 8.45.0** - Reglas específicas para TypeScript
- **React Hooks ESLint** - Validación de hooks de React

---

## 🎨 Diseño y Identidad Visual

### **Paleta de Colores**
```css
:root {
  --nav-dark: #111827;    /* Gris oscuro principal */
  --cta-blue: #3B82F6;    /* Azul para CTAs y acentos */
}
```

**Colores Adicionales:**
- **Fondos**: Blanco (#FFFFFF), Grises (#F9FAFB, #E5E7EB)
- **Estados**: Verde (#10B981), Rojo (#EF4444) para success/error
- **Gradientes**: Orange-Amber para secciones especiales

### **Tipografía**
```css
@import url('https://fonts.googleapis.com/css2?family=Gentium+Book+Plus:ital,wght@0,400;0,700;1,400;1,700&family=Poly:ital@0;1&display=swap');

body {
  font-family: "Poly", serif;
}
```

**Jerarquía Tipográfica:**
- **H1**: 5xl-7xl (48px-72px) - Títulos principales
- **H2**: 4xl-5xl (36px-48px) - Títulos de sección  
- **H3**: 2xl-3xl (24px-30px) - Subtítulos
- **Body**: lg-xl (18px-20px) - Texto principal
- **Small**: sm-base (14px-16px) - Textos secundarios

### **Espaciado y Layout**
- **Contenedores**: max-w-7xl, max-w-6xl, max-w-4xl
- **Padding**: py-20, px-6, px-12 (responsive)
- **Gaps**: space-x-6, space-y-4, gap-4
- **Bordes**: rounded-lg, rounded-xl, rounded-full

---

## 🏗️ Arquitectura y Estructura

### **Estructura de Carpetas**
```
src/
├── api/                    # Servicios y APIs
│   ├── consulta.ts        # API de consultas
│   ├── habitaciones.ts    # API de tipos de habitación
│   ├── reservar.ts        # API de reservas
│   └── ubicacion.ts       # Servicios de geolocalización
├── components/            # Componentes reutilizables
│   ├── Header.tsx         # Navegación responsive con menú hamburguesa
│   ├── Footer.tsx         # Footer responsive
│   ├── Modal.tsx          # Modal de feedback
│   ├── Home/              # Componentes específicos de Home
│   │   ├── Hero/          # Carrusel de imágenes principal
│   │   ├── SomosAurora/   # Sección about
│   │   └── Disponibilidad/ # Calendario y selector
│   └── Reservar/          # Componentes de reservas
├── pages/                 # Páginas principales
│   ├── Home.tsx          # Página de inicio
│   ├── Reservar.tsx      # Formulario de reservas
│   └── Consultas.tsx     # Formulario de consultas
└── App.tsx               # Router principal
```

### **Componentes Principales**

#### **Header (Navegación Inteligente)**
- **Scroll Detection**: Cambia a diseño floating al hacer scroll
- **Logo Dinámico**: Blanco en header oscuro, azul en header claro
- **Menu Hamburguesa**: Se activa en pantallas < 1280px
- **Overlay Blur**: Efecto visual sutil al abrir menú móvil

#### **Hero Section**
- **Swiper Carousel**: Autoplay cada 5 segundos
- **3 Imágenes**: hero-1.jpg, hero-2.jpg, hero-3.jpg
- **Overlay Oscuro**: bg-black/40 para legibilidad del texto
- **Navegación**: Bullets y arrows personalizados

#### **Disponibilidad**
- **Selector Dinámico**: Carga tipos de habitación desde API
- **Calendario Interactivo**: Muestra fechas ocupadas/disponibles
- **Estado Loading**: Animaciones de skeleton

#### **Formularios**
- **Validación Nativa**: HTML5 + TypeScript
- **Estados de Loading**: Botones con spinners
- **Geolocalización**: Captura automática de ubicación
- **Feedback Visual**: Modales de success/error

---

## 🌐 Funcionalidades Avanzadas

### **Sistema de Reservas**
- **Selección de Habitación**: Dropdown con precios y capacidad
- **Fechas**: Inputs tipo date con validación
- **Datos Personales**: Nombre, apellido, email, teléfono
- **Simulación de Pago**: Tarjeta 3D con flip animation
- **Geolocalización**: Captura de ubicación para estadísticas

### **Sistema de Consultas**
- **Formulario Completo**: Datos personales + mensaje
- **Teléfono Opcional**: Field no requerido
- **Geolocalización**: Misma implementación que reservas
- **Feedback Inmediato**: Respuesta del servidor mostrada al usuario

### **Geolocalización Dual**
```typescript
// Método 1: GPS (más preciso)
navigator.geolocation.getCurrentPosition()
+ OpenStreetMap Nominatim (geocodificación inversa)

// Método 2: IP Fallback
ipapi.co API (1000 requests/día gratis)
```

### **Responsive Design**
- **Mobile First**: Diseño desde 320px
- **Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- **Menu Hamburguesa**: Se activa en < 1280px
- **Componentes Adaptativos**: Grid layouts que se colapsan

---

## 🔧 Configuración y Desarrollo

### **Proxy de Desarrollo**
```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:4000',
      changeOrigin: true,
    },
  },
}
```

### **Variables CSS Globales**
```css
:root {
  --nav-dark: #111827;
  --cta-blue: #3B82F6;
}

html {
  scroll-behavior: smooth;
}

#somos-aurora, #disponibilidad {
  scroll-margin-top: 40vh;
}
```

### **Scripts Disponibles**
```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "tsc -b && vite build", // Build de producción
  "lint": "eslint .",               // Linting del código
  "preview": "vite preview"         // Preview del build
}
```

---

## 📱 Experiencia de Usuario

### **Navegación**
- **Scroll Suave**: Entre secciones con animaciones
- **Header Flotante**: Se transforma al hacer scroll
- **Menu Responsive**: Hamburguesa con overlay blur
- **Breadcrumbs Visuales**: Estados de formulario claros

### **Interacciones**
- **Hover Effects**: En botones y links
- **Loading States**: Spinners y skeleton loaders
- **Form Validation**: Feedback inmediato
- **Modal System**: Success/error notifications

### **Performance**
- **Image Optimization**: object-cover para imágenes
- **Lazy Loading**: Componentes cargan bajo demanda
- **CSS Optimization**: Tailwind purge automático
- **Bundle Splitting**: Vite automático

---

## 🚀 Integración Backend

### **Endpoints Utilizados**
```typescript
// Habitaciones
GET /api/habitaciones/tipos/lista

// Disponibilidad
GET /api/reservas/disponibilidad/:tipoId

// Reservas
POST /api/reservas/reservar-landing

// Consultas  
POST /api/consultas/crear
```

### **Tipos de Datos**
```typescript
// Reserva
type ReservaData = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  ubicacion?: string;
  tipo_habitacion_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  observaciones?: string;
  // ... datos de tarjeta
}

// Consulta
type ConsultaData = {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  texto: string;
  ubicacion?: string;
}
```

---

## 🎯 Características Destacadas

### **Innovaciones Técnicas**
- **Geolocalización Inteligente**: GPS + IP fallback
- **Header Dinámico**: Cambio visual basado en scroll
- **Tarjeta 3D**: Flip animation con CSS transforms
- **Menu Hamburguesa**: Transiciones suaves con backdrop blur

### **UX/UI Excepcional**
- **Loading Consistente**: Estados de carga en toda la app
- **Feedback Visual**: Colores semánticos (verde/rojo)
- **Responsive Excellence**: Funciona perfecto en todos los dispositivos
- **Accesibilidad**: Labels, focus states, ARIA attributes

### **Integración Completa**
- **Backend Ready**: APIs completamente integradas
- **Error Handling**: Manejo robusto de errores
- **Type Safety**: TypeScript en toda la aplicación
- **Modern Tooling**: Vite, ESLint, PostCSS

---

## 📊 Métricas y Analytics

La aplicación captura automáticamente la ubicación geográfica de los usuarios para generar estadísticas como:
- **Origen de Reservas**: "En este mes reservaron 25 personas de Salta"
- **Distribución Geográfica**: Análisis por provincia/país
- **Comportamiento de Usuario**: Patrones de consultas por región

---

## 🔮 Tecnologías del Futuro

El proyecto está preparado para:
- **PWA**: Manifest y Service Workers
- **Server Components**: Migración a Next.js 15
- **Edge Computing**: Deploy en Vercel Edge
- **Real-time**: WebSockets para disponibilidad en tiempo real

---

**Desarrollado con ❤️ para Aurora Hotel** 🌅