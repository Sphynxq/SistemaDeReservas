/**
 * NorthPalace - Sistema de Reservas
 * JavaScript principal para todas las páginas
 */

document.addEventListener('DOMContentLoaded', () => {
  initTooltips();
  initNewsletter();
  initModalesAuth();
  crearEstilosModales();
  initTerminosModal();
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

    .terminos-modal-box {
      max-width: 560px;
      width: 92%;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
    }
    .terminos-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #eee;
      background: #f8f9fa;
    }
    .terminos-modal-header h2 {
      margin: 0;
      font-size: 1.25rem;
      color: #333;
    }
    .terminos-modal-cerrar {
      background: none;
      border: none;
      font-size: 1.75rem;
      line-height: 1;
      color: #666;
      cursor: pointer;
      padding: 0 4px;
    }
    .terminos-modal-cerrar:hover {
      color: #333;
    }
    .terminos-modal-body {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
      text-align: left;
    }
    .terminos-modal-body h3 {
      margin: 1em 0 0.4em;
      font-size: 1rem;
      color: #333;
    }
    .terminos-modal-body h3:first-child {
      margin-top: 0;
    }
    .terminos-modal-body p {
      margin: 0 0 0.5em;
      color: #555;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    .terminos-modal-footer {
      padding: 12px 20px;
      border-top: 1px solid #eee;
      background: #f8f9fa;
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

function mostrarModalTerminos() {
  const contenidoTerminos = `
    <h3>1. Aceptación</h3>
    <p>Al usar NorthPalace y completar una reserva usted acepta estos términos y condiciones.</p>
    <h3>2. Servicio</h3>
    <p>NorthPalace actúa como intermediario entre huéspedes y propietarios de propiedades en Chihuahua. No somos propietarios de las propiedades listadas.</p>
    <h3>3. Reservas y pagos</h3>
    <p>Las reservas quedan sujetas a disponibilidad. Los precios mostrados incluyen la tarifa por noche indicada; pueden aplicarse tarifas de limpieza y de servicio según se indique en el desglose.</p>
    <h3>4. Cancelación</h3>
    <p>El huésped puede cancelar una reserva antes de confirmarla sin cargo. Una vez confirmada, las políticas de cancelación del anunciante aplican; NorthPalace puede aplicar cargos según dichas políticas.</p>
    <h3>5. Check-in y check-out</h3>
    <p>El horario de entrada y salida será el indicado en cada propiedad (por ejemplo: check-in a partir de las 15:00, check-out antes de las 12:00).</p>
    <h3>6. Uso de la propiedad</h3>
    <p>El huésped se compromete a usar la propiedad de forma responsable, respetando las normas de la casa y las leyes aplicables.</p>
    <h3>7. Privacidad</h3>
    <p>Los datos personales se tratan conforme a nuestra política de privacidad y solo para gestionar reservas y comunicación con el usuario.</p>
    <h3>8. Contacto</h3>
    <p>Para dudas o incidencias: NorthPalace, Chihuahua, Chih., México.</p>
  `;

  const overlay = document.createElement('div');
  overlay.className = 'notificacion-overlay terminos-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Términos y condiciones');
  overlay.innerHTML = `
    <div class="notificacion-box terminos-modal-box">
      <div class="terminos-modal-header">
        <h2>Términos y condiciones</h2>
        <button type="button" class="terminos-modal-cerrar" aria-label="Cerrar">×</button>
      </div>
      <div class="terminos-modal-body">${contenidoTerminos}</div>
      <div class="terminos-modal-footer">
        <button type="button" class="notificacion-btn info terminos-btn-cerrar">Cerrar</button>
      </div>
    </div>
  `;

  const cerrar = () => {
    overlay.style.animation = 'fadeIn 0.2s ease reverse';
    setTimeout(() => overlay.remove(), 200);
  };

  overlay.querySelector('.terminos-modal-cerrar').addEventListener('click', cerrar);
  overlay.querySelector('.terminos-btn-cerrar').addEventListener('click', cerrar);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cerrar();
  });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      cerrar();
      document.removeEventListener('keydown', escHandler);
    }
  });

  document.body.appendChild(overlay);
}

