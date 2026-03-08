/**
 * NorthPalace - Sistema de Reservas
 * JavaScript principal para todas las páginas
 */

document.addEventListener('DOMContentLoaded', () => {
  initTooltips();
  initNewsletter();
  initModalesAuth();
  crearEstilosModales();
  initSelectorIdioma();
  
  const currentPage = getCurrentPage();
  
  switch (currentPage) {
    case 'index':
      initIndexPage();
      break;
    case 'propiedades':
      initPropiedadesPage();
      break;
    case 'detalle':
      initDetallePage();
      break;
    case 'confirmacion':
      initConfirmacionPage();
      break;
  }
  
  // Aplicar idioma guardado
  const idiomaGuardado = localStorage.getItem('idioma') || 'es';
  if (idiomaGuardado === 'en') {
    setTimeout(() => aplicarIdioma('en'), 100);
  }
});

function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('propiedades')) return 'propiedades';
  if (path.includes('detalle')) return 'detalle';
  if (path.includes('confirmacion')) return 'confirmacion';
  return 'index';
}

// ============================================================
// DATOS DE PROPIEDADES (simulando base de datos)
// ============================================================
const propiedadesData = [
  {
    id: 1,
    titulo: 'Casa en Frac. Campestre',
    tipo: 'Casa',
    direccion: 'Calle Nogal 415, Frac. Campestre, Chihuahua, Chih.',
    zona: 'norte',
    cuartos: 3,
    huespedes: 6,
    precio: 850,
    rating: 4.8,
    resenas: 32,
    imagen: 'img/casa1.jpg',
    imagenes: ['img/casa1.jpg', 'img/casa1-2.jpg', 'img/casa1-3.jpg'],
    descripcion: 'Hermosa casa en el exclusivo Fraccionamiento Campestre, perfecta para familias. Cuenta con amplios espacios, jardín privado y todas las comodidades para una estancia placentera en Chihuahua.',
    amenidades: ['WiFi', 'Estacionamiento', 'Cocina equipada', 'Aire acondicionado', 'TV', 'Lavadora'],
    normas: ['No fumar', 'No fiestas', 'Check-in después de 3 PM', 'Check-out antes de 12 PM', 'Mascotas no permitidas'],
    referencia: 'A 5 minutos del centro comercial Fashion Mall',
    calificaciones: { limpieza: 4.9, comunicacion: 4.8, ubicacion: 4.7, valor: 4.8 },
    resenasData: [
      { autor: 'María García', rating: 5, texto: 'Excelente lugar, muy limpio y cómodo. El anfitrión fue muy amable.', fecha: '2025-01-15' },
      { autor: 'Carlos López', rating: 4, texto: 'Buena ubicación, cerca de todo. Recomendado.', fecha: '2025-01-10' }
    ],
    disponibilidad: { lun: true, mar: true, mie: false, jue: false, vie: false, sab: true, dom: true }
  },
  {
    id: 2,
    titulo: 'Apartamento en el Centro Histórico',
    tipo: 'Apartamento',
    direccion: 'Av. Independencia 732, Centro, Chihuahua, Chih.',
    zona: 'centro',
    cuartos: 2,
    huespedes: 4,
    precio: 620,
    rating: 4.5,
    resenas: 18,
    imagen: 'img/apartamento1.jpg',
    imagenes: ['img/apartamento1.jpg', 'img/apartamento1-2.jpg', 'img/apartamento1-3.jpg'],
    descripcion: 'Moderno apartamento en el corazón del Centro Histórico de Chihuahua. Ideal para turistas que quieren explorar la ciudad a pie. A pasos de la Catedral y el Palacio de Gobierno.',
    amenidades: ['WiFi', 'Cocina equipada', 'Aire acondicionado', 'TV', 'Calefacción'],
    normas: ['No fumar', 'No fiestas', 'Check-in después de 2 PM', 'Check-out antes de 11 AM'],
    referencia: 'Frente a la Plaza de Armas',
    calificaciones: { limpieza: 4.6, comunicacion: 4.5, ubicacion: 4.8, valor: 4.4 },
    resenasData: [
      { autor: 'Ana Martínez', rating: 5, texto: 'Ubicación perfecta para conocer el centro de Chihuahua.', fecha: '2025-02-01' }
    ],
    disponibilidad: { lun: false, mar: true, mie: true, jue: true, vie: false, sab: false, dom: true }
  },
  {
    id: 3,
    titulo: 'Casa residencial en El Mirador',
    tipo: 'Casa',
    direccion: 'Calle Petirrojo 108, Col. El Mirador, Chihuahua, Chih.',
    zona: 'poniente',
    cuartos: 4,
    huespedes: 8,
    precio: 1500,
    rating: 5.0,
    resenas: 47,
    imagen: 'img/casa2.jpg',
    imagenes: ['img/casa2.jpg', 'img/casa2-2.jpg', 'img/casa2-3.jpg'],
    descripcion: 'Espectacular residencia con alberca privada y vista panorámica de la ciudad. Casa de lujo con acabados de primera, perfecta para eventos especiales o vacaciones familiares.',
    amenidades: ['WiFi', 'Alberca', 'Estacionamiento', 'Cocina equipada', 'Se admiten mascotas', 'Aire acondicionado', 'Jardín', 'Asador'],
    normas: ['No fumar dentro', 'Fiestas previa autorización', 'Check-in después de 4 PM', 'Check-out antes de 12 PM'],
    referencia: 'En la zona más exclusiva del poniente de Chihuahua',
    calificaciones: { limpieza: 5.0, comunicacion: 5.0, ubicacion: 5.0, valor: 4.9 },
    resenasData: [
      { autor: 'Roberto Sánchez', rating: 5, texto: '¡Increíble propiedad! La alberca y el jardín son espectaculares.', fecha: '2025-02-10' },
      { autor: 'Laura Hernández', rating: 5, texto: 'La mejor experiencia. Todo perfecto.', fecha: '2025-02-05' }
    ],
    disponibilidad: { lun: true, mar: true, mie: true, jue: false, vie: false, sab: false, dom: false }
  },
  {
    id: 4,
    titulo: 'Apartamento moderno en San Felipe',
    tipo: 'Apartamento',
    direccion: 'Blvd. Ortiz Mena 1540, Col. San Felipe, Chihuahua, Chih.',
    zona: 'oriente',
    cuartos: 2,
    huespedes: 4,
    precio: 750,
    rating: 4.7,
    resenas: 25,
    imagen: 'img/apartamento2.jpg',
    imagenes: ['img/apartamento2.jpg', 'img/apartamento2-2.jpg'],
    descripcion: 'Apartamento contemporáneo con diseño moderno y todas las amenidades. Excelente ubicación cerca de restaurantes y comercios.',
    amenidades: ['WiFi', 'Estacionamiento', 'Aire acondicionado', 'TV', 'Cocina equipada'],
    normas: ['No fumar', 'No fiestas', 'Check-in después de 3 PM', 'Check-out antes de 11 AM'],
    referencia: 'Sobre el Boulevard Ortiz Mena',
    calificaciones: { limpieza: 4.8, comunicacion: 4.7, ubicacion: 4.6, valor: 4.7 },
    resenasData: [],
    disponibilidad: { lun: true, mar: false, mie: false, jue: true, vie: true, sab: false, dom: true }
  },
  {
    id: 5,
    titulo: 'Casa amplia en Las Granjas',
    tipo: 'Casa',
    direccion: 'Calle Durazno 223, Col. Las Granjas, Chihuahua, Chih.',
    zona: 'sur',
    cuartos: 3,
    huespedes: 6,
    precio: 700,
    rating: 4.3,
    resenas: 11,
    imagen: 'img/casa3.jpg',
    imagenes: ['img/casa3.jpg', 'img/casa3-2.jpg'],
    descripcion: 'Casa familiar con amplio jardín, perfecta para quienes viajan con mascotas. Ambiente tranquilo y acogedor.',
    amenidades: ['WiFi', 'Cocina equipada', 'Se admiten mascotas', 'Jardín', 'Estacionamiento'],
    normas: ['Mascotas bienvenidas', 'No fumar dentro', 'Check-in después de 2 PM'],
    referencia: 'Zona residencial tranquila al sur de la ciudad',
    calificaciones: { limpieza: 4.4, comunicacion: 4.2, ubicacion: 4.1, valor: 4.5 },
    resenasData: [],
    disponibilidad: { lun: false, mar: false, mie: true, jue: true, vie: true, sab: true, dom: false }
  },
  {
    id: 6,
    titulo: 'Penthouse en Zona Dorada',
    tipo: 'Apartamento',
    direccion: 'Av. Valle Escondido 3210, Zona Dorada, Chihuahua, Chih.',
    zona: 'norte',
    cuartos: 3,
    huespedes: 6,
    precio: 1800,
    rating: 4.9,
    resenas: 61,
    imagen: 'img/apartamento3.jpg',
    imagenes: ['img/apartamento3.jpg', 'img/apartamento3-2.jpg', 'img/apartamento3-3.jpg'],
    descripcion: 'Lujoso penthouse con terraza y vista espectacular. Acabados de lujo y ubicación premium en la Zona Dorada de Chihuahua.',
    amenidades: ['WiFi', 'Estacionamiento', 'Cocina equipada', 'Aire acondicionado', 'Terraza', 'Gimnasio'],
    normas: ['No fumar', 'No fiestas', 'Check-in después de 4 PM', 'Check-out antes de 12 PM'],
    referencia: 'En el edificio más exclusivo de la Zona Dorada',
    calificaciones: { limpieza: 5.0, comunicacion: 4.9, ubicacion: 4.8, valor: 4.9 },
    resenasData: [
      { autor: 'Diana Torres', rating: 5, texto: 'Experiencia de lujo. El penthouse superó todas mis expectativas.', fecha: '2025-02-15' }
    ],
    disponibilidad: { lun: true, mar: true, mie: false, jue: true, vie: true, sab: false, dom: false }
  },
  {
    id: 7,
    titulo: 'Casa en Quintas del Sol',
    tipo: 'Casa',
    direccion: 'Calle Girasol 890, Quintas del Sol, Chihuahua, Chih.',
    zona: 'poniente',
    cuartos: 4,
    huespedes: 8,
    precio: 1200,
    rating: 4.6,
    resenas: 39,
    imagen: 'img/casa4.jpg',
    imagenes: ['img/casa4.jpg', 'img/casa4-2.jpg'],
    descripcion: 'Casa familiar con alberca privada en fraccionamiento cerrado. Ideal para reuniones familiares y celebraciones.',
    amenidades: ['WiFi', 'Alberca privada', 'Estacionamiento', 'Cocina equipada', 'Se admiten mascotas', 'Aire acondicionado', 'Jardín', 'Asador'],
    normas: ['Fiestas con autorización', 'No fumar dentro', 'Check-in después de 3 PM'],
    referencia: 'Fraccionamiento con vigilancia las 24 horas',
    calificaciones: { limpieza: 4.7, comunicacion: 4.5, ubicacion: 4.6, valor: 4.6 },
    resenasData: [],
    disponibilidad: { lun: true, mar: true, mie: true, jue: true, vie: false, sab: false, dom: false }
  },
  {
    id: 8,
    titulo: 'Estudio en Col. Industrial',
    tipo: 'Apartamento',
    direccion: 'Calle 38 Sur 615, Col. Industrial, Chihuahua, Chih.',
    zona: 'centro',
    cuartos: 1,
    huespedes: 2,
    precio: 480,
    rating: 4.1,
    resenas: 8,
    imagen: 'img/apartamento4.jpg',
    imagenes: ['img/apartamento4.jpg'],
    descripcion: 'Estudio económico y funcional, perfecto para viajeros solos o parejas. Bien ubicado y con todas las comodidades básicas.',
    amenidades: ['WiFi', 'Aire acondicionado', 'TV', 'Cocina básica'],
    normas: ['No fumar', 'No fiestas', 'Check-in después de 2 PM'],
    referencia: 'Cerca de la central de autobuses',
    calificaciones: { limpieza: 4.2, comunicacion: 4.0, ubicacion: 4.0, valor: 4.3 },
    resenasData: [],
    disponibilidad: { lun: false, mar: true, mie: true, jue: false, vie: true, sab: true, dom: true }
  }
];

