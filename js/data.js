/**
 * NorthPalace - Datos de propiedades y reservas
 * Extraído desde script.js para organizar mejor el código.
 */

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
    imagen: 'Imagenes/Casa Campestre.jpg',
    imagenes: ['Imagenes/Casa Campestre.jpg'],
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
    imagen: 'Imagenes/Apatamento Centro Histórico.jpg',
    imagenes: ['Imagenes/Apatamento Centro Histórico.jpg'],
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
    imagen: 'Imagenes/Casa el Mirador.jpg',
    imagenes: ['Imagenes/Casa el Mirador.jpg'],
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
    imagen: 'Imagenes/Apartamento San Felipe.jpeg',
    imagenes: ['Imagenes/Apartamento San Felipe.jpeg'],
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
    imagen: 'Imagenes/Casa las Granjas.jfif',
    imagenes: ['Imagenes/Casa las Granjas.jfif'],
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
    imagen: 'Imagenes/Penthouse Zona Dorada.jpg',
    imagenes: ['Imagenes/Penthouse Zona Dorada.jpg'],
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
    imagen: 'Imagenes/Casa Quintas Sol.jpg',
    imagenes: ['Imagenes/Casa Quintas Sol.jpg'],
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
    imagen: 'Imagenes/Casa Industrial.jpg',
    imagenes: ['Imagenes/Casa Industrial.jpg'],
    descripcion: 'Estudio económico y funcional, perfecto para viajeros solos o parejas. Bien ubicado y con todas las comodidades básicas.',
    amenidades: ['WiFi', 'Aire acondicionado', 'TV', 'Cocina básica'],
    normas: ['No fumar', 'No fiestas', 'Check-in después de 2 PM'],
    referencia: 'Cerca de la central de autobuses',
    calificaciones: { limpieza: 4.2, comunicacion: 4.0, ubicacion: 4.0, valor: 4.3 },
    resenasData: [],
    disponibilidad: { lun: false, mar: true, mie: true, jue: false, vie: true, sab: true, dom: true }
  }
];

// Reservas de calendario por propiedad: hardcodeadas (se pueden eliminar solo si son futuras)
const STORAGE_CALENDARIO = 'calendarioReservas';
const STORAGE_ELIMINADOS = 'calendarioEliminados';

const reservasHardcodeadas = {
  1: [
    { id: 'h1-1', fechaEntrada: '2025-01-05', fechaSalida: '2025-01-10' },
    { id: 'h1-2', fechaEntrada: '2025-03-01', fechaSalida: '2025-03-10' },
    { id: 'h1-3', fechaEntrada: '2025-04-12', fechaSalida: '2025-04-18' },
    { id: 'h1-4', fechaEntrada: '2025-06-20', fechaSalida: '2025-06-25' },
    { id: 'h1-mar26-1', fechaEntrada: '2026-03-05', fechaSalida: '2026-03-12' },
    { id: 'h1-mar26-2', fechaEntrada: '2026-03-20', fechaSalida: '2026-03-25' }
  ],
  2: [
    { id: 'h2-1', fechaEntrada: '2025-01-15', fechaSalida: '2025-01-20' },
    { id: 'h2-2', fechaEntrada: '2025-02-10', fechaSalida: '2025-02-15' },
    { id: 'h2-3', fechaEntrada: '2025-05-01', fechaSalida: '2025-05-07' },
    { id: 'h2-mar26-1', fechaEntrada: '2026-03-01', fechaSalida: '2026-03-07' },
    { id: 'h2-mar26-2', fechaEntrada: '2026-03-15', fechaSalida: '2026-03-22' }
  ],
  3: [
    { id: 'h3-1', fechaEntrada: '2025-02-01', fechaSalida: '2025-02-08' },
    { id: 'h3-2', fechaEntrada: '2025-03-15', fechaSalida: '2025-03-22' },
    { id: 'h3-3', fechaEntrada: '2025-07-01', fechaSalida: '2025-07-10' },
    { id: 'h3-mar26-1', fechaEntrada: '2026-03-08', fechaSalida: '2026-03-14' },
    { id: 'h3-mar26-2', fechaEntrada: '2026-03-25', fechaSalida: '2026-03-31' }
  ],
  4: [
    { id: 'h4-1', fechaEntrada: '2025-01-20', fechaSalida: '2025-01-25' },
    { id: 'h4-2', fechaEntrada: '2025-04-01', fechaSalida: '2025-04-05' },
    { id: 'h4-3', fechaEntrada: '2025-08-10', fechaSalida: '2025-08-15' },
    { id: 'h4-mar26-1', fechaEntrada: '2026-03-10', fechaSalida: '2026-03-18' }
  ],
  5: [
    { id: 'h5-1', fechaEntrada: '2025-02-14', fechaSalida: '2025-02-18' },
    { id: 'h5-2', fechaEntrada: '2025-05-20', fechaSalida: '2025-05-25' },
    { id: 'h5-mar26-1', fechaEntrada: '2026-03-01', fechaSalida: '2026-03-05' },
    { id: 'h5-mar26-2', fechaEntrada: '2026-03-22', fechaSalida: '2026-03-28' }
  ],
  6: [
    { id: 'h6-1', fechaEntrada: '2025-03-20', fechaSalida: '2025-03-27' },
    { id: 'h6-2', fechaEntrada: '2025-06-01', fechaSalida: '2025-06-08' },
    { id: 'h6-3', fechaEntrada: '2025-09-01', fechaSalida: '2025-09-07' },
    { id: 'h6-mar26-1', fechaEntrada: '2026-03-12', fechaSalida: '2026-03-19' }
  ],
  7: [
    { id: 'h7-1', fechaEntrada: '2025-01-08', fechaSalida: '2025-01-12' },
    { id: 'h7-2', fechaEntrada: '2025-04-20', fechaSalida: '2025-04-25' },
    { id: 'h7-3', fechaEntrada: '2025-10-01', fechaSalida: '2025-10-06' },
    { id: 'h7-mar26-1', fechaEntrada: '2026-03-03', fechaSalida: '2026-03-09' },
    { id: 'h7-mar26-2', fechaEntrada: '2026-03-26', fechaSalida: '2026-03-31' }
  ],
  8: [
    { id: 'h8-1', fechaEntrada: '2025-02-20', fechaSalida: '2025-02-24' },
    { id: 'h8-2', fechaEntrada: '2025-05-10', fechaSalida: '2025-05-14' },
    { id: 'h8-3', fechaEntrada: '2025-11-15', fechaSalida: '2025-11-20' },
    { id: 'h8-mar26-1', fechaEntrada: '2026-03-14', fechaSalida: '2026-03-21' }
  ]
};

