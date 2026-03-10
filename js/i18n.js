/**
 * NorthPalace - Sistema de traducción e internacionalización
 * Extraído desde script.js para organizar mejor el código.
 */

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
  // Descripciones largas de detalle (antes que "Centro Histórico" para que se reemplacen enteras)
  ['Moderno apartamento en el corazón del Centro Histórico de Chihuahua. Ideal para turistas que quieren explorar la ciudad a pie. A pasos de la Catedral y el Palacio de Gobierno.', 'Modern apartment in the heart of Chihuahua\'s Historic Downtown. Ideal for tourists who want to explore the city on foot. Just steps from the Cathedral and Government Palace.'],
  ['Hermosa casa en el exclusivo Fraccionamiento Campestre, perfecta para familias. Cuenta con amplios espacios, jardín privado y todas las comodidades para una estancia placentera en Chihuahua.', 'Beautiful house in the exclusive Campestre subdivision, perfect for families. It has spacious areas, a private garden, and all the amenities for a pleasant stay in Chihuahua.'],
  ['Espectacular residencia con alberca privada y vista panorámica de la ciudad. Casa de lujo con acabados de primera, perfecta para eventos especiales o vacaciones familiares.', 'Spectacular residence with a private pool and panoramic city views. Luxury house with top-quality finishes, perfect for special events or family vacations.'],
  ['Apartamento contemporáneo con diseño moderno y todas las amenidades. Excelente ubicación cerca de restaurantes y comercios.', 'Contemporary apartment with modern design and all amenities. Excellent location near restaurants and shops.'],
  ['Casa familiar con amplio jardín, perfecta para quienes viajan con mascotas. Ambiente tranquilo y acogedor.', 'Family house with a large garden, perfect for those traveling with pets. Quiet and welcoming atmosphere.'],
  ['Lujoso penthouse con terraza y vista espectacular. Acabados de lujo y ubicación premium en la Zona Dorada de Chihuahua.', 'Luxury penthouse with terrace and spectacular views. Luxury finishes and premium location in Chihuahua\'s Zona Dorada.'],
  ['Casa familiar con alberca privada en fraccionamiento cerrado. Ideal para reuniones familiares y celebraciones.', 'Family house with private pool in a gated community. Ideal for family gatherings and celebrations.'],
  ['Estudio económico y funcional, perfecto para viajeros solos o parejas. Bien ubicado y con todas las comodidades básicas.', 'Affordable, functional studio, perfect for solo travelers or couples. Well located with all basic amenities.'],
  
  // Títulos de propiedades
  ['Casa en Frac. Campestre', 'House in Frac. Campestre'],
  ['Apartamento en el Centro Histórico', 'Apartment in Historic Downtown'],
  ['Casa residencial en El Mirador', 'Residential House in El Mirador'],
  ['Apartamento moderno en San Felipe', 'Modern Apartment in San Felipe'],
  ['Casa amplia en Las Granjas', 'Spacious House in Las Granjas'],
  ['Penthouse en Zona Dorada', 'Penthouse in Zona Dorada'],
  ['Casa en Quintas del Sol', 'House in Quintas del Sol'],
  ['Estudio en Col. Industrial', 'Studio in Col. Industrial'],
  
  // Reseñas (contador y cierre paréntesis; "Reseñas de huéspedes" se trata aparte en traducirPagina)
  ['reseñas)', 'reviews)'],
  ['reseñas', 'reviews'],
  
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
  ['No fumar', 'No smoking'],
  ['No fiestas', 'No parties'],
  ['Check-in después de 2 PM', 'Check-in after 2 PM'],
  ['Check-out antes de 11 AM', 'Check-out before 11 AM'],
  
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
  ['Aún no hay reseñas para esta propiedad. ¡Sé el primero en dejar una!', 'There are no reviews for this property yet. Be the first to leave one!'],
  ['Disponibilidad (próximos 7 días)', 'Availability (next 7 days)'],
  
  // Notificaciones y ventanas flotantes
  ['Recuperar Contraseña', 'Recover Password'],
  ['Te enviaremos un enlace de recuperación a tu correo electrónico.', 'We will send a recovery link to your email.'],
  ['Campo Requerido', 'Required Field'],
  ['Email Inválido', 'Invalid Email'],
  ['Contraseña Corta', 'Password Too Short'],
  ['Teléfono Inválido', 'Invalid Phone Number'],
  ['Contraseñas No Coinciden', 'Passwords Do Not Match'],
  ['Términos Requeridos', 'Terms Required'],
  ['Campos Incompletos', 'Incomplete Fields'],
  ['Campos Vacíos', 'Empty Fields'],
  ['Límite de Huéspedes', 'Guest Limit'],
  ['Fechas Inválidas', 'Invalid Dates'],
  ['Fechas ocupadas', 'Dates Already Booked'],
  ['Algunas de las fechas seleccionadas ya están reservadas. Revisa el calendario de disponibilidad y elige otras fechas.', 'Some of the selected dates are already booked. Check the availability calendar and choose other dates.'],
  ['Esas fechas se solapan con una reserva existente. Elige otras fechas.', 'Those dates overlap with an existing booking. Please choose different dates.'],
  ['Reserva añadida', 'Booking Added'],
  ['La reserva se ha añadido al calendario.', 'The booking has been added to the calendar.'],
  ['Cancelar reserva', 'Cancel Booking'],
  ['¿Eliminar esta reserva del calendario?', 'Delete this booking from the calendar?'],
  ['¿Eliminar esta reserva confirmada? Se borrarán todos los datos de la reserva.', 'Delete this confirmed booking? All booking data will be removed.'],
  ['Reserva cancelada', 'Booking Cancelled'],
  ['La reserva ha sido eliminada correctamente.', 'The booking has been successfully removed.'],
  ['Tu reserva pendiente ha sido cancelada. Puedes elegir otra propiedad cuando quieras.', 'Your pending booking has been cancelled. You can choose another property whenever you like.'],
  ['¡Reseña Publicada!', 'Review Published!'],
  ['Gracias por tu reseña. Se ha publicado correctamente.', 'Thanks for your review. It has been published successfully.'],
  ['¡Propiedad Enviada!', 'Listing Submitted!'],
  ['Tu propiedad ha sido enviada para revisión. Nos pondremos en contacto contigo pronto.', 'Your property has been submitted for review. We\'ll contact you soon.'],
  ['¡Suscrito!', 'Subscribed!'],
  ['Gracias por suscribirte a nuestro newsletter. Recibirás las mejores ofertas.', 'Thanks for subscribing to our newsletter. You\'ll receive the best deals.'],
  ['¡Bienvenido!', 'Welcome!'],
  ['Has iniciado sesión correctamente como', 'You have successfully signed in as'],
  ['¡Cuenta Creada!', 'Account Created!'],
  ['Bienvenido a NorthPalace,', 'Welcome to NorthPalace,'],
  ['Términos y condiciones', 'Terms and Conditions'],
  ['Disponibilidad de ', 'Availability for '],
  ['No hay reservas en ', 'No bookings in '],
  ['Reservas en ', 'Bookings in '],
  ['Frente a la Plaza de Armas', 'In front of Plaza de Armas'],
  
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
  ['Buscar', 'Search']
];