// ============================================================
// SISTEMA DE MODALES Y NOTIFICACIONES
// ============================================================

function crearEstilosModales() {
  if (document.getElementById('estilos-modales')) return;
  
  const estilos = document.createElement('style');
  estilos.id = 'estilos-modales';
  estilos.textContent = `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideIn {
      from { transform: translateY(-30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .modal-contenedor {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      max-width: 450px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideIn 0.3s ease;
    }
    
    .modal-header {
      padding: 20px 25px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px 12px 0 0;
    }
    
    .modal-header h2 {
      margin: 0;
      color: white;
      font-size: 1.4rem;
    }
    
    .modal-cerrar {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s;
    }
    
    .modal-cerrar:hover {
      background: rgba(255,255,255,0.3);
    }
    
    .modal-body {
      padding: 25px;
    }
    
    .modal-campo {
      margin-bottom: 20px;
    }
    
    .modal-campo label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
    }
    
    .modal-campo input {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s, box-shadow 0.3s;
      box-sizing: border-box;
    }
    
    .modal-campo input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    }
    
    .modal-btn {
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .modal-btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .modal-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    }
    
    .modal-footer {
      text-align: center;
      padding: 15px 25px 25px;
      color: #666;
    }
    
    .modal-footer a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }
    
    .modal-footer a:hover {
      text-decoration: underline;
    }
    
    .modal-checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .modal-checkbox input {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    
    .modal-checkbox label {
      margin: 0;
      font-weight: normal;
      cursor: pointer;
    }
    
    /* Notificaciones emergentes */
    .notificacion-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10001;
      animation: fadeIn 0.2s ease;
    }
    
    .notificacion-box {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      max-width: 400px;
      width: 90%;
      animation: slideIn 0.3s ease;
      overflow: hidden;
    }
    
    .notificacion-header {
      padding: 20px;
      text-align: center;
    }
    
    .notificacion-header.success {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    }
    
    .notificacion-header.error {
      background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
    }
    
    .notificacion-header.warning {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    
    .notificacion-header.info {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .notificacion-icono {
      font-size: 50px;
      color: white;
    }
    
    .notificacion-body {
      padding: 25px;
      text-align: center;
    }
    
    .notificacion-body h3 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 1.3rem;
    }
    
    .notificacion-body p {
      margin: 0;
      color: #666;
      line-height: 1.5;
    }
    
    .notificacion-footer {
      padding: 15px 25px 25px;
      text-align: center;
    }
    
    .notificacion-btn {
      padding: 12px 40px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .notificacion-btn.success {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
      color: white;
    }
    
    .notificacion-btn.error {
      background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
      color: white;
    }
    
    .notificacion-btn.warning {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }
    
    .notificacion-btn.info {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .notificacion-btn:hover {
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(estilos);
}

function mostrarNotificacion(tipo, titulo, mensaje, callback = null) {
  const iconos = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  
  const overlay = document.createElement('div');
  overlay.className = 'notificacion-overlay';
  overlay.innerHTML = `
    <div class="notificacion-box">
      <div class="notificacion-header ${tipo}">
        <div class="notificacion-icono">${iconos[tipo]}</div>
      </div>
      <div class="notificacion-body">
        <h3>${titulo}</h3>
        <p>${mensaje}</p>
      </div>
      <div class="notificacion-footer">
        <button class="notificacion-btn ${tipo}">Aceptar</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  const cerrar = () => {
    overlay.style.animation = 'fadeIn 0.2s ease reverse';
    setTimeout(() => {
      overlay.remove();
      if (callback) callback();
    }, 200);
  };
  
  overlay.querySelector('.notificacion-btn').addEventListener('click', cerrar);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cerrar();
  });
  
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      cerrar();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

function mostrarConfirmacionModal(titulo, mensaje, onConfirm, onCancel = null) {
  const overlay = document.createElement('div');
  overlay.className = 'notificacion-overlay';
  overlay.innerHTML = `
    <div class="notificacion-box">
      <div class="notificacion-header info">
        <div class="notificacion-icono">?</div>
      </div>
      <div class="notificacion-body">
        <h3>${titulo}</h3>
        <p>${mensaje}</p>
      </div>
      <div class="notificacion-footer" style="display: flex; gap: 10px; justify-content: center;">
        <button class="notificacion-btn info" id="btn-confirmar-modal">Confirmar</button>
        <button class="notificacion-btn" style="background: #ccc; color: #333;" id="btn-cancelar-modal">Cancelar</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  const cerrar = (confirmed) => {
    overlay.style.animation = 'fadeIn 0.2s ease reverse';
    setTimeout(() => {
      overlay.remove();
      if (confirmed && onConfirm) onConfirm();
      if (!confirmed && onCancel) onCancel();
    }, 200);
  };
  
  overlay.querySelector('#btn-confirmar-modal').addEventListener('click', () => cerrar(true));
  overlay.querySelector('#btn-cancelar-modal').addEventListener('click', () => cerrar(false));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cerrar(false);
  });
}

function initModalesAuth() {
  const btnLogin = document.getElementById('btn-login');
  const btnRegistro = document.getElementById('btn-registro');
  
  if (btnLogin) {
    btnLogin.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarModalLogin();
    });
  }
  
  if (btnRegistro) {
    btnRegistro.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarModalRegistro();
    });
  }
}

function mostrarModalLogin() {
  cerrarModalesAuth();
  
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-login-overlay';
  overlay.innerHTML = `
    <div class="modal-contenedor">
      <div class="modal-header">
        <h2>Iniciar Sesión</h2>
        <button class="modal-cerrar" aria-label="Cerrar">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-campo">
          <label for="login-email">Correo electrónico</label>
          <input type="email" id="login-email" placeholder="tu@email.com" autocomplete="email">
        </div>
        <div class="modal-campo">
          <label for="login-password">Contraseña</label>
          <input type="password" id="login-password" placeholder="Tu contraseña" autocomplete="current-password">
        </div>
        <div class="modal-checkbox">
          <input type="checkbox" id="login-recordar">
          <label for="login-recordar">Recordar mi sesión</label>
        </div>
        <button class="modal-btn modal-btn-primary" id="btn-submit-login">Iniciar Sesión</button>
      </div>
      <div class="modal-footer">
        <p>¿No tienes cuenta? <a href="#" id="link-ir-registro">Regístrate aquí</a></p>
        <p style="margin-top: 10px;"><a href="#" id="link-recuperar">¿Olvidaste tu contraseña?</a></p>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  const cerrar = () => {
    overlay.remove();
    document.body.style.overflow = '';
  };
  
  overlay.querySelector('.modal-cerrar').addEventListener('click', cerrar);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cerrar();
  });
  
  overlay.querySelector('#link-ir-registro').addEventListener('click', (e) => {
    e.preventDefault();
    cerrar();
    mostrarModalRegistro();
  });
  
  overlay.querySelector('#link-recuperar').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarNotificacion('info', 'Recuperar Contraseña', 'Te enviaremos un enlace de recuperación a tu correo electrónico.');
  });
  
  overlay.querySelector('#btn-submit-login').addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    if (!email) {
      mostrarNotificacion('error', 'Campo Requerido', 'Por favor ingresa tu correo electrónico.');
      return;
    }
    
    if (!isValidEmail(email)) {
      mostrarNotificacion('error', 'Email Inválido', 'Por favor ingresa un correo electrónico válido.');
      return;
    }
    
    if (!password) {
      mostrarNotificacion('error', 'Campo Requerido', 'Por favor ingresa tu contraseña.');
      return;
    }
    
    if (password.length < 6) {
      mostrarNotificacion('error', 'Contraseña Corta', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    
    const usuario = {
      email,
      nombre: email.split('@')[0],
      logueado: true
    };
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
    
    cerrar();
    mostrarNotificacion('success', '¡Bienvenido!', `Has iniciado sesión correctamente como ${usuario.nombre}.`, () => {
      actualizarUIUsuario(usuario);
    });
  });
  
  document.getElementById('login-email').focus();
  
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      cerrar();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