function initTerminosModal() {
  document.querySelectorAll('.link-terminos-modal').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarModalTerminos();
    });
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
  const tbody = document.getElementById('tabla-disponibilidad-body');
  const theadDias = document.querySelectorAll('#tabla-disponibilidad thead th.tabla-disp-dia');
  if (!tbody || !theadDias.length) return;

  const colonias = { 1: 'Campestre', 2: 'Centro', 3: 'El Mirador', 4: 'San Felipe', 5: 'Las Granjas', 6: 'Zona Dorada', 7: 'Quintas del Sol', 8: 'Industrial' };
  const diasNombres = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const fechas = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() + i);
    fechas.push(d);
  }

  theadDias.forEach((th, i) => {
    const d = fechas[i];
    th.textContent = `${diasNombres[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
    th.title = d.toISOString().split('T')[0];
  });

  tbody.innerHTML = propiedadesData.map(prop => {
    const fechaStrs = fechas.map(d => d.toISOString().split('T')[0]);
    const celdas = fechaStrs.map(fs => {
      const ocupado = isDiaOcupado(prop.id, fs);
      return `<td class="${ocupado ? 'disp-ocupado' : 'disp-disponible'}" title="${ocupado ? 'Ocupado' : 'Disponible'}">${ocupado ? 'Ocupado' : 'Disponible'}</td>`;
    }).join('');
    const colonia = colonias[prop.id] || prop.zona || '—';
    return `<tr id="disp-prop-${prop.id}"><td>${prop.titulo}</td><td>${colonia}</td>${celdas}</tr>`;
  }).join('');

  tbody.querySelectorAll('.disp-disponible').forEach(td => {
    td.style.backgroundColor = '#d4edda';
    td.style.color = '#155724';
  });
  tbody.querySelectorAll('.disp-ocupado').forEach(td => {
    td.style.backgroundColor = '#f8d7da';
    td.style.color = '#721c24';
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
    if (linkResenas) linkResenas.textContent = `(${propiedad.resenas} ${traducir('reseñas')})`;
  }
  
  setTexto('prop-descripcion-texto', traducir(propiedad.descripcion));
  
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
    setTexto('reserva-num-resenas', `(${propiedad.resenas} ${traducir('reseñas')})`);
  }
  
  setTexto('calificacion-general', propiedad.rating.toFixed(1));
  setTexto('total-resenas', `${propiedad.resenas} ${traducir('reseñas')}`);
  
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

/**
 * Actualiza el estado visual de las estrellas de valoración (1-5).
 * @param {HTMLElement} contenedor - Elemento #estrellas-interactivas
 * @param {number} valor - Número de estrellas a marcar como activas (0-5)
 */
function pintarEstrellasResena(contenedor, valor) {
  if (!contenedor) return;
  const estrellas = contenedor.querySelectorAll('.estrella-seleccionable');
  const n = Math.max(0, Math.min(5, parseInt(valor, 10) || 0));
  estrellas.forEach((e) => {
    const v = parseInt(e.dataset.valor, 10);
    e.classList.toggle('activa', v <= n);
  });
}

function initResenasDetalle(propiedad) {
  const estrellasInteractivas = document.getElementById('estrellas-interactivas');
  const inputCalificacion = document.getElementById('input-calificacion-resena');
  const btnEnviar = document.getElementById('btn-enviar-resena');

  if (estrellasInteractivas) {
    const estrellas = estrellasInteractivas.querySelectorAll('.estrella-seleccionable');

    estrellasInteractivas.addEventListener('mouseleave', () => {
      const seleccion = parseInt(estrellasInteractivas.dataset.seleccion, 10) || 0;
      pintarEstrellasResena(estrellasInteractivas, seleccion);
    });

    estrellas.forEach((estrella) => {
      estrella.addEventListener('mouseenter', () => {
        const valor = parseInt(estrella.dataset.valor, 10);
        pintarEstrellasResena(estrellasInteractivas, valor);
      });

      estrella.addEventListener('click', (e) => {
        e.preventDefault();
        const valor = parseInt(estrella.dataset.valor, 10);
        estrellasInteractivas.dataset.seleccion = String(valor);
        if (inputCalificacion) inputCalificacion.value = String(valor);
        pintarEstrellasResena(estrellasInteractivas, valor);
      });

      estrella.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          estrella.click();
        }
      });
    });

    pintarEstrellasResena(estrellasInteractivas, 0);
  }

  if (btnEnviar) {
    btnEnviar.addEventListener('click', () => {
      const autor = document.getElementById('input-autor-resena').value.trim();
      const calificacion = parseInt(inputCalificacion?.value, 10) || 0;
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
      pintarEstrellasResena(estrellasInteractivas, 0);

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
  
  // Marcar contenedor de reseñas para que el sistema de traducción NO modifique el texto de los usuarios
  listaResenas.dataset.noTranslate = 'true';
  
  if (propiedad.resenasData.length === 0) {
    listaResenas.innerHTML = '<p>' + traducir('Aún no hay reseñas para esta propiedad. ¡Sé el primero en dejar una!') + '</p>';
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
  const errorReserva = document.getElementById('error-reserva');
  const errorFechas = document.getElementById('error-fechas');
  const panelReserva = document.getElementById('panel-reserva');
  const campoEntrada = document.getElementById('reserva-campo-entrada');
  const campoSalida = document.getElementById('reserva-campo-salida');
  const campoHuespedes = document.getElementById('reserva-campo-huespedes');

  const aplicarErrorCampo = (el) => {
    if (!el) return;
    el.style.border = '2px solid #c00';
    el.style.borderRadius = '4px';
  };
  const quitarErrorCampo = (el) => {
    if (!el) return;
    el.style.border = '';
    el.style.borderRadius = '';
  };
  const quitarTodosErroresReserva = () => {
    if (errorReserva) errorReserva.hidden = true;
    if (errorFechas) errorFechas.hidden = true;
    quitarErrorCampo(campoEntrada);
    quitarErrorCampo(campoSalida);
    quitarErrorCampo(campoHuespedes);
  };

  // Establecer fecha de entrada en el día actual y salida = entrada + 1 para desglose visible
  const hoy = new Date().toISOString().split('T')[0];
  if (fechaEntrada) {
    fechaEntrada.value = hoy;
    fechaEntrada.min = hoy;
  }
  if (fechaSalida) {
    fechaSalida.min = hoy;
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    fechaSalida.value = manana.toISOString().split('T')[0];
  }

  if (inputHuespedes) {
    inputHuespedes.max = propiedad.huespedes;
    inputHuespedes.value = 1;
  }

  const calcularCosto = () => {
    quitarTodosErroresReserva();

    if (!fechaEntrada?.value || !fechaSalida?.value) {
      limpiarDesglose();
      return;
    }

    if (new Date(fechaSalida.value) <= new Date(fechaEntrada.value)) {
      if (errorFechas) errorFechas.hidden = false;
      aplicarErrorCampo(campoEntrada);
      aplicarErrorCampo(campoSalida);
      limpiarDesglose();
      return;
    }

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

  // Desglose visible desde el inicio
  calcularCosto();

  if (btnReservar) {
    btnReservar.addEventListener('click', () => {
      quitarTodosErroresReserva();

      if (!fechaEntrada?.value || !fechaSalida?.value || !inputHuespedes?.value) {
        if (errorReserva) errorReserva.hidden = false;
        if (!fechaEntrada?.value) aplicarErrorCampo(campoEntrada);
        if (!fechaSalida?.value) aplicarErrorCampo(campoSalida);
        if (!inputHuespedes?.value) aplicarErrorCampo(campoHuespedes);
        if (panelReserva) panelReserva.scrollIntoView({ behavior: 'smooth', block: 'center' });
        mostrarNotificacion('warning', 'Campos Incompletos', 'Por favor selecciona las fechas y el número de huéspedes antes de reservar.');
        return;
      }

      if (new Date(fechaSalida.value) <= new Date(fechaEntrada.value)) {
        if (errorFechas) errorFechas.hidden = false;
        aplicarErrorCampo(campoEntrada);
        aplicarErrorCampo(campoSalida);
        if (panelReserva) panelReserva.scrollIntoView({ behavior: 'smooth', block: 'center' });
        mostrarNotificacion('error', 'Fechas Inválidas', 'La fecha de salida debe ser posterior a la fecha de entrada.');
        return;
      }

      const huespedes = parseInt(inputHuespedes.value, 10);
      if (huespedes > propiedad.huespedes) {
        aplicarErrorCampo(campoHuespedes);
        if (panelReserva) panelReserva.scrollIntoView({ behavior: 'smooth', block: 'center' });
        mostrarNotificacion('warning', 'Límite de Huéspedes', `Esta propiedad tiene un máximo de ${propiedad.huespedes} huéspedes.`);
        return;
      }

      if (haySolapamientoReserva(propiedad.id, fechaEntrada.value, fechaSalida.value)) {
        aplicarErrorCampo(campoEntrada);
        aplicarErrorCampo(campoSalida);
        if (panelReserva) panelReserva.scrollIntoView({ behavior: 'smooth', block: 'center' });
        mostrarNotificacion('error', 'Fechas ocupadas', 'Algunas de las fechas seleccionadas ya están reservadas. Revisa el calendario de disponibilidad y elige otras fechas.');
        return;
      }

      const textoOriginal = btnReservar.textContent;
      btnReservar.textContent = 'Reservando...';
      btnReservar.disabled = true;

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

      btnReservar.textContent = textoOriginal;
      btnReservar.disabled = false;
    });
  }
}

function initMiniCalendario(propiedad) {
  const contenedor = document.getElementById('mini-calendario');
  const acciones = document.getElementById('calendario-reservas-acciones');
  const listaReservas = document.getElementById('lista-reservas-calendario');
  const btnAnadir = document.getElementById('btn-anadir-reserva-calendario');

  if (!contenedor) return;

  const propiedadId = propiedad.id;
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mesActual = hoy.getMonth();
  const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const diasSemana = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

  function renderizarCalendarioAnual() {
    const h3Titulo = document.querySelector('#disponibilidad-rapida h3');
    if (h3Titulo) h3Titulo.textContent = `Disponibilidad de ${nombresMeses[mesActual]} ${anio}`;

    const mes = mesActual;
    const primerDia = new Date(anio, mes, 1);
    const ultimoDia = new Date(anio, mes + 1, 0);
    const numDias = ultimoDia.getDate();
    const inicioSemana = primerDia.getDay();

    let html = '<div class="calendario-anual-grid">';
    html += `<div class="calendario-mes">
      <div class="calendario-mes-titulo">${nombresMeses[mes]} ${anio}</div>
      <table class="calendario-mes-tabla"><thead><tr>`;
    diasSemana.forEach(d => { html += `<th>${d}</th>`; });
    html += '</tr></thead><tbody><tr>';

    let col = 0;
    for (let i = 0; i < inicioSemana; i++) {
      html += '<td class="calendario-dia-vacio"></td>';
      col++;
    }
    for (let dia = 1; dia <= numDias; dia++) {
      const fechaStr = `${anio}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
      const ocupado = isDiaOcupado(propiedadId, fechaStr);
      const esHoy = hoy.getFullYear() === anio && hoy.getMonth() === mes && hoy.getDate() === dia;
      let cls = 'calendario-dia';
      if (ocupado) cls += ' ocupado';
      if (esHoy) cls += ' hoy';
      html += `<td class="${cls}" title="${fechaStr}${ocupado ? ' (Ocupado)' : ' (Disponible)'}" data-fecha="${fechaStr}">${dia}</td>`;
      col++;
      if (col === 7) {
        html += '</tr><tr>';
        col = 0;
      }
    }
    while (col > 0 && col < 7) {
      html += '<td class="calendario-dia-vacio"></td>';
      col++;
    }
    html += '</tr></tbody></table></div>';
    html += '<div class="calendario-leyenda">';
    html += '<span class="calendario-leyenda-item"><span class="calendario-leyenda-cuadro disponible"></span> Disponible</span>';
    html += '<span class="calendario-leyenda-item"><span class="calendario-leyenda-cuadro ocupado"></span> Ocupado</span>';
    html += '<span class="calendario-leyenda-item"><span class="calendario-leyenda-cuadro hoy"></span> Hoy</span>';
    html += '</div>';
    html += '</div>';
    contenedor.innerHTML = html;
  }

  function formatearFechaCorta(str) {
    const d = new Date(str + 'T12:00:00');
    const opts = { day: 'numeric', month: 'short' };
    return d.toLocaleDateString('es-MX', opts);
  }

  function renderizarListaReservas() {
    const primerDiaMes = `${anio}-${String(mesActual + 1).padStart(2, '0')}-01`;
    const ultimoDiaMes = new Date(anio, mesActual + 1, 0);
    const ultimoDiaMesStr = `${anio}-${String(mesActual + 1).padStart(2, '0')}-${String(ultimoDiaMes.getDate()).padStart(2, '0')}`;

    const todasReservas = getReservasPropiedad(propiedadId);
    const reservasDelMes = todasReservas.filter(r => r.fechaEntrada <= ultimoDiaMesStr && r.fechaSalida >= primerDiaMes);
    const reservas = reservasDelMes.sort((a, b) => a.fechaEntrada.localeCompare(b.fechaEntrada));

    if (reservas.length === 0) {
      listaReservas.innerHTML = `<p class="calendario-sin-reservas">No hay reservas en ${nombresMeses[mesActual]} ${anio}.</p>`;
      return;
    }
    listaReservas.innerHTML = `<p class="calendario-lista-titulo">Reservas en ${nombresMeses[mesActual]} ${anio}:</p><ul class="calendario-lista-ul">` +
      reservas.map(r => {
        const puedeElim = puedeEliminarReserva(r);
        const est = estadoReserva(r);
        const estado = est === 'pasada' ? ' (pasada)' : est === 'en_curso' ? ' (en curso)' : '';
        return `<li class="calendario-reserva-item" data-id="${r.id}">
          ${formatearFechaCorta(r.fechaEntrada)} – ${formatearFechaCorta(r.fechaSalida)}${estado}
          ${puedeElim ? `<button type="button" class="btn-eliminar-reserva" data-id="${r.id}" aria-label="Eliminar reserva">Eliminar</button>` : ''}
        </li>`;
      }).join('') +
      '</ul>';
    listaReservas.querySelectorAll('.btn-eliminar-reserva').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const reserva = getReservasPropiedad(propiedadId).find(r => r.id === id);
        if (!reserva || !puedeEliminarReserva(reserva)) return;
        mostrarConfirmacionModal('Eliminar reserva', '¿Eliminar esta reserva del calendario?', () => {
          removeReservaPropiedad(propiedadId, id);
          renderizarCalendarioAnual();
          renderizarListaReservas();
        });
      });
    });
  }

  function abrirModalAnadirReserva() {
    const overlay = document.createElement('div');
    overlay.className = 'notificacion-overlay';
    const hoyStr = new Date().toISOString().split('T')[0];
    overlay.innerHTML = `
      <div class="notificacion-box terminos-modal-box">
        <div class="terminos-modal-header">
          <h2>Añadir reserva</h2>
          <button type="button" class="terminos-modal-cerrar" aria-label="Cerrar">×</button>
        </div>
        <div class="terminos-modal-body">
          <div class="campo-calendario-reserva">
            <label for="modal-reserva-entrada">Fecha entrada</label>
            <input type="date" id="modal-reserva-entrada" value="${hoyStr}" />
          </div>
          <div class="campo-calendario-reserva">
            <label for="modal-reserva-salida">Fecha salida</label>
            <input type="date" id="modal-reserva-salida" value="${hoyStr}" />
          </div>
          <p id="modal-reserva-error" class="calendario-modal-error" style="display:none;"></p>
        </div>
        <div class="terminos-modal-footer">
          <button type="button" class="notificacion-btn info" id="modal-reserva-guardar">Guardar</button>
          <button type="button" class="terminos-modal-cerrar-btn">Cancelar</button>
        </div>
      </div>
    `;
    const cerrar = () => {
      overlay.style.animation = 'fadeIn 0.2s ease reverse';
      setTimeout(() => overlay.remove(), 200);
    };
    overlay.querySelector('.terminos-modal-cerrar').addEventListener('click', cerrar);
    overlay.querySelector('.terminos-modal-cerrar-btn').addEventListener('click', cerrar);
    overlay.addEventListener('click', e => { if (e.target === overlay) cerrar(); });
    const ent = overlay.querySelector('#modal-reserva-entrada');
    const sal = overlay.querySelector('#modal-reserva-salida');
    const errEl = overlay.querySelector('#modal-reserva-error');
    overlay.querySelector('#modal-reserva-guardar').addEventListener('click', () => {
      const fe = ent.value;
      const fs = sal.value;
      if (!fe || !fs) {
        errEl.textContent = 'Indica entrada y salida.';
        errEl.style.display = 'block';
        return;
      }
      if (new Date(fs) <= new Date(fe)) {
        errEl.textContent = 'La fecha de salida debe ser posterior a la de entrada.';
        errEl.style.display = 'block';
        return;
      }
      if (haySolapamientoReserva(propiedadId, fe, fs)) {
        errEl.textContent = 'Esas fechas se solapan con una reserva existente. Elige otras fechas.';
        errEl.style.display = 'block';
        return;
      }
      addReservaPropiedad(propiedadId, fe, fs);
      cerrar();
      renderizarCalendarioAnual();
      renderizarListaReservas();
      mostrarNotificacion('success', 'Reserva añadida', 'La reserva se ha añadido al calendario.');
    });
    document.body.appendChild(overlay);
  }

  renderizarCalendarioAnual();
  renderizarListaReservas();
  if (btnAnadir) btnAnadir.addEventListener('click', abrirModalAnadirReserva);
}