// ============================================================
// CATÁLOGOS POR IDIOMA (ES → EN) Y HELPER t()
// ============================================================

// Construimos catálogos de traducción a partir de la tabla de pares.
// Usamos el texto original en español como "clave" única.
const catalogos = {
  es: {},
  en: {}
};

traducciones.forEach(([es, en]) => {
  catalogos.es[es] = es;
  catalogos.en[es] = en;
});

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

/**
 * Devuelve el texto traducido según el idioma actual.
 * La clave es el texto original en español.
 */
function t(clave) {
  const lang = idiomaActual || localStorage.getItem('idioma') || 'es';
  const bundle = catalogos[lang] || catalogos.es;
  return bundle[clave] || clave;
}

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
        background: ${idiomaActual === 'es' ? 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' : '#f0f0f0'};
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
        background: ${idiomaActual === 'en' ? 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' : '#f0f0f0'};
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
    btnEs.style.background = idioma === 'es' ? 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' : '#f0f0f0';
    btnEs.style.color = idioma === 'es' ? 'white' : '#333';
    btnEn.style.background = idioma === 'en' ? 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' : '#f0f0f0';
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
    // No traducir nada dentro de contenedores marcados como no traducibles (por ejemplo, reseñas de usuarios)
    if (el.closest('[data-no-translate="true"]')) {
      return;
    }
    // No traducir direcciones completas
    if (el.tagName === 'ADDRESS') {
      return;
    }
    
    // Guardar texto original si no existe
    if (!el.dataset.textoOriginal) {
      el.dataset.textoOriginal = el.innerHTML;
    }
    
    let textoActual = el.innerHTML;
    
    // Caso especial: título de sección de reseñas para evitar mezclas como "Reseñas de guests"
    if (textoActual.trim() === 'Reseñas de huéspedes') {
      textoActual = 'Guest Reviews';
    } else {
      // 1) Traducciones normales (frases completas primero; así "Ver propiedad" → "View Property")
      traducciones.forEach(([es, en]) => {
        if (textoActual.includes(es)) {
          textoActual = textoActual.split(es).join(en);
        }
      });
    }
    
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
  return t(texto);
}

function formatearPrecioIdioma(precio) {
  if (idiomaActual === 'en') {
    const precioUsd = Math.round(precio / TIPO_CAMBIO_USD);
    return '$' + precioUsd.toLocaleString('en-US') + ' USD';
  }
  return '$' + precio.toLocaleString('es-MX');
}