function mostrarModalRegistro() {
  cerrarModalesAuth();
  
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-registro-overlay';
  overlay.innerHTML = `
    <div class="modal-contenedor">
      <div class="modal-header">
        <h2>Crear Cuenta</h2>
        <button class="modal-cerrar" aria-label="Cerrar">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-campo">
          <label for="registro-nombre">Nombre completo</label>
          <input type="text" id="registro-nombre" placeholder="Tu nombre completo" autocomplete="name">
        </div>
        <div class="modal-campo">
          <label for="registro-email">Correo electrónico</label>
          <input type="email" id="registro-email" placeholder="tu@email.com" autocomplete="email">
        </div>
        <div class="modal-campo">
          <label for="registro-telefono">Teléfono</label>
          <input type="tel" id="registro-telefono" placeholder="614 000 0000" autocomplete="tel">
        </div>
        <div class="modal-campo">
          <label for="registro-password">Contraseña</label>
          <input type="password" id="registro-password" placeholder="Mínimo 6 caracteres" autocomplete="new-password">
        </div>
        <div class="modal-campo">
          <label for="registro-password2">Confirmar contraseña</label>
          <input type="password" id="registro-password2" placeholder="Repite tu contraseña" autocomplete="new-password">
        </div>
        <div class="modal-checkbox">
          <input type="checkbox" id="registro-terminos">
          <label for="registro-terminos">Acepto los <a href="#" style="color: #667eea;">términos y condiciones</a></label>
        </div>
        <button class="modal-btn modal-btn-primary" id="btn-submit-registro">Crear Cuenta</button>
      </div>
      <div class="modal-footer">
        <p>¿Ya tienes cuenta? <a href="#" id="link-ir-login">Inicia sesión</a></p>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  const cerrar = () => {
    overlay.remove();
    document.body.style.overflow = '';
  };
  
  overlay.querySelector('.modal-cerrar').addEventListener('click', cerrar);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cerrar();
  });
  
  overlay.querySelector('#link-ir-login').addEventListener('click', (e) => {
    e.preventDefault();
    cerrar();
    mostrarModalLogin();
  });
  
  overlay.querySelector('#btn-submit-registro').addEventListener('click', () => {
    const nombre = document.getElementById('registro-nombre').value.trim();
    const email = document.getElementById('registro-email').value.trim();
    const telefono = document.getElementById('registro-telefono').value.trim();
    const password = document.getElementById('registro-password').value;
    const password2 = document.getElementById('registro-password2').value;
    const terminos = document.getElementById('registro-terminos').checked;
    
    if (!nombre) {
      mostrarNotificacion('error', 'Campo Requerido', 'Por favor ingresa tu nombre completo.');
      return;
    }
    
    if (!email) {
      mostrarNotificacion('error', 'Campo Requerido', 'Por favor ingresa tu correo electrónico.');
      return;
    }
    
    if (!isValidEmail(email)) {
      mostrarNotificacion('error', 'Email Inválido', 'Por favor ingresa un correo electrónico válido.');
      return;
    }
    
    if (!telefono) {
      mostrarNotificacion('error', 'Campo Requerido', 'Por favor ingresa tu número de teléfono.');
      return;
    }
    
    if (!isValidPhone(telefono)) {
      mostrarNotificacion('error', 'Teléfono Inválido', 'El teléfono debe tener al menos 10 dígitos.');
      return;
    }
    
    if (!password) {
      mostrarNotificacion('error', 'Campo Requerido', 'Por favor ingresa una contraseña.');
      return;
    }
    
    if (password.length < 6) {
      mostrarNotificacion('error', 'Contraseña Corta', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    
    if (password !== password2) {
      mostrarNotificacion('error', 'Contraseñas No Coinciden', 'Las contraseñas ingresadas no coinciden.');
      return;
    }
    
    if (!terminos) {
      mostrarNotificacion('error', 'Términos Requeridos', 'Debes aceptar los términos y condiciones para continuar.');
      return;
    }
    
    const usuario = {
      nombre,
      email,
      telefono,
      logueado: true
    };
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
    
    cerrar();
    mostrarNotificacion('success', '¡Cuenta Creada!', `Bienvenido a NorthPalace, ${nombre}. Tu cuenta ha sido creada exitosamente.`, () => {
      actualizarUIUsuario(usuario);
    });
  });
  
  document.getElementById('registro-nombre').focus();
  
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      cerrar();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

function cerrarModalesAuth() {
  const loginModal = document.getElementById('modal-login-overlay');
  const registroModal = document.getElementById('modal-registro-overlay');
  if (loginModal) loginModal.remove();
  if (registroModal) registroModal.remove();
  document.body.style.overflow = '';
}

function actualizarUIUsuario(usuario) {
  const botonesSesion = document.getElementById('botones-sesion');
  if (botonesSesion && usuario && usuario.logueado) {
    botonesSesion.innerHTML = `
      <span style="color: #667eea; font-weight: 600;">Hola, ${usuario.nombre}</span>
      <a href="#" id="btn-cerrar-sesion" style="margin-left: 15px;">Cerrar sesión</a>
    `;
    
    document.getElementById('btn-cerrar-sesion').addEventListener('click', (e) => {
      e.preventDefault();
      mostrarConfirmacionModal('Cerrar Sesión', '¿Estás seguro que deseas cerrar tu sesión?', () => {
        localStorage.removeItem('usuarioActivo');
        mostrarNotificacion('info', 'Sesión Cerrada', 'Has cerrado sesión correctamente.', () => {
          location.reload();
        });
      });
    });
  }
}

// Verificar usuario al cargar
(function verificarUsuarioActivo() {
  const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
  if (usuario && usuario.logueado) {
    setTimeout(() => actualizarUIUsuario(usuario), 100);
  }
})();

// ============================================================
// SISTEMA DE TRADUCCIÓN E INTERNACIONALIZACIÓN
// ============================================================

const TIPO_CAMBIO_USD = 17.80; // Tipo de cambio MXN a USD (marzo 2026)

const traducciones = [
  // IMPORTANTE: Ordenar de frases más largas a más cortas para evitar conflictos
  
  // Frases completas largas primero
  ['Propiedades destacadas en Chihuahua', 'Featured Properties in Chihuahua'],
  ['Ver todas las propiedades en Chihuahua', 'View All Properties in Chihuahua'],
  ['Las mejores casas y apartamentos en la ciudad más grande del norte', 'The best houses and apartments in the largest city in the north'],
  ['Encuentra tu hogar en Chihuahua', 'Find Your Home in Chihuahua'],
  ['Las mejores casas y apartamentos de Chihuahua, capital, a tu alcance.', 'The best houses and apartments in Chihuahua, capital, at your fingertips.'],
  ['Por favor completa todos los campos antes de buscar.', 'Please fill in all fields before searching.'],
  ['¿En qué colonia o zona?', 'Which neighborhood or area?'],
  ['Ej. Centro, Campestre, Mirador...', 'E.g. Downtown, Campestre, Mirador...'],
  
  // Títulos de propiedades
  ['Casa en Frac. Campestre', 'House in Frac. Campestre'],
  ['Apartamento en el Centro Histórico', 'Apartment in Historic Downtown'],
  ['Casa residencial en El Mirador', 'Residential House in El Mirador'],
  ['Apartamento moderno en San Felipe', 'Modern Apartment in San Felipe'],
  ['Casa amplia en Las Granjas', 'Spacious House in Las Granjas'],
  ['Penthouse en Zona Dorada', 'Penthouse in Zona Dorada'],
  ['Casa en Quintas del Sol', 'House in Quintas del Sol'],
  ['Estudio en Col. Industrial', 'Studio in Col. Industrial'],
  
  // Reseñas (antes de palabras sueltas)
  ['reseñas)', 'reviews)'],
  ['reseñas', 'reviews'],
  ['reseña', 'review'],
  
  // Navbar
  ['Iniciar sesión', 'Sign In'],
  ['Registrarse', 'Sign Up'],
  ['Ver detalle', 'View Details'],
  ['Mis reservas', 'My Bookings'],
  ['Propiedades', 'Properties'],
  ['Inicio', 'Home'],
  
  // Fechas
  ['Fecha de entrada', 'Check-in Date'],
  ['Fecha de salida', 'Check-out Date'],
  
  // Filtros
  ['Zona Norte', 'North Zone'],
  ['Zona Sur', 'South Zone'],
  ['Zona Oriente', 'East Zone'],
  ['Zona Poniente', 'West Zone'],
  ['Centro Histórico', 'Historic Downtown'],
  ['Apartamentos', 'Apartments'],
  ['Casas', 'Houses'],
  ['Todos', 'All'],
  
  // Propiedades - características
  ['Ver propiedad', 'View Property'],
  ['Apartamento', 'Apartment'],
  ['Casa', 'House'],
  ['cuartos', 'rooms'],
  ['cuarto', 'room'],
  ['huéspedes', 'guests'],
  ['huésped', 'guest'],
  ['/ noche', '/ night'],
  ['Huéspedes', 'Guests'],
  
  // Banner CTA
  ['¿Tienes una propiedad en Chihuahua para rentar?', 'Do you have a property in Chihuahua for rent?'],
  ['Publica tu casa o apartamento en NorthPalace y empieza a generar ingresos. Es gratis y fácil.', 'List your house or apartment on NorthPalace and start earning. It\'s free and easy.'],
  ['Publicar mi propiedad', 'List My Property'],
  
  // Beneficios
  ['¿Por qué elegir NorthPalace?', 'Why Choose NorthPalace?'],
  ['Reservas seguras', 'Secure Bookings'],
  ['Tu pago está protegido hasta que llegues a la propiedad.', 'Your payment is protected until you arrive at the property.'],
  ['Soporte 24/7', '24/7 Support'],
  ['Estamos contigo en cada paso de tu estancia en Chihuahua.', 'We\'re with you every step of your stay in Chihuahua.'],
  ['Propiedades verificadas', 'Verified Properties'],
  ['Cada propiedad en Chihuahua pasa por nuestro proceso de verificación.', 'Every property in Chihuahua goes through our verification process.'],
  
  // Footer
  ['Explorar', 'Explore'],
  ['Detalle', 'Details'],
  ['Soporte', 'Support'],
  ['Ayuda', 'Help'],
  ['Términos', 'Terms'],
  ['Privacidad', 'Privacy'],
  ['Novedades', 'Newsletter'],
  ['Suscríbete para recibir las mejores ofertas en Chihuahua.', 'Subscribe to receive the best deals in Chihuahua.'],
  ['Suscribirse', 'Subscribe'],
  ['¡Gracias por suscribirte!', 'Thanks for subscribing!'],
  ['© 2025 NorthPalace. Todos los derechos reservados. Chihuahua, Chih., México.', '© 2025 NorthPalace. All rights reserved. Chihuahua, Chih., Mexico.'],
  
  // Modal Publicar
  ['Publica tu propiedad en NorthPalace', 'List Your Property on NorthPalace'],
  ['Tus datos', 'Your Information'],
  ['Nombre completo', 'Full Name'],
  ['Ej. Juan Pérez', 'E.g. John Smith'],
  ['Correo electrónico', 'Email Address'],
  ['Teléfono', 'Phone'],
  ['Datos de la propiedad', 'Property Information'],
  ['Título del anuncio', 'Listing Title'],
  ['Ej. Casa amplia con jardín en Campestre', 'E.g. Spacious house with garden in Campestre'],
  ['Tipo de propiedad', 'Property Type'],
  ['-- Selecciona --', '-- Select --'],
  ['Dirección completa', 'Full Address'],
  ['Zona de la ciudad', 'City Zone'],
  ['Número de cuartos', 'Number of Rooms'],
  ['Capacidad máxima de huéspedes', 'Maximum Guest Capacity'],
  ['Precio por noche ($)', 'Price per Night ($)'],
  ['Descripción de la propiedad', 'Property Description'],
  ['Describe los espacios, el entorno y lo que hace especial a tu propiedad...', 'Describe the spaces, surroundings, and what makes your property special...'],
  ['Amenidades disponibles', 'Available Amenities'],
  ['Estacionamiento', 'Parking'],
  ['Alberca', 'Pool'],
  ['Cocina equipada', 'Equipped Kitchen'],
  ['Se admiten mascotas', 'Pets Allowed'],
  ['Aire acondicionado', 'Air Conditioning'],
  ['Jardín', 'Garden'],
  ['Publicar propiedad', 'Publish Property'],
  ['Cancelar', 'Cancel'],
  ['¡Tu propiedad fue enviada con éxito! Nos pondremos en contacto contigo pronto.', 'Your property was submitted successfully! We\'ll contact you soon.'],
  ['Por favor completa todos los campos obligatorios.', 'Please fill in all required fields.'],
  
  // Propiedades.html
  ['Propiedades en Chihuahua', 'Properties in Chihuahua'],
  ['Encuentra la casa o apartamento ideal en la capital del estado', 'Find the ideal house or apartment in the state capital'],
  ['Colonia o zona', 'Neighborhood or Area'],
  ['Entrada', 'Check-in'],
  ['Salida', 'Check-out'],
  ['Filtrar por', 'Filter by'],
  ['Precio por noche', 'Price per Night'],
  ['Mínimo ($)', 'Minimum ($)'],
  ['Máximo ($)', 'Maximum ($)'],
  ['Cualquiera', 'Any'],
  ['Aplicar filtros', 'Apply Filters'],
  ['Limpiar filtros', 'Clear Filters'],
  ['Mostrando', 'Showing'],
  ['propiedades en Chihuahua', 'properties in Chihuahua'],
  ['Ordenar por:', 'Sort by:'],
  ['Recomendados', 'Recommended'],
  ['Precio: menor a mayor', 'Price: Low to High'],
  ['Precio: mayor a menor', 'Price: High to Low'],
  ['Mejor calificación', 'Best Rating'],
  ['Disponibilidad esta semana', 'Availability This Week'],
  ['Disponibilidad de propiedades en Chihuahua por día', 'Property availability in Chihuahua by day'],
  ['Propiedad', 'Property'],
  ['Colonia', 'Neighborhood'],
  ['Lunes', 'Monday'],
  ['Martes', 'Tuesday'],
  ['Miércoles', 'Wednesday'],
  ['Jueves', 'Thursday'],
  ['Viernes', 'Friday'],
  ['Sábado', 'Saturday'],
  ['Domingo', 'Sunday'],
  ['Disponible', 'Available'],
  ['Ocupado', 'Occupied'],
  ['No se encontraron propiedades con los filtros seleccionados.', 'No properties found with the selected filters.'],
  
  // Detalle.html
  ['Sobre esta propiedad', 'About This Property'],
  ['Amenidades', 'Amenities'],
  ['Normas de la casa', 'House Rules'],
  ['Ubicación', 'Location'],
  ['Reseñas de huéspedes', 'Guest Reviews'],
  ['Limpieza', 'Cleanliness'],
  ['Comunicación', 'Communication'],
  ['Valor', 'Value'],
  ['Deja tu reseña', 'Leave Your Review'],
  ['Tu nombre', 'Your Name'],
  ['Tu calificación', 'Your Rating'],
  ['Tu comentario', 'Your Comment'],
  ['Cuéntanos tu experiencia en esta propiedad...', 'Tell us about your experience at this property...'],
  ['Publicar reseña', 'Submit Review'],
  ['Por favor completa todos los campos y selecciona una calificación.', 'Please fill in all fields and select a rating.'],
  ['¡Gracias por tu reseña! Se publicará en breve.', 'Thanks for your review! It will be published shortly.'],
  ['Llegada', 'Check-in'],
  ['Reservar ahora', 'Book Now'],
  ['No se te cobrará nada por ahora', 'You won\'t be charged yet'],
  ['Por favor selecciona las fechas y el número de huéspedes.', 'Please select dates and number of guests.'],
  ['La fecha de salida debe ser posterior a la de entrada.', 'Check-out date must be after check-in date.'],
  ['Disponibilidad del mes', 'Monthly Availability'],
  ['Tarifa de limpieza', 'Cleaning Fee'],
  ['Tarifa de servicio NorthPalace', 'NorthPalace Service Fee'],
  ['Total', 'Total'],
  ['Guardar', 'Save'],
  ['Máximo', 'Maximum'],
  
  // Confirmación
  ['¡Reserva confirmada!', 'Booking Confirmed!'],
  ['Tu estancia en Chihuahua está lista. Te enviamos los detalles a tu correo.', 'Your stay in Chihuahua is ready. We sent the details to your email.'],
  ['Número de confirmación:', 'Confirmation Number:'],
  ['Resumen de tu reserva', 'Your Booking Summary'],
  ['Detalles de la estancia', 'Stay Details'],
  ['Número de noches', 'Number of Nights'],
  ['A partir de las 3:00 PM', 'From 3:00 PM'],
  ['Antes de las 12:00 PM', 'Before 12:00 PM'],
  ['Desglose del costo', 'Cost Breakdown'],
  ['Datos del huésped', 'Guest Information'],
  ['Nombre', 'Name'],
  ['Completa tu reserva', 'Complete Your Booking'],
  ['Solicitudes especiales (opcional)', 'Special Requests (optional)'],
  ['¿Tienes alguna solicitud especial?', 'Do you have any special requests?'],
  ['Ej. llegada tardía, cuna para bebé, etc.', 'E.g. late arrival, baby crib, etc.'],
  ['Acepto los', 'I accept the'],
  ['términos y condiciones', 'terms and conditions'],
  ['de NorthPalace', 'of NorthPalace'],
  ['Confirmar reserva', 'Confirm Booking'],
  ['Por favor completa todos los campos y acepta los términos y condiciones.', 'Please fill in all fields and accept the terms and conditions.'],
  ['No tienes ninguna reserva activa', 'You have no active bookings'],
  ['Explora nuestras propiedades en Chihuahua y haz tu primera reserva.', 'Explore our properties in Chihuahua and make your first booking.'],
  ['Ver propiedades', 'View Properties'],
  
  // Modales Auth
  ['Iniciar Sesión', 'Sign In'],
  ['Crear Cuenta', 'Create Account'],
  ['Contraseña', 'Password'],
  ['Tu contraseña', 'Your password'],
  ['Recordar mi sesión', 'Remember me'],
  ['¿No tienes cuenta?', 'Don\'t have an account?'],
  ['Regístrate aquí', 'Sign up here'],
  ['¿Olvidaste tu contraseña?', 'Forgot your password?'],
  ['¿Ya tienes cuenta?', 'Already have an account?'],
  ['Inicia sesión', 'Sign in'],
  ['Mínimo 6 caracteres', 'Minimum 6 characters'],
  ['Repite tu contraseña', 'Repeat your password'],
  ['Confirmar contraseña', 'Confirm password'],
  ['Cerrar sesión', 'Sign out'],
  ['¿Estás seguro que deseas cerrar tu sesión?', 'Are you sure you want to sign out?'],
  ['Hola,', 'Hello,'],
  
  // Palabras sueltas al final (para evitar conflictos)
  ['noches', 'nights'],
  ['noche', 'night'],
  ['Centro', 'Downtown'],
  ['Buscar', 'Search']
];

// Traducciones que solo deben aplicarse cuando la palabra aparece completa
// (evita que "Vie" cambie "View" → "Friw", o "Mar" afecte "March", etc.)
const traduccionesSoloPalabraCompleta = [
  ['Lun', 'Mon'],
  ['Mar', 'Tue'],
  ['Mié', 'Wed'],
  ['Jue', 'Thu'],
  ['Vie', 'Fri'],
  ['Sáb', 'Sat'],
  ['Dom', 'Sun']
];

let idiomaActual = 'es';

function initSelectorIdioma() {
  // Crear el botón selector de idioma
  const selectorHTML = `
    <div id="selector-idioma" style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      gap: 5px;
      background: white;
      padding: 8px 12px;
      border-radius: 30px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    ">
      <button id="btn-idioma-es" class="btn-idioma activo" title="Español" style="
        border: none;
        background: ${idiomaActual === 'es' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f0f0'};
        color: ${idiomaActual === 'es' ? 'white' : '#333'};
        padding: 8px 15px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.3s;
      ">🇲🇽 ES</button>
      <button id="btn-idioma-en" class="btn-idioma" title="English" style="
        border: none;
        background: ${idiomaActual === 'en' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f0f0'};
        color: ${idiomaActual === 'en' ? 'white' : '#333'};
        padding: 8px 15px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.3s;
      ">🇺🇸 EN</button>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', selectorHTML);
  
  document.getElementById('btn-idioma-es').addEventListener('click', () => {
    aplicarIdioma('es');
  });
  
  document.getElementById('btn-idioma-en').addEventListener('click', () => {
    aplicarIdioma('en');
  });
}

function aplicarIdioma(idioma) {
  idiomaActual = idioma;
  localStorage.setItem('idioma', idioma);
  
  // Actualizar botones
  const btnEs = document.getElementById('btn-idioma-es');
  const btnEn = document.getElementById('btn-idioma-en');
  
  if (btnEs && btnEn) {
    btnEs.style.background = idioma === 'es' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f0f0';
    btnEs.style.color = idioma === 'es' ? 'white' : '#333';
    btnEn.style.background = idioma === 'en' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f0f0';
    btnEn.style.color = idioma === 'en' ? 'white' : '#333';
  }
  
  if (idioma === 'en') {
    traducirPagina();
    convertirPreciosADolares();
  } else {
    // Recargar página para volver al español original
    location.reload();
  }
}

function aplicarTraduccionSoloPalabraCompleta(texto) {
  let resultado = texto;
  traduccionesSoloPalabraCompleta.forEach(([es, en]) => {
    const regex = new RegExp('\\b' + escapeRegex(es) + '\\b', 'g');
    resultado = resultado.replace(regex, en);
  });
  return resultado;
}

function traducirPagina() {
  // Traducir elementos de texto
  const elementosTexto = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, label, th, td, li, legend, option, address, caption');
  
  elementosTexto.forEach(el => {
    // Guardar texto original si no existe
    if (!el.dataset.textoOriginal) {
      el.dataset.textoOriginal = el.innerHTML;
    }
    
    let textoActual = el.innerHTML;
    
    // 1) Traducciones normales (frases completas primero; así "Ver propiedad" → "View Property")
    traducciones.forEach(([es, en]) => {
      if (textoActual.includes(es)) {
        textoActual = textoActual.split(es).join(en);
      }
    });
    
    // 2) Abreviaturas (solo como palabra completa: "Vie" en tabla → "Fri", pero no dentro de "View")
    textoActual = aplicarTraduccionSoloPalabraCompleta(textoActual);
    
    el.innerHTML = textoActual;
  });
  
  // Traducir placeholders
  const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
  inputs.forEach(input => {
    if (!input.dataset.placeholderOriginal) {
      input.dataset.placeholderOriginal = input.placeholder;
    }
    
    let placeholder = input.placeholder;
    traducciones.forEach(([es, en]) => {
      if (placeholder.includes(es)) {
        placeholder = placeholder.split(es).join(en);
      }
    });
    placeholder = aplicarTraduccionSoloPalabraCompleta(placeholder);
    input.placeholder = placeholder;
  });
  
  // Traducir titles (tooltips)
  const elementsWithTitle = document.querySelectorAll('[title]');
  elementsWithTitle.forEach(el => {
    if (!el.dataset.titleOriginal) {
      el.dataset.titleOriginal = el.title;
    }
    
    let title = el.title;
    traducciones.forEach(([es, en]) => {
      if (title.includes(es)) {
        title = title.split(es).join(en);
      }
    });
    title = aplicarTraduccionSoloPalabraCompleta(title);
    el.title = title;
  });
  
  // Actualizar título de la página
  if (document.title.includes('NorthPalace')) {
    const titulos = {
      'NorthPalace - Tu hogar en Chihuahua': 'NorthPalace - Your Home in Chihuahua',
      'NorthPalace - Propiedades en Chihuahua': 'NorthPalace - Properties in Chihuahua',
      'NorthPalace - Detalle de propiedad': 'NorthPalace - Property Details',
      'NorthPalace - Confirmación de reserva': 'NorthPalace - Booking Confirmation'
    };
    if (titulos[document.title]) {
      document.title = titulos[document.title];
    }
  }
}

function convertirPreciosADolares() {
  // Buscar todos los elementos que contienen precios en MXN
  const elementosConPrecio = document.querySelectorAll('p, span, td, strong, div');
  
  elementosConPrecio.forEach(el => {
    // Guardar contenido original
    if (!el.dataset.precioOriginal && el.innerHTML.includes('$')) {
      el.dataset.precioOriginal = el.innerHTML;
    }
    
    // Buscar patrones de precio: $X,XXX o $XXX
    const regexPrecio = /\$[\d,]+(\.\d{2})?/g;
    let contenido = el.innerHTML;
    
    const matches = contenido.match(regexPrecio);
    if (matches) {
      matches.forEach(match => {
        // Extraer número
        const numero = parseFloat(match.replace(/[$,]/g, ''));
        if (!isNaN(numero) && numero > 50) { // Solo convertir si parece ser MXN (mayor a $50)
          const enDolares = (numero / TIPO_CAMBIO_USD).toFixed(0);
          const nuevoTexto = `$${parseInt(enDolares).toLocaleString('en-US')} USD`;
          contenido = contenido.replace(match, nuevoTexto);
        }
      });
      el.innerHTML = contenido;
    }
  });
  
  // Actualizar data-precio en cards
  const cards = document.querySelectorAll('[data-precio]');
  cards.forEach(card => {
    if (!card.dataset.precioMxn) {
      card.dataset.precioMxn = card.dataset.precio;
    }
    const precioMxn = parseFloat(card.dataset.precioMxn);
    card.dataset.precio = Math.round(precioMxn / TIPO_CAMBIO_USD);
  });
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function traducir(texto) {
  if (idiomaActual === 'en') {
    const traduccion = traducciones.find(([es, en]) => es === texto);
    if (traduccion) {
      return traduccion[1];
    }
  }
  return texto;
}

function formatearPrecioIdioma(precio) {
  if (idiomaActual === 'en') {
    const precioUsd = Math.round(precio / TIPO_CAMBIO_USD);
    return '$' + precioUsd.toLocaleString('en-US') + ' USD';
  }
  return '$' + precio.toLocaleString('es-MX');
}

// ============================================================
// UTILIDADES COMUNES
// ============================================================

function initTooltips() {
  const elementsWithTitle = document.querySelectorAll('[title]');
  elementsWithTitle.forEach(el => {
    el.addEventListener('mouseenter', function() {
      const title = this.getAttribute('title');
      if (title) {
        this.setAttribute('data-original-title', title);
      }
    });
  });
}

function initNewsletter() {
  const btnNewsletter = document.getElementById('btn-newsletter');
  const inputNewsletter = document.getElementById('input-newsletter');
  const mensajeNewsletter = document.getElementById('mensaje-newsletter');
  
  if (btnNewsletter && inputNewsletter && mensajeNewsletter) {
    btnNewsletter.addEventListener('click', () => {
      const email = inputNewsletter.value.trim();
      
      if (!email || !isValidEmail(email)) {
        mostrarNotificacion('error', 'Email Inválido', 'Por favor ingresa un correo electrónico válido.');
        inputNewsletter.focus();
        return;
      }
      
      mensajeNewsletter.hidden = false;
      inputNewsletter.value = '';
      mostrarNotificacion('success', '¡Suscrito!', 'Gracias por suscribirte a nuestro newsletter. Recibirás las mejores ofertas.');
      
      setTimeout(() => {
        mensajeNewsletter.hidden = true;
      }, 5000);
    });
  }
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
}

function generarCodigoReserva() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = 'NP-';
  for (let i = 0; i < 8; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}

function formatearFecha(fechaStr) {
  const fecha = new Date(fechaStr + 'T00:00:00');
  const opciones = { day: 'numeric', month: 'short' };
  return fecha.toLocaleDateString('es-MX', opciones);
}

function formatearFechaCompleta(fechaStr) {
  const fecha = new Date(fechaStr + 'T00:00:00');
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return fecha.toLocaleDateString('es-MX', opciones);
}

function calcularNoches(fechaEntrada, fechaSalida) {
  const entrada = new Date(fechaEntrada);
  const salida = new Date(fechaSalida);
  const diffTime = Math.abs(salida - entrada);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function formatearPrecio(precio) {
  const idioma = localStorage.getItem('idioma') || 'es';
  if (idioma === 'en') {
    const precioUsd = Math.round(precio / TIPO_CAMBIO_USD);
    return '$' + precioUsd.toLocaleString('en-US') + ' USD';
  }
  return '$' + precio.toLocaleString('es-MX');
}

function generarEstrellas(rating) {
  const llenas = Math.floor(rating);
  const media = rating % 1 >= 0.5 ? 1 : 0;
  const vacias = 5 - llenas - media;
  
  let estrellas = '';
  for (let i = 0; i < llenas; i++) estrellas += '★';
  if (media) estrellas += '☆';
  for (let i = 0; i < vacias; i++) estrellas += '☆';
  
  return estrellas;
}

function guardarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
  const index = favoritos.indexOf(id);
  
  if (index > -1) {
    favoritos.splice(index, 1);
    return false;
  } else {
    favoritos.push(id);
    return true;
  }
  
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function esFavorito(id) {
  const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
  return favoritos.includes(id);
}

function toggleFavorito(btn, id) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
  const index = favoritos.indexOf(id);
  
  if (index > -1) {
    favoritos.splice(index, 1);
    btn.innerHTML = '♡ Guardar';
    btn.classList.remove('favorito-activo');
    mostrarNotificacion('info', 'Eliminado', 'Propiedad eliminada de favoritos.');
  } else {
    favoritos.push(id);
    btn.innerHTML = '♥ Guardado';
    btn.classList.add('favorito-activo');
    mostrarNotificacion('success', '¡Guardado!', 'Propiedad agregada a tus favoritos.');
  }
  
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

// ============================================================
// INDEX.HTML - Página Principal
// ============================================================

function initIndexPage() {
  initBuscadorIndex();
  initFiltrosRapidos();
  initFavoritosIndex();
  initModalPublicar();
}

function initBuscadorIndex() {
  const btnBuscar = document.getElementById('btn-buscar');
  const errorBusqueda = document.getElementById('error-busqueda');
  const fechaEntradaInput = document.getElementById('input-fecha-entrada');
  const fechaSalidaInput = document.getElementById('input-fecha-salida');
  
  // Establecer fecha de entrada en el día actual
  const hoy = new Date().toISOString().split('T')[0];
  if (fechaEntradaInput) {
    fechaEntradaInput.value = hoy;
    fechaEntradaInput.min = hoy;
  }
  if (fechaSalidaInput) {
    fechaSalidaInput.min = hoy;
  }
  
  if (!btnBuscar) return;
  
  btnBuscar.addEventListener('click', () => {
    const destino = document.getElementById('input-destino').value.trim();
    const fechaEntrada = document.getElementById('input-fecha-entrada').value;
    const fechaSalida = document.getElementById('input-fecha-salida').value;
    const huespedes = document.getElementById('input-huespedes').value;
    
    if (!destino || !fechaEntrada || !fechaSalida || !huespedes) {
      errorBusqueda.hidden = false;
      mostrarNotificacion('warning', 'Campos Incompletos', 'Por favor completa todos los campos antes de buscar.');
      return;
    }
    
    if (new Date(fechaSalida) <= new Date(fechaEntrada)) {
      mostrarNotificacion('error', 'Fechas Inválidas', 'La fecha de salida debe ser posterior a la fecha de entrada.');
      return;
    }
    
    errorBusqueda.hidden = true;
    
    const busqueda = { destino, fechaEntrada, fechaSalida, huespedes };
    localStorage.setItem('busqueda', JSON.stringify(busqueda));
    
    window.location.href = 'propiedades.html';
  });
}

function initFiltrosRapidos() {
  const botonesFilter = document.querySelectorAll('#lista-filtros button');
  const cards = document.querySelectorAll('#grid-propiedades article');
  
  if (!botonesFilter.length) return;
  
  botonesFilter.forEach(btn => {
    btn.addEventListener('click', () => {
      botonesFilter.forEach(b => b.classList.remove('filtro-activo'));
      btn.classList.add('filtro-activo');
      
      const filtro = btn.dataset.filtro;
      
      cards.forEach(card => {
        const tipo = card.dataset.tipo;
        
        if (filtro === 'todos') {
          card.style.display = '';
        } else if (filtro === 'casa' || filtro === 'apartamento') {
          card.style.display = tipo === filtro ? '' : 'none';
        } else {
          card.style.display = '';
        }
      });
    });
  });
}

function initFavoritosIndex() {
  const botonesFav = document.querySelectorAll('[id^="fav-"]');
  
  botonesFav.forEach(btn => {
    const id = parseInt(btn.dataset.id);
    
    if (esFavorito(id)) {
      btn.innerHTML = '♥';
      btn.classList.add('favorito-activo');
    }
    
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
      const index = favoritos.indexOf(id);
      
      if (index > -1) {
        favoritos.splice(index, 1);
        btn.innerHTML = '♡';
        btn.classList.remove('favorito-activo');
      } else {
        favoritos.push(id);
        btn.innerHTML = '♥';
        btn.classList.add('favorito-activo');
      }
      
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    });
  });
}

function initModalPublicar() {
  const modal = document.getElementById('modal-publicar');
  const btnPublicar = document.getElementById('btn-publicar');
  const btnCerrar = document.getElementById('btn-cerrar-modal');
  const btnCancelar = document.getElementById('btn-cancelar-modal');
  const btnEnviar = document.getElementById('btn-enviar-publicar');
  const mensajeOk = document.getElementById('mensaje-publicar-ok');
  const errorPublicar = document.getElementById('error-publicar');
  
  if (!modal) return;
  
  if (btnPublicar) {
    btnPublicar.addEventListener('click', () => {
      modal.showModal();
    });
  }
  
  if (btnCerrar) {
    btnCerrar.addEventListener('click', () => {
      modal.close();
    });
  }
  
  if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
      modal.close();
    });
  }
  
  if (btnEnviar) {
    btnEnviar.addEventListener('click', () => {
      const nombre = document.getElementById('input-nombre-prop').value.trim();
      const email = document.getElementById('input-email-prop').value.trim();
      const telefono = document.getElementById('input-telefono-prop').value.trim();
      const titulo = document.getElementById('input-titulo-prop').value.trim();
      const tipo = document.getElementById('select-tipo-prop').value;
      const direccion = document.getElementById('input-direccion-prop').value.trim();
      const zona = document.getElementById('select-zona-prop').value;
      const cuartos = document.getElementById('input-cuartos-prop').value;
      const huespedesMax = document.getElementById('input-huespedes-max').value;
      const precio = document.getElementById('input-precio-prop').value;
      const descripcion = document.getElementById('textarea-descripcion-prop').value.trim();
      
      if (!nombre || !email || !telefono || !titulo || !tipo || !direccion || !zona || !cuartos || !huespedesMax || !precio || !descripcion) {
        errorPublicar.hidden = false;
        mensajeOk.hidden = true;
        mostrarNotificacion('warning', 'Campos Incompletos', 'Por favor completa todos los campos obligatorios.');
        return;
      }
      
      if (!isValidEmail(email)) {
        mostrarNotificacion('error', 'Email Inválido', 'Por favor ingresa un correo electrónico válido.');
        return;
      }
      
      errorPublicar.hidden = true;
      mensajeOk.hidden = false;
      
      mostrarNotificacion('success', '¡Propiedad Enviada!', 'Tu propiedad ha sido enviada para revisión. Nos pondremos en contacto contigo pronto.');
      
      setTimeout(() => {
        modal.close();
        mensajeOk.hidden = true;
        document.querySelectorAll('#modal-publicar input, #modal-publicar select, #modal-publicar textarea').forEach(el => {
          if (el.type === 'checkbox') {
            el.checked = false;
          } else {
            el.value = '';
          }
        });
      }, 2000);
    });
  }
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.close();
    }
  });
}