// ============================================================
// CONFIRMACION.HTML - Confirmación de Reserva
// ============================================================

function initConfirmacionPage() {
  const reservaActiva = JSON.parse(localStorage.getItem('reservaActiva'));
  const reservaConfirmada = JSON.parse(localStorage.getItem('reservaConfirmada'));

  const seccionFormulario = document.getElementById('seccion-formulario-huesped');
  const seccionSinReserva = document.getElementById('seccion-sin-reserva');
  const seccionExito = document.getElementById('seccion-exito');
  const resumenReserva = document.getElementById('resumen-reserva');
  const btnCancelarPendiente = document.getElementById('btn-cancelar-reserva-pendiente');
  const btnCancelarCompletada = document.getElementById('btn-cancelar-reserva-completada');

  const mostrarSinReserva = () => {
    if (seccionFormulario) seccionFormulario.hidden = true;
    if (seccionSinReserva) seccionSinReserva.hidden = false;
    if (seccionExito) seccionExito.hidden = true;
    if (resumenReserva) resumenReserva.hidden = true;
  };

  if (reservaConfirmada) {
    if (seccionFormulario) seccionFormulario.hidden = true;
    if (seccionSinReserva) seccionSinReserva.hidden = true;
    if (seccionExito) seccionExito.hidden = false;
    if (resumenReserva) resumenReserva.hidden = false;
    mostrarConfirmacion(reservaConfirmada);
    if (btnCancelarCompletada) {
      btnCancelarCompletada.onclick = () => {
        mostrarConfirmacionModal(
          'Cancelar reserva',
          '¿Eliminar esta reserva confirmada? Se borrarán todos los datos de la reserva.',
          () => {
            localStorage.removeItem('reservaConfirmada');
            mostrarSinReserva();
            mostrarNotificacion('info', 'Reserva cancelada', 'La reserva ha sido eliminada correctamente.');
          }
        );
      };
    }
    return;
  }

  if (!reservaActiva) {
    mostrarSinReserva();
    return;
  }

  if (seccionFormulario) seccionFormulario.hidden = false;
  if (seccionSinReserva) seccionSinReserva.hidden = true;
  if (seccionExito) seccionExito.hidden = true;
  if (resumenReserva) resumenReserva.hidden = true;

  if (btnCancelarPendiente) {
    btnCancelarPendiente.onclick = () => {
      mostrarConfirmacionModal(
        'Cancelar reserva',
        '¿Seguro que quieres cancelar? Se borrarán los datos de tu reserva y tendrás que volver a elegir propiedad y fechas.',
        () => {
          localStorage.removeItem('reservaActiva');
          mostrarSinReserva();
          mostrarNotificacion('info', 'Reserva cancelada', 'Tu reserva pendiente ha sido cancelada. Puedes elegir otra propiedad cuando quieras.');
        }
      );
    };
  }

  cargarMiniResumen(reservaActiva);
  initFormularioHuesped(reservaActiva);
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
  const campoNombre = document.getElementById('campo-nombre-huesped');
  const campoEmail = document.getElementById('campo-email-huesped');
  const campoTelefono = document.getElementById('campo-telefono-huesped');
  const campoTerminos = document.getElementById('campo-terminos');
  const inputNombre = document.getElementById('input-nombre-huesped');
  const inputEmail = document.getElementById('input-email-huesped');
  const inputTelefono = document.getElementById('input-telefono-huesped');
  const checkTerminos = document.getElementById('check-terminos');
  const errorConfirmacion = document.getElementById('error-confirmacion');

  const aplicarErrorCampoConfirmacion = (el) => {
    if (!el) return;
    el.style.border = '2px solid #c00';
    el.style.borderRadius = '4px';
  };
  const quitarErrorCampoConfirmacion = (el) => {
    if (!el) return;
    el.style.border = '';
    el.style.borderRadius = '';
  };
  const quitarTodosErroresConfirmacion = () => {
    if (errorConfirmacion) errorConfirmacion.hidden = true;
    quitarErrorCampoConfirmacion(campoNombre);
    quitarErrorCampoConfirmacion(campoEmail);
    quitarErrorCampoConfirmacion(campoTelefono);
    quitarErrorCampoConfirmacion(campoTerminos);
  };

  if (inputNombre) {
    inputNombre.addEventListener('input', () => quitarErrorCampoConfirmacion(campoNombre));
    inputNombre.addEventListener('change', () => quitarErrorCampoConfirmacion(campoNombre));
  }
  if (inputEmail) {
    inputEmail.addEventListener('input', () => quitarErrorCampoConfirmacion(campoEmail));
    inputEmail.addEventListener('change', () => quitarErrorCampoConfirmacion(campoEmail));
  }
  if (inputTelefono) {
    inputTelefono.addEventListener('input', () => quitarErrorCampoConfirmacion(campoTelefono));
    inputTelefono.addEventListener('change', () => quitarErrorCampoConfirmacion(campoTelefono));
  }
  if (checkTerminos) {
    checkTerminos.addEventListener('change', () => quitarErrorCampoConfirmacion(campoTerminos));
  }

  if (!btnConfirmar) return;

  btnConfirmar.addEventListener('click', () => {
    const nombre = inputNombre?.value.trim() || '';
    const email = inputEmail?.value.trim() || '';
    const telefono = inputTelefono?.value.trim() || '';
    const terminos = checkTerminos?.checked || false;
    const solicitudes = document.getElementById('textarea-solicitudes')?.value.trim() || '';

    quitarTodosErroresConfirmacion();

    if (!nombre || !email || !telefono || !terminos) {
      if (errorConfirmacion) errorConfirmacion.hidden = false;
      const primerError = !nombre ? campoNombre : !email ? campoEmail : !telefono ? campoTelefono : campoTerminos;
      if (!nombre) aplicarErrorCampoConfirmacion(campoNombre);
      if (!email) aplicarErrorCampoConfirmacion(campoEmail);
      if (!telefono) aplicarErrorCampoConfirmacion(campoTelefono);
      if (!terminos) aplicarErrorCampoConfirmacion(campoTerminos);
      if (primerError) primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      mostrarNotificacion('warning', 'Campos Requeridos', 'Por favor completa todos los campos y acepta los términos y condiciones.');
      return;
    }

    if (!isValidEmail(email)) {
      aplicarErrorCampoConfirmacion(campoEmail);
      campoEmail?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      mostrarNotificacion('error', 'Email Inválido', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!isValidPhone(telefono)) {
      aplicarErrorCampoConfirmacion(campoTelefono);
      campoTelefono?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      mostrarNotificacion('error', 'Teléfono Inválido', 'Por favor ingresa un número de teléfono válido (mínimo 10 dígitos).');
      return;
    }

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

    setTimeout(() => {
      const seccionExito = document.getElementById('seccion-exito');
      if (seccionExito) seccionExito.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

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
    setTexto('resumen-num-resenas-propiedad', `(${reserva.propiedad.resenas} ${traducir('reseñas')})`);
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

  const btnCancelarCompletada = document.getElementById('btn-cancelar-reserva-completada');
  const seccionSinReserva = document.getElementById('seccion-sin-reserva');
  if (btnCancelarCompletada) {
    btnCancelarCompletada.onclick = () => {
      mostrarConfirmacionModal(
        'Cancelar reserva',
        '¿Eliminar esta reserva confirmada? Se borrarán todos los datos de la reserva.',
        () => {
          localStorage.removeItem('reservaConfirmada');
          if (seccionFormulario) seccionFormulario.hidden = true;
          if (seccionSinReserva) seccionSinReserva.hidden = false;
          if (seccionExito) seccionExito.hidden = true;
          if (resumenReserva) resumenReserva.hidden = true;
          mostrarNotificacion('info', 'Reserva cancelada', 'La reserva ha sido eliminada correctamente.');
        }
      );
    };
  }
}