function getCalendarioReservas() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_CALENDARIO) || '{}');
  } catch (_) {
    return {};
  }
}

function getCalendarioEliminados() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_ELIMINADOS) || '{}');
  } catch (_) {
    return {};
  }
}

function getReservasPropiedad(propiedadId) {
  const id = Number(propiedadId);
  const hardcodeadas = (reservasHardcodeadas[id] || []).map(r => ({ ...r, esHardcodeada: true }));
  const eliminados = getCalendarioEliminados()[id] || [];
  const usuario = (getCalendarioReservas()[id] || []).map(r => ({ ...r, esHardcodeada: false }));
  return [...hardcodeadas.filter(r => !eliminados.includes(r.id)), ...usuario];
}

function isDiaOcupado(propiedadId, fechaStr) {
  const reservas = getReservasPropiedad(propiedadId);
  const d = fechaStr.replace(/-/g, '');
  return reservas.some(r => {
    const ent = r.fechaEntrada.replace(/-/g, '');
    const sal = r.fechaSalida.replace(/-/g, '');
    return d >= ent && d < sal;
  });
}

/** Devuelve true si el rango [fechaEntrada, fechaSalida) se solapa con alguna reserva existente de la propiedad. */
function haySolapamientoReserva(propiedadId, fechaEntrada, fechaSalida) {
  const reservas = getReservasPropiedad(propiedadId);
  const ent = fechaEntrada.replace(/-/g, '');
  const sal = fechaSalida.replace(/-/g, '');
  return reservas.some(r => {
    const re = r.fechaEntrada.replace(/-/g, '');
    const rs = r.fechaSalida.replace(/-/g, '');
    return ent < rs && re < sal;
  });
}

function isReservaPasadaOEnCurso(reserva) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const salida = new Date(reserva.fechaSalida);
  salida.setHours(0, 0, 0, 0);
  const entrada = new Date(reserva.fechaEntrada);
  entrada.setHours(0, 0, 0, 0);
  if (hoy > salida) return true;
  if (hoy >= entrada && hoy < salida) return true;
  return false;
}

function estadoReserva(reserva) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const salida = new Date(reserva.fechaSalida);
  salida.setHours(0, 0, 0, 0);
  const entrada = new Date(reserva.fechaEntrada);
  entrada.setHours(0, 0, 0, 0);
  if (hoy > salida) return 'pasada';
  if (hoy >= entrada && hoy < salida) return 'en_curso';
  return 'futura';
}

function puedeEliminarReserva(reserva) {
  return estadoReserva(reserva) === 'futura';
}

function addReservaPropiedad(propiedadId, fechaEntrada, fechaSalida) {
  const data = getCalendarioReservas();
  const id = Number(propiedadId);
  if (!data[id]) data[id] = [];
  const nueva = {
    id: 'u-' + Date.now(),
    fechaEntrada,
    fechaSalida
  };
  data[id].push(nueva);
  localStorage.setItem(STORAGE_CALENDARIO, JSON.stringify(data));
  return nueva;
}

function removeReservaPropiedad(propiedadId, reservaId) {
  if (String(reservaId).startsWith('u-')) {
    const data = getCalendarioReservas();
    const id = Number(propiedadId);
    if (data[id]) {
      data[id] = data[id].filter(r => r.id !== reservaId);
      localStorage.setItem(STORAGE_CALENDARIO, JSON.stringify(data));
    }
  } else {
    const elim = getCalendarioEliminados();
    const id = Number(propiedadId);
    if (!elim[id]) elim[id] = [];
    elim[id].push(reservaId);
    localStorage.setItem(STORAGE_ELIMINADOS, JSON.stringify(elim));
  }
}