// ============================================================
// PROPIEDADES.HTML - Listado de Propiedades
// ============================================================

function initPropiedadesPage() {
  initBuscadorPropiedades();
  initFiltrosAvanzados();
  initOrdenarPropiedades();
  initFavoritosPropiedades();
  initTablaDisponibilidad();
  initSeleccionPropiedad();
}

function initBuscadorPropiedades() {
  const btnBuscar = document.getElementById('btn-buscar-prop');
  const errorBusqueda = document.getElementById('error-busqueda-prop');
  const fechaEntradaInput = document.getElementById('input-fecha-entrada-prop');
  const fechaSalidaInput = document.getElementById('input-fecha-salida-prop');
  
  // Establecer fecha de entrada en el día actual
  const hoy = new Date().toISOString().split('T')[0];
  if (fechaEntradaInput) {
    fechaEntradaInput.value = hoy;
    fechaEntradaInput.min = hoy;
  }
  if (fechaSalidaInput) {
    fechaSalidaInput.min = hoy;
  }
  
  if (!btnBuscar) return;
  
  btnBuscar.addEventListener('click', () => {
    const destino = document.getElementById('input-destino-prop').value.trim();
    const fechaEntrada = document.getElementById('input-fecha-entrada-prop').value;
    const fechaSalida = document.getElementById('input-fecha-salida-prop').value;
    const huespedes = document.getElementById('input-huespedes-prop').value;
    
    if (!destino && !fechaEntrada && !fechaSalida && !huespedes) {
      errorBusqueda.hidden = false;
      mostrarNotificacion('warning', 'Campos Vacíos', 'Por favor completa al menos un campo para buscar.');
      return;
    }
    
    if (fechaEntrada && fechaSalida && new Date(fechaSalida) <= new Date(fechaEntrada)) {
      mostrarNotificacion('error', 'Fechas Inválidas', 'La fecha de salida debe ser posterior a la fecha de entrada.');
      return;
    }
    
    errorBusqueda.hidden = true;
    aplicarFiltros();
  });
}

function initFiltrosAvanzados() {
  const btnAplicar = document.getElementById('btn-aplicar-filtros');
  const btnLimpiar = document.getElementById('btn-limpiar-filtros');
  
  if (btnAplicar) {
    btnAplicar.addEventListener('click', aplicarFiltros);
  }
  
  if (btnLimpiar) {
    btnLimpiar.addEventListener('click', limpiarFiltros);
  }
}

function aplicarFiltros() {
  const cards = document.querySelectorAll('#grid-propiedades article[id^="card-"]');
  const sinResultados = document.getElementById('sin-resultados');
  
  const tiposCasa = document.getElementById('tipo-casa')?.checked;
  const tiposApartamento = document.getElementById('tipo-apartamento')?.checked;
  
  const zonaCentro = document.getElementById('zona-centro')?.checked;
  const zonaNorte = document.getElementById('zona-norte')?.checked;
  const zonaSur = document.getElementById('zona-sur')?.checked;
  const zonaOriente = document.getElementById('zona-oriente')?.checked;
  const zonaPoniente = document.getElementById('zona-poniente')?.checked;
  
  const precioMin = parseInt(document.getElementById('precio-min')?.value) || 0;
  const precioMax = parseInt(document.getElementById('precio-max')?.value) || Infinity;
  
  const cuartosSeleccionado = document.querySelector('input[name="cuartos"]:checked')?.value || '0';
  
  const amenidadWifi = document.getElementById('amenidad-wifi')?.checked;
  const amenidadEstacionamiento = document.getElementById('amenidad-estacionamiento')?.checked;
  const amenidadAlberca = document.getElementById('amenidad-alberca')?.checked;
  const amenidadCocina = document.getElementById('amenidad-cocina')?.checked;
  const amenidadMascotas = document.getElementById('amenidad-mascotas')?.checked;
  const amenidadAire = document.getElementById('amenidad-aire')?.checked;
  
  let visibles = 0;
  
  cards.forEach(card => {
    if (card.id === 'sin-resultados') return;
    
    let mostrar = true;
    
    const tipo = card.dataset.tipo;
    if ((tiposCasa || tiposApartamento) && !((tiposCasa && tipo === 'casa') || (tiposApartamento && tipo === 'apartamento'))) {
      mostrar = false;
    }
    
    const zona = card.dataset.zona;
    const zonasSeleccionadas = [];
    if (zonaCentro) zonasSeleccionadas.push('centro');
    if (zonaNorte) zonasSeleccionadas.push('norte');
    if (zonaSur) zonasSeleccionadas.push('sur');
    if (zonaOriente) zonasSeleccionadas.push('oriente');
    if (zonaPoniente) zonasSeleccionadas.push('poniente');
    
    if (zonasSeleccionadas.length > 0 && !zonasSeleccionadas.includes(zona)) {
      mostrar = false;
    }
    
    const precio = parseInt(card.dataset.precio);
    if (precio < precioMin || precio > precioMax) {
      mostrar = false;
    }
    
    const cuartos = parseInt(card.dataset.cuartos);
    if (cuartosSeleccionado !== '0') {
      if (cuartosSeleccionado === '4' && cuartos < 4) {
        mostrar = false;
      } else if (cuartosSeleccionado !== '4' && cuartos !== parseInt(cuartosSeleccionado)) {
        mostrar = false;
      }
    }
    
    const amenidades = card.dataset.amenidades || '';
    if (amenidadWifi && !amenidades.includes('wifi')) mostrar = false;
    if (amenidadEstacionamiento && !amenidades.includes('estacionamiento')) mostrar = false;
    if (amenidadAlberca && !amenidades.includes('alberca')) mostrar = false;
    if (amenidadCocina && !amenidades.includes('cocina')) mostrar = false;
    if (amenidadMascotas && !amenidades.includes('mascotas')) mostrar = false;
    if (amenidadAire && !amenidades.includes('aire')) mostrar = false;
    
    card.style.display = mostrar ? '' : 'none';
    if (mostrar) visibles++;
  });
  
  if (sinResultados) {
    sinResultados.hidden = visibles > 0;
  }
  
  const contador = document.getElementById('contador-resultados');
  if (contador) {
    contador.textContent = `Mostrando ${visibles} propiedad${visibles !== 1 ? 'es' : ''} en Chihuahua`;
  }
}

function limpiarFiltros() {
  document.querySelectorAll('#sidebar-filtros input[type="checkbox"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('#sidebar-filtros input[type="number"]').forEach(input => input.value = '');
  document.getElementById('cuartos-cualquiera').checked = true;
  
  const cards = document.querySelectorAll('#grid-propiedades article');
  cards.forEach(card => {
    if (card.id !== 'sin-resultados') {
      card.style.display = '';
    }
  });
  
  const sinResultados = document.getElementById('sin-resultados');
  if (sinResultados) sinResultados.hidden = true;
  
  const contador = document.getElementById('contador-resultados');
  if (contador) {
    contador.textContent = 'Mostrando 8 propiedades en Chihuahua';
  }
}

function initOrdenarPropiedades() {
  const selectOrden = document.getElementById('select-orden');
  
  if (!selectOrden) return;
  
  selectOrden.addEventListener('change', () => {
    const orden = selectOrden.value;
    const grid = document.getElementById('grid-propiedades');
    const cards = Array.from(grid.querySelectorAll('article[id^="card-"]'));
    
    cards.sort((a, b) => {
      const precioA = parseInt(a.dataset.precio);
      const precioB = parseInt(b.dataset.precio);
      const ratingA = parseFloat(a.dataset.rating);
      const ratingB = parseFloat(b.dataset.rating);
      
      switch (orden) {
        case 'precio-asc':
          return precioA - precioB;
        case 'precio-desc':
          return precioB - precioA;
        case 'calificacion':
          return ratingB - ratingA;
        default:
          return 0;
      }
    });
    
    cards.forEach(card => grid.appendChild(card));
  });
}

function initFavoritosPropiedades() {
  initFavoritosIndex();
}

function initTablaDisponibilidad() {
  const tabla = document.getElementById('tabla-disponibilidad');
  
  if (!tabla) return;
  
  const celdas = tabla.querySelectorAll('td');
  
  celdas.forEach(celda => {
    const texto = celda.textContent.trim().toLowerCase();
    
    if (texto === 'disponible') {
      celda.style.backgroundColor = '#d4edda';
      celda.style.color = '#155724';
      celda.setAttribute('title', 'Esta propiedad está disponible este día');
    } else if (texto === 'ocupado') {
      celda.style.backgroundColor = '#f8d7da';
      celda.style.color = '#721c24';
      celda.setAttribute('title', 'Esta propiedad no está disponible este día');
    }
  });
}

function initSeleccionPropiedad() {
  const botonesVer = document.querySelectorAll('[id^="btn-ver-"]');
  
  botonesVer.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const cardId = btn.id.replace('btn-ver-', '');
      const propiedadId = parseInt(cardId);
      
      localStorage.setItem('propiedadSeleccionada', propiedadId);
      
      window.location.href = 'detalle.html';
    });
  });
}

// ============================================================
// DETALLE.HTML - Detalle de Propiedad
// ============================================================

function initDetallePage() {
  const propiedadId = parseInt(localStorage.getItem('propiedadSeleccionada')) || 1;
  const propiedad = propiedadesData.find(p => p.id === propiedadId) || propiedadesData[0];
  
  cargarDatosPropiedad(propiedad);
  initGaleria(propiedad);
  initFavoritoDetalle(propiedad);
  initResenasDetalle(propiedad);
  initPanelReserva(propiedad);
  initMiniCalendario(propiedad);
}

function cargarDatosPropiedad(propiedad) {
  const setTexto = (id, texto) => {
    const el = document.getElementById(id);
    if (el) el.textContent = texto;
  };
  
  const setHTML = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };
  
  setTexto('prop-titulo', propiedad.titulo);
  setTexto('prop-tipo', propiedad.tipo);
  setTexto('prop-cuartos', `${propiedad.cuartos} cuartos`);
  setTexto('prop-huespedes', `${propiedad.huespedes} huéspedes`);
  setTexto('prop-direccion', propiedad.direccion);
  
  const propRating = document.getElementById('prop-rating');
  if (propRating) {
    propRating.dataset.rating = propiedad.rating;
    setHTML('prop-estrellas', generarEstrellas(propiedad.rating));
    setTexto('prop-rating-numero', propiedad.rating.toFixed(1));
    
    const linkResenas = document.getElementById('link-resenas');
    if (linkResenas) linkResenas.textContent = `(${propiedad.resenas} reseñas)`;
  }
  
  setTexto('prop-descripcion-texto', propiedad.descripcion);
  
  const listaAmenidades = document.getElementById('lista-amenidades');
  if (listaAmenidades) {
    listaAmenidades.innerHTML = propiedad.amenidades.map(a => 
      `<li title="${a}: Incluido en esta propiedad">✓ ${a}</li>`
    ).join('');
  }
  
  const listaNormas = document.getElementById('lista-normas');
  if (listaNormas) {
    listaNormas.innerHTML = propiedad.normas.map(n => `<li>${n}</li>`).join('');
  }
  
  setTexto('ubicacion-completa', propiedad.direccion);
  setTexto('ubicacion-referencia', propiedad.referencia);
  
  setTexto('precio-noche', formatearPrecio(propiedad.precio));
  setTexto('max-huespedes-aviso', `Máximo ${propiedad.huespedes} huéspedes`);
  
  const reservaRating = document.getElementById('reserva-rating');
  if (reservaRating) {
    reservaRating.dataset.rating = propiedad.rating;
    setHTML('reserva-estrellas', generarEstrellas(propiedad.rating));
    setTexto('reserva-num-resenas', `(${propiedad.resenas} reseñas)`);
  }
  
  setTexto('calificacion-general', propiedad.rating.toFixed(1));
  setTexto('total-resenas', `${propiedad.resenas} reseñas`);
  
  const resumenEstrellas = document.getElementById('resumen-estrellas');
  if (resumenEstrellas) {
    resumenEstrellas.dataset.rating = propiedad.rating;
    resumenEstrellas.innerHTML = generarEstrellas(propiedad.rating);
  }
  
  const categorias = ['limpieza', 'comunicacion', 'ubicacion', 'valor'];
  categorias.forEach(cat => {
    const valor = propiedad.calificaciones[cat === 'ubicacion' ? 'ubicacion' : cat];
    const valorEl = document.getElementById(`valor-${cat === 'ubicacion' ? 'ubicacion-rating' : (cat === 'valor' ? 'categoria-valor' : cat)}`);
    if (valorEl) valorEl.textContent = valor.toFixed(1);
    
    const progreso = document.getElementById(`progreso-${cat === 'ubicacion' ? 'ubicacion-rating' : cat}`);
    if (progreso) {
      progreso.style.width = `${(valor / 5) * 100}%`;
      progreso.style.backgroundColor = '#ffc107';
      progreso.style.height = '8px';
      progreso.style.borderRadius = '4px';
    }
    
    const barra = document.getElementById(`barra-${cat === 'ubicacion' ? 'ubicacion-rating' : cat}`);
    if (barra) {
      barra.dataset.valor = valor;
      barra.style.backgroundColor = '#e9ecef';
      barra.style.height = '8px';
      barra.style.borderRadius = '4px';
      barra.style.flex = '1';
      barra.style.margin = '0 10px';
    }
  });
  
  cargarResenas(propiedad);
}

function initGaleria(propiedad) {
  const imgPrincipal = document.getElementById('img-principal');
  const galeriaMiniaturas = document.getElementById('galeria-miniaturas');
  
  if (imgPrincipal) {
    imgPrincipal.src = propiedad.imagen;
    imgPrincipal.alt = propiedad.titulo;
  }
  
  if (galeriaMiniaturas) {
    galeriaMiniaturas.innerHTML = propiedad.imagenes.map((img, idx) => `
      <img src="${img}" alt="${propiedad.titulo} - Foto ${idx + 1}" 
           class="miniatura ${idx === 0 ? 'miniatura-activa' : ''}"
           style="cursor: pointer; width: 80px; height: 60px; object-fit: cover; margin: 5px; border: 2px solid ${idx === 0 ? '#007bff' : 'transparent'};"
           data-img="${img}">
    `).join('');
    
    galeriaMiniaturas.querySelectorAll('.miniatura').forEach(mini => {
      mini.addEventListener('click', () => {
        imgPrincipal.src = mini.dataset.img;
        
        galeriaMiniaturas.querySelectorAll('.miniatura').forEach(m => {
          m.style.border = '2px solid transparent';
        });
        mini.style.border = '2px solid #007bff';
      });
    });
  }
}

function initFavoritoDetalle(propiedad) {
  const btnFavorito = document.getElementById('btn-favorito-detalle');
  
  if (!btnFavorito) return;
  
  if (esFavorito(propiedad.id)) {
    btnFavorito.innerHTML = '♥ Guardado';
    btnFavorito.classList.add('favorito-activo');
  }
  
  btnFavorito.addEventListener('click', () => {
    toggleFavorito(btnFavorito, propiedad.id);
  });
}

function initResenasDetalle(propiedad) {
  const estrellasInteractivas = document.getElementById('estrellas-interactivas');
  const inputCalificacion = document.getElementById('input-calificacion-resena');
  const btnEnviar = document.getElementById('btn-enviar-resena');
  
  if (estrellasInteractivas) {
    const estrellas = estrellasInteractivas.querySelectorAll('.estrella-seleccionable');
    
    estrellas.forEach(estrella => {
      estrella.style.cursor = 'pointer';
      estrella.style.fontSize = '24px';
      estrella.style.color = '#ccc';
      
      estrella.addEventListener('mouseenter', () => {
        const valor = parseInt(estrella.dataset.valor);
        estrellas.forEach(e => {
          e.style.color = parseInt(e.dataset.valor) <= valor ? '#ffc107' : '#ccc';
        });
      });
      
      estrella.addEventListener('mouseleave', () => {
        const seleccion = parseInt(estrellasInteractivas.dataset.seleccion);
        estrellas.forEach(e => {
          e.style.color = parseInt(e.dataset.valor) <= seleccion ? '#ffc107' : '#ccc';
        });
      });
      
      estrella.addEventListener('click', () => {
        const valor = parseInt(estrella.dataset.valor);
        estrellasInteractivas.dataset.seleccion = valor;
        if (inputCalificacion) inputCalificacion.value = valor;
        
        estrellas.forEach(e => {
          e.style.color = parseInt(e.dataset.valor) <= valor ? '#ffc107' : '#ccc';
        });
      });
    });
  }
  
  if (btnEnviar) {
    btnEnviar.addEventListener('click', () => {
      const autor = document.getElementById('input-autor-resena').value.trim();
      const calificacion = parseInt(inputCalificacion?.value) || 0;
      const texto = document.getElementById('textarea-resena').value.trim();
      
      const errorResena = document.getElementById('error-resena');
      const mensajeOk = document.getElementById('mensaje-resena-ok');
      
      if (!autor || calificacion === 0 || !texto) {
        if (errorResena) errorResena.hidden = false;
        if (mensajeOk) mensajeOk.hidden = true;
        mostrarNotificacion('warning', 'Campos Incompletos', 'Por favor completa todos los campos y selecciona una calificación.');
        return;
      }
      
      if (errorResena) errorResena.hidden = true;
      if (mensajeOk) mensajeOk.hidden = false;
      
      const nuevaResena = {
        autor,
        rating: calificacion,
        texto,
        fecha: new Date().toISOString().split('T')[0]
      };
      
      propiedad.resenasData.unshift(nuevaResena);
      cargarResenas(propiedad);
      
      document.getElementById('input-autor-resena').value = '';
      document.getElementById('textarea-resena').value = '';
      estrellasInteractivas.dataset.seleccion = '0';
      inputCalificacion.value = '0';
      estrellasInteractivas.querySelectorAll('.estrella-seleccionable').forEach(e => {
        e.style.color = '#ccc';
      });
      
      mostrarNotificacion('success', '¡Reseña Publicada!', 'Gracias por tu reseña. Se ha publicado correctamente.');
      
      setTimeout(() => {
        if (mensajeOk) mensajeOk.hidden = true;
      }, 3000);
    });
  }
}

function cargarResenas(propiedad) {
  const listaResenas = document.getElementById('lista-resenas');
  
  if (!listaResenas) return;
  
  if (propiedad.resenasData.length === 0) {
    listaResenas.innerHTML = '<p>Aún no hay reseñas para esta propiedad. ¡Sé el primero en dejar una!</p>';
    return;
  }
  
  listaResenas.innerHTML = propiedad.resenasData.map(resena => `
    <article class="resena" style="border-bottom: 1px solid #eee; padding: 15px 0;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <strong>${resena.autor}</strong>
        <span style="color: #ffc107;">${generarEstrellas(resena.rating)}</span>
      </div>
      <p style="margin: 10px 0;">${resena.texto}</p>
      <small style="color: #666;">${formatearFechaCompleta(resena.fecha)}</small>
    </article>
  `).join('');
}

function initPanelReserva(propiedad) {
  const fechaEntrada = document.getElementById('reserva-fecha-entrada');
  const fechaSalida = document.getElementById('reserva-fecha-salida');
  const inputHuespedes = document.getElementById('reserva-huespedes');
  const btnReservar = document.getElementById('btn-reservar');
  
  // Establecer fecha de entrada en el día actual
  const hoy = new Date().toISOString().split('T')[0];
  if (fechaEntrada) {
    fechaEntrada.value = hoy;
    fechaEntrada.min = hoy;
  }
  if (fechaSalida) fechaSalida.min = hoy;
  
  if (inputHuespedes) {
    inputHuespedes.max = propiedad.huespedes;
    inputHuespedes.value = 1;
  }
  
  const calcularCosto = () => {
    const errorFechas = document.getElementById('error-fechas');
    
    if (!fechaEntrada.value || !fechaSalida.value) {
      limpiarDesglose();
      return;
    }
    
    if (new Date(fechaSalida.value) <= new Date(fechaEntrada.value)) {
      if (errorFechas) errorFechas.hidden = false;
      limpiarDesglose();
      return;
    }
    
    if (errorFechas) errorFechas.hidden = true;
    
    const noches = calcularNoches(fechaEntrada.value, fechaSalida.value);
    const costoNoches = propiedad.precio * noches;
    const costoLimpieza = 350;
    const costoServicio = Math.round(costoNoches * 0.12);
    const total = costoNoches + costoLimpieza + costoServicio;
    
    const setTexto = (id, texto) => {
      const el = document.getElementById(id);
      if (el) el.textContent = texto;
    };
    
    setTexto('texto-noches', `${formatearPrecio(propiedad.precio)} x ${noches} noche${noches > 1 ? 's' : ''}`);
    setTexto('costo-noches', formatearPrecio(costoNoches));
    setTexto('costo-limpieza', formatearPrecio(costoLimpieza));
    setTexto('costo-servicio', formatearPrecio(costoServicio));
    setTexto('costo-total', formatearPrecio(total));
  };
  
  const limpiarDesglose = () => {
    ['texto-noches', 'costo-noches', 'costo-limpieza', 'costo-servicio', 'costo-total'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '--';
    });
  };
  
  if (fechaEntrada) fechaEntrada.addEventListener('change', calcularCosto);
  if (fechaSalida) fechaSalida.addEventListener('change', calcularCosto);
  if (inputHuespedes) inputHuespedes.addEventListener('change', calcularCosto);
  
  if (btnReservar) {
    btnReservar.addEventListener('click', () => {
      const errorReserva = document.getElementById('error-reserva');
      
      if (!fechaEntrada.value || !fechaSalida.value || !inputHuespedes.value) {
        if (errorReserva) errorReserva.hidden = false;
        mostrarNotificacion('warning', 'Campos Incompletos', 'Por favor selecciona las fechas y el número de huéspedes antes de reservar.');
        return;
      }
      
      if (new Date(fechaSalida.value) <= new Date(fechaEntrada.value)) {
        mostrarNotificacion('error', 'Fechas Inválidas', 'La fecha de salida debe ser posterior a la fecha de entrada.');
        return;
      }
      
      const huespedes = parseInt(inputHuespedes.value);
      if (huespedes > propiedad.huespedes) {
        mostrarNotificacion('warning', 'Límite de Huéspedes', `Esta propiedad tiene un máximo de ${propiedad.huespedes} huéspedes.`);
        return;
      }
      
      if (errorReserva) errorReserva.hidden = true;
      
      const noches = calcularNoches(fechaEntrada.value, fechaSalida.value);
      const costoNoches = propiedad.precio * noches;
      const costoLimpieza = 350;
      const costoServicio = Math.round(costoNoches * 0.12);
      const total = costoNoches + costoLimpieza + costoServicio;
      
      const reserva = {
        propiedad: {
          id: propiedad.id,
          titulo: propiedad.titulo,
          tipo: propiedad.tipo,
          direccion: propiedad.direccion,
          imagen: propiedad.imagen,
          rating: propiedad.rating,
          resenas: propiedad.resenas
        },
        fechaEntrada: fechaEntrada.value,
        fechaSalida: fechaSalida.value,
        noches,
        huespedes,
        costos: {
          precioNoche: propiedad.precio,
          costoNoches,
          costoLimpieza,
          costoServicio,
          total
        }
      };
      
      localStorage.setItem('reservaActiva', JSON.stringify(reserva));
      
      mostrarNotificacion('success', '¡Excelente Elección!', 
        `<strong>${propiedad.titulo}</strong><br>
        Fechas: ${formatearFecha(fechaEntrada.value)} - ${formatearFecha(fechaSalida.value)}<br>
        Total: ${formatearPrecio(total)}<br><br>
        Procede a completar tu reserva.`, 
        () => {
          window.location.href = 'confirmacion.html';
        }
      );
    });
  }
}

function initMiniCalendario(propiedad) {
  const miniCalendario = document.getElementById('mini-calendario');
  
  if (!miniCalendario) return;
  
  const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const disponibilidad = propiedad.disponibilidad;
  const claves = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'];
  
  let html = '<table style="width: 100%; text-align: center; border-collapse: collapse;">';
  html += '<thead><tr>';
  dias.forEach(dia => {
    html += `<th style="padding: 8px; font-size: 12px;">${dia}</th>`;
  });
  html += '</tr></thead><tbody><tr>';
  
  claves.forEach((clave, idx) => {
    const disponible = disponibilidad[clave];
    const color = disponible ? '#d4edda' : '#f8d7da';
    const texto = disponible ? '✓' : '✗';
    const titulo = disponible ? 'Disponible' : 'Ocupado';
    
    html += `<td style="padding: 10px; background-color: ${color}; cursor: pointer;" title="${titulo}">${texto}</td>`;
  });
  
  html += '</tr></tbody></table>';
  miniCalendario.innerHTML = html;
}

// ============================================================
// CONFIRMACION.HTML - Confirmación de Reserva
// ============================================================

function initConfirmacionPage() {
  const reserva = JSON.parse(localStorage.getItem('reservaActiva'));
  
  const seccionFormulario = document.getElementById('seccion-formulario-huesped');
  const seccionSinReserva = document.getElementById('seccion-sin-reserva');
  const seccionExito = document.getElementById('seccion-exito');
  const resumenReserva = document.getElementById('resumen-reserva');
  
  if (!reserva) {
    if (seccionFormulario) seccionFormulario.hidden = true;
    if (seccionSinReserva) seccionSinReserva.hidden = false;
    if (seccionExito) seccionExito.hidden = true;
    if (resumenReserva) resumenReserva.hidden = true;
    return;
  }
  
  if (seccionFormulario) seccionFormulario.hidden = false;
  if (seccionSinReserva) seccionSinReserva.hidden = true;
  if (seccionExito) seccionExito.hidden = true;
  if (resumenReserva) resumenReserva.hidden = true;
  
  cargarMiniResumen(reserva);
  initFormularioHuesped(reserva);
}

function cargarMiniResumen(reserva) {
  const miniImg = document.getElementById('mini-img-propiedad');
  const miniTitulo = document.getElementById('mini-titulo-propiedad');
  const miniFechas = document.getElementById('mini-fechas');
  const miniTotal = document.getElementById('mini-total');
  
  if (miniImg) {
    miniImg.src = reserva.propiedad.imagen;
    miniImg.alt = reserva.propiedad.titulo;
  }
  
  if (miniTitulo) {
    miniTitulo.textContent = reserva.propiedad.titulo;
  }
  
  if (miniFechas) {
    const fechaEntradaFormateada = formatearFecha(reserva.fechaEntrada);
    const fechaSalidaFormateada = formatearFecha(reserva.fechaSalida);
    miniFechas.textContent = `${fechaEntradaFormateada} - ${fechaSalidaFormateada} · ${reserva.noches} noche${reserva.noches > 1 ? 's' : ''}`;
  }
  
  if (miniTotal) {
    miniTotal.textContent = `Total: ${formatearPrecio(reserva.costos.total)}`;
  }
}

function initFormularioHuesped(reserva) {
  const btnConfirmar = document.getElementById('btn-confirmar-reserva');
  
  if (!btnConfirmar) return;
  
  btnConfirmar.addEventListener('click', () => {
    const nombre = document.getElementById('input-nombre-huesped').value.trim();
    const email = document.getElementById('input-email-huesped').value.trim();
    const telefono = document.getElementById('input-telefono-huesped').value.trim();
    const terminos = document.getElementById('check-terminos').checked;
    const solicitudes = document.getElementById('textarea-solicitudes')?.value.trim() || '';
    
    const errorConfirmacion = document.getElementById('error-confirmacion');
    
    if (!nombre || !email || !telefono || !terminos) {
      if (errorConfirmacion) errorConfirmacion.hidden = false;
      mostrarNotificacion('warning', 'Campos Requeridos', 'Por favor completa todos los campos y acepta los términos y condiciones.');
      return;
    }
    
    if (!isValidEmail(email)) {
      mostrarNotificacion('error', 'Email Inválido', 'Por favor ingresa un correo electrónico válido.');
      return;
    }
    
    if (!isValidPhone(telefono)) {
      mostrarNotificacion('error', 'Teléfono Inválido', 'Por favor ingresa un número de teléfono válido (mínimo 10 dígitos).');
      return;
    }
    
    if (errorConfirmacion) errorConfirmacion.hidden = true;
    
    const codigoReserva = generarCodigoReserva();
    
    const reservaCompleta = {
      ...reserva,
      huesped: {
        nombre,
        email,
        telefono,
        solicitudes
      },
      codigo: codigoReserva,
      fechaConfirmacion: new Date().toISOString()
    };
    
    localStorage.setItem('reservaConfirmada', JSON.stringify(reservaCompleta));
    localStorage.removeItem('reservaActiva');
    
    mostrarConfirmacion(reservaCompleta);
    
    mostrarNotificacion('success', '¡Reserva Confirmada!', 
      `<strong>Código: ${codigoReserva}</strong><br><br>
      <strong>${reservaCompleta.propiedad.titulo}</strong><br>
      ${formatearFecha(reservaCompleta.fechaEntrada)} - ${formatearFecha(reservaCompleta.fechaSalida)}<br>
      ${reservaCompleta.noches} noche(s) · ${reservaCompleta.huespedes} huésped(es)<br><br>
      <strong>Total: ${formatearPrecio(reservaCompleta.costos.total)}</strong><br><br>
      Te enviamos los detalles a tu correo.`
    );
  });
}

function mostrarConfirmacion(reserva) {
  const seccionFormulario = document.getElementById('seccion-formulario-huesped');
  const seccionExito = document.getElementById('seccion-exito');
  const resumenReserva = document.getElementById('resumen-reserva');
  
  if (seccionFormulario) seccionFormulario.hidden = true;
  if (seccionExito) seccionExito.hidden = false;
  if (resumenReserva) resumenReserva.hidden = false;
  
  const setTexto = (id, texto) => {
    const el = document.getElementById(id);
    if (el) el.textContent = texto;
  };
  
  const setAttr = (id, attr, value) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, value);
  };
  
  setTexto('codigo-reserva', reserva.codigo);
  
  const resumenImg = document.getElementById('resumen-img-propiedad');
  if (resumenImg) {
    resumenImg.src = reserva.propiedad.imagen;
    resumenImg.alt = reserva.propiedad.titulo;
  }
  
  setTexto('resumen-titulo-propiedad', reserva.propiedad.titulo);
  setTexto('resumen-tipo-propiedad', reserva.propiedad.tipo);
  setTexto('resumen-direccion-propiedad', reserva.propiedad.direccion);
  
  const resumenRating = document.getElementById('resumen-rating-propiedad');
  if (resumenRating) {
    resumenRating.dataset.rating = reserva.propiedad.rating;
    setTexto('resumen-estrellas-propiedad', generarEstrellas(reserva.propiedad.rating));
    setTexto('resumen-num-resenas-propiedad', `(${reserva.propiedad.resenas} reseñas)`);
  }
  
  setTexto('resumen-fecha-entrada', formatearFechaCompleta(reserva.fechaEntrada));
  setTexto('resumen-fecha-salida', formatearFechaCompleta(reserva.fechaSalida));
  setTexto('resumen-noches', `${reserva.noches} noche${reserva.noches > 1 ? 's' : ''}`);
  setTexto('resumen-huespedes', `${reserva.huespedes} huésped${reserva.huespedes > 1 ? 'es' : ''}`);
  
  setTexto('resumen-texto-noches', `${formatearPrecio(reserva.costos.precioNoche)} x ${reserva.noches} noche${reserva.noches > 1 ? 's' : ''}`);
  setTexto('resumen-costo-noches', formatearPrecio(reserva.costos.costoNoches));
  setTexto('resumen-costo-limpieza', formatearPrecio(reserva.costos.costoLimpieza));
  setTexto('resumen-costo-servicio', formatearPrecio(reserva.costos.costoServicio));
  setTexto('resumen-costo-total', formatearPrecio(reserva.costos.total));
  
  setTexto('resumen-nombre-huesped', reserva.huesped.nombre);
  setTexto('resumen-email-huesped', reserva.huesped.email);
  setTexto('resumen-telefono-huesped', reserva.huesped.telefono);
}