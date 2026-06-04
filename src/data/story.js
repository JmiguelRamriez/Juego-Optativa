export const characters = {
  'Martín': { color: '#ff6b35', label: 'Martín Vargas' },
  'Valeria': { color: '#c9a96e', label: 'Valeria' },
  'Raúl': { color: '#b84a4a', label: 'Raúl Vargas' },
  'María': { color: '#6ba3c9', label: 'María Vargas' },
  'Agente': { color: '#6b6b8a', label: 'Agente' },
};

export const endings = {
  a_traicion: {
    title: 'Ruta A — Traicionado',
    description: 'Las herramientas no reciben agradecimientos.',
    text: 'Fuiste leal. Entregaste todo. Y cuando el polvo se asentó, la familia ya había hecho su trato.\n\nMateo les devolvió su vida. Ellos te dejaron aquí.\n\nNo hay venganza. No hay justicia. Solo el eco de tus pasos en un callejón vacío.\n\nLas herramientas no reciben agradecimientos. Solo se desechan.',
  },
  a_alterado: {
    title: 'Ruta A — La Historia Cambió',
    description: 'Algunas revoluciones necesitan a alguien que diga no.',
    text: 'No ganaste. Pero tampoco perdiste del todo.\n\nEl plan de Raúl colapsó. Los inhibidores fallaron. El golpe se deshizo antes de empezar.\n\nMaría escapó. La verdad salió. Y aunque nadie te lo agradecerá, sabes que elegiste bien.\n\nAlgunas revoluciones no necesitan héroes. Necesitan alguien que diga "no".',
  },
  a_culpable: {
    title: 'Ruta A — El Precio',
    description: 'El trato fue justo. La culpa no entiende de justicia.',
    text: 'Entraste a Nueva Tenochtitlán. Las calles limpias, el aire filtrado.\n\nAhora eres uno de ellos.\n\nPero en las noches, cuando el viento trae el olor de la Zona Costera, te preguntas qué perdiste.\n\nEl trato fue justo. La culpa no entiende de justicia.',
  },
  b_vendido: {
    title: 'Ruta B — Vendido',
    description: 'Salvaste tu vida. Perdiste un lugar al que pertenecer.',
    text: 'El gobierno te recompensó. Un pase, una casa, un nombre nuevo.\n\nNueva Tenochtitlán te recibió con los brazos abiertos.\n\nPero la Zona Costera sigue ahí. Los mineros que prometiste ayudar siguen bajo tierra.\n\nSalvaste tu vida. Pero perdiste algo que no sabías que tenías: un lugar al que pertenecer.',
  },
  b_justo: {
    title: 'Ruta B — El Justo',
    description: 'La Zona Costera no olvida a los suyos.',
    text: 'Negociaste hasta el final. No por ti — por ellos.\n\nLos mineros recibieron agua, médicos, promesas. El gobierno cumplió.\n\nPero el precio de la justicia es alto. El agente no te dejó ir.\n\nEn una cuneta de la Zona Costera, los tuyos te recordarán.\n\nA veces, eso es suficiente.',
  },
  c_salvador: {
    title: 'Ruta C — La Semilla',
    description: 'La verdad pesó más que el poder.',
    text: 'María cruzó la frontera. Con documentos falsos, con tu dinero, con tu historia.\n\nLa prensa la encontró. Contó todo: los tratos, las traiciones, los nombres.\n\nRaúl cayó. La verdad pesó más que su poder.\n\n{nombre} volvió a su puesto. Más pobre. Pero más entero.\n\nLa Zona Costera no olvida a los que se quedan.',
  },
  c_neutro: {
    title: 'Ruta C — El Silencio',
    description: 'Algunas decisiones no matan. Solo pesan.',
    text: 'Dijiste que no. Dos veces: a Raúl y a María.\n\nTu zona sobrevivió. Los purificadores funcionan. El agua corre.\n\nPero María fue devuelta a su familia. Y cuando la revolución cayó, ella cayó con ella.\n\nLa Zona Costera sigue igual. {nombre} también.\n\nAlgunas decisiones no matan. Solo pesan.',
  },
};

export const story = {
  start: {
    bg: 'bg_mercado',
    scene: 'Callejón del Cobre — Zona Costera, 2080',
    lines: [
      { speaker: null, text: 'El cielo ya no tiene color. Solo capas de smog y el resplandor naranja de una ciudad que no es para ti.' },
      { speaker: null, text: 'Tu puesto en el Callejón del Cobre es un desastre de cables, piezas robadas y tecnología sin sello. Eres el que consigue lo imposible.' },
      { speaker: null, text: 'Nueva Tenochtitlán brilla arriba. Abajo, en la Zona Costera, el polvo se mezcla con la lluvia ácida y la gente sobrevive como puede.' },
      { speaker: null, text: 'Llevas años acá. No tienes nombre en los registros. Pero en el mercado negro, {nombre} es suficiente.' },
      { speaker: null, text: 'Pasos sobre el concreto mojado. Martín Vargas entra sin saludar, la ropa cara pero gastada.' },
      { speaker: 'Martín', text: 'Necesito tecnología militar. Inhibidores de señal, armas electrónicas. Mi padre va a tomar la ciudad.' },
      { speaker: 'Martín', text: 'Necesitamos a alguien sin historial. Alguien que no le importe a nadie. Alguien como tú.' },
      { speaker: null, text: 'Detrás de él, un letrero de neón parpadea entre el polvo y el smog.' },
    ],
    choices: [
      { text: 'Ayudar a los Vargas', nextNode: 'A1_reunion', route: 'A' },
      { text: 'Vender la información al gobierno', nextNode: 'B1_gobierno', route: 'B' },
      { text: 'Rechazar a Martín — mantenerte al margen', nextNode: 'C1_represalias', route: 'C' },
    ],
  },

  // ─── RUTA A ─────────────────────────────────────────────

  A1_reunion: {
    bg: 'bg_departamento',
    scene: 'Departamento Vargas — Culiacán, Zona Costera',
    lines: [
      { speaker: null, text: 'No hay mansión. No hay lujo. Solo un departamento pequeño en un edificio de concreto, con un foco que parpadea y cables sueltos en las paredes.' },
      { speaker: null, text: 'Valeria te recibe con una sonrisa medida. Viste ropa barata, pero su mirada sigue siendo la de alguien que dio órdenes.' },
      { speaker: 'Valeria', text: 'Martín dice que eres útil. Yo necesito verte a los ojos para decidir.' },
      { speaker: null, text: 'Raúl entra. Está más delgado que en las fotos. Pero sus ojos tienen el mismo fuego.' },
      { speaker: 'Raúl', text: 'Perdí todo. Pero voy a recuperarlo. Y tú vas a ayudarme.' },
      { speaker: 'Raúl', text: 'El mundo no cambia por justicia. Cambia por conveniencia. Y en este momento, tu conveniencia soy yo.' },
      { speaker: null, text: 'El silencio se llena con el zumbido de la calle.' },
    ],
    choices: [
      { text: 'Continuar', nextNode: 'A2_maria' },
    ],
  },

  A2_maria: {
    bg: 'bg_mercado',
    scene: 'Callejón del Cobre — 3 AM',
    lines: [
      { speaker: null, text: 'Aparece una noche. Sin avisar. Sin miedo.' },
      { speaker: null, text: 'María Vargas. La hija menor. Catorce años y los ojos más viejos que su padre.' },
      { speaker: 'María', text: 'Mi papá no quiere cambiar el país. Quiere recuperar su sillón. Y va a usar a todos para conseguirlo.' },
      { speaker: 'María', text: '{nombre}, si lo ayudás, vas a cargar con las muertes. Si no lo ayudás, también.' },
      { speaker: null, text: 'Te mira como si ya supiera tu respuesta.' },
      { speaker: 'María', text: 'Yo no quiero ser parte de esto. Pero sola no puedo.' },
    ],
    choices: [
      { text: 'Ayudarla a sabotear a su padre', nextNode: 'A3_sabotaje', setFlags: { ayudar_maria: true } },
      { text: 'Rechazarla — cerrar los ojos', nextNode: 'A3_revolucion', setFlags: { ayudar_maria: false } },
    ],
  },

  A3_sabotaje: {
    bg: 'bg_almacen',
    scene: 'Día del Ataque — Almacén de los Vargas',
    lines: [
      { speaker: null, text: 'El día llega. El aire está cargado de polvo y tensión.' },
      { speaker: null, text: 'María te espera entre cajas de inhibidores. Sus manos tiemblan pero su voz no.' },
      { speaker: 'María', text: 'Si alteramos esto, no hay ataque. Mi padre cae solo. Y nadie tiene que morir.' },
      { speaker: null, text: 'El plan de Raúl está en tus manos. Las fichas del dominó.' },
    ],
    choices: [
      { text: 'Ejecutar el sabotaje — detener la masacre', nextNode: 'A4_alterado', setFlags: { sabotaje: true } },
      { text: 'Traicionarla — decírselo a Raúl', nextNode: 'A4_traicion', setFlags: { sabotaje: false } },
    ],
  },

  A3_revolucion: {
    bg: 'bg_accion',
    scene: 'Día del Ataque — Puesto de Mando',
    lines: [
      { speaker: null, text: 'El día llega. Nubes de polvo naranja cubren la ciudad.' },
      { speaker: 'Raúl', text: 'Hoy cambia todo. Y tú, {nombre}, vas a estar ahí.' },
      { speaker: null, text: 'Martín te pone un arma en la mano. El metal está caliente.' },
      { speaker: 'Martín', text: '¿Vas al frente o te quedás atrás como los que no tienen sangre?' },
    ],
    choices: [
      { text: 'Ir al frente con Martín', nextNode: 'A4_traicion', setFlags: { ir_frente: true } },
      { text: 'Quedarte en retaguardia operando las comunicaciones', nextNode: 'A4_culpable', setFlags: { ir_frente: false } },
    ],
  },

  A4_alterado: {
    bg: 'bg_postgolpe',
    scene: 'Después del Sabotaje',
    lines: [
      { speaker: null, text: 'Los inhibidores fallan en el momento exacto. Las comunicaciones se cortan. El ataque se fragmenta.' },
      { speaker: 'María', text: 'Terminó. Todo terminó.' },
      { speaker: null, text: 'Raúl huye. La orden de arresto llega antes que él.' },
      { speaker: null, text: 'María y tú desaparecen entre el smog. Nadie los busca. Nadie los encuentra.' },
      { speaker: null, text: 'El golpe se deshizo. Y en el centro vacío de lo que no pasó, queda la certeza de que hicieron lo correcto.' },
    ],
    ending: true,
    endingType: 'a_alterado',
  },

  A4_traicion: {
    bg: 'bg_accion',
    scene: 'Después del Ataque',
    lines: [
      { speaker: null, text: 'Bellas Artes cae. Las pantallas muestran a Raúl con la bandera.' },
      { speaker: null, text: 'Horas después, una llamada. Mateo y Raúl, solos en una sala.' },
      { speaker: null, text: 'El trato se cierra: la vida que tenían antes. Todo vuelve a ser como era.' },
      { speaker: null, text: 'La revolución se deshace como polvo en el viento. La gente vuelve a las minas.' },
      { speaker: null, text: 'Te dan las gracias. Y la puerta. Tu puesto ya no existe. {nombre} tampoco.' },
    ],
    ending: true,
    endingType: 'a_traicion',
  },

  A4_culpable: {
    bg: 'bg_accion',
    scene: 'El Trato',
    lines: [
      { speaker: null, text: 'Desde la retaguardia ves todo: las órdenes, los códigos, las mentiras.' },
      { speaker: null, text: 'El golpe funciona. Y cuando el polvo se asienta, un mensaje llega.' },
      { speaker: null, text: '"Te necesito del otro lado. Elegí bien." — Mateo.' },
      { speaker: null, text: 'El pase a Nueva Tenochtitlán está sobre la mesa. Pesado. Cálido.' },
    ],
    ending: true,
    endingType: 'a_culpable',
  },

  // ─── RUTA B ─────────────────────────────────────────────

  B1_gobierno: {
    bg: 'bg_palacio',
    scene: 'Palacio de Bellas Artes — Sede del Gobierno',
    lines: [
      { speaker: null, text: 'El Palacio es frío. Mármol blanco y luces blancas. Todo demasiado limpio.' },
      { speaker: null, text: 'Te hacen esperar tres horas. Después llega. Traje gris, mirada gris.' },
      { speaker: 'Agente', text: 'Raúl Vargas es una sombra. Pero las sombras también matan.' },
      { speaker: null, text: 'Pone un objeto sobre la mesa. Un libro viejo, encuadernado en cuero gastado.' },
      { speaker: 'Agente', text: 'Libro Lector de Verdades. No falla. No negocia. Te dice todo lo que Raúl oculta.' },
      { speaker: 'Agente', text: 'A cambio: nombres, fechas, coordenadas. Todo lo que tenés.' },
      { speaker: null, text: 'El libro te mira desde la mesa.' },
    ],
    choices: [
      { text: 'Continuar', nextNode: 'B2_pruebas' },
    ],
  },

  B2_pruebas: {
    bg: 'bg_almacen',
    scene: 'Zona Costera — Entre Sombras',
    lines: [
      { speaker: null, text: 'Tenés el libro. Tenés el plan. Solo falta la prueba.' },
      { speaker: null, text: 'Raúl se mueve entre departamentos viejos y reuniones en la oscuridad.' },
      { speaker: null, text: 'Dos caminos: el libro si lo enfrentás cara a cara. O los registros de los inhibidores.' },
    ],
    choices: [
      { text: 'Usar el Libro Lector — enfrentar a Raúl', nextNode: 'B3_oferta', setFlags: { usar_libro: true } },
      { text: 'Robar los datos de los inhibidores de Martín', nextNode: 'B3_oferta', setFlags: { usar_libro: false } },
    ],
  },

  B3_oferta: {
    bg: 'bg_palacio',
    scene: 'Oficina del Agente',
    lines: [
      { speaker: null, text: 'La prueba está sobre la mesa. El agente la revisa sin emoción.' },
      { speaker: 'Agente', text: 'Suficiente. Mateo te agradece.' },
      { speaker: null, text: 'Pausa.' },
      { speaker: 'Agente', text: 'Pero acá no hay héroes. Solo transacciones.' },
      { speaker: null, text: 'Sobre la mesa, dos documentos. Tu pase a Nueva Tenochtitlán. O la protección para los mineros.' },
      { speaker: 'Agente', text: 'Elegí. Rápido.' },
    ],
    choices: [
      { text: 'Aceptar el pase a Nueva Tenochtitlán', nextNode: 'B4_vendido', setFlags: { negocio: false } },
      { text: 'Negociar protección para los mineros', nextNode: 'B4_justo', setFlags: { negocio: true } },
    ],
  },

  B4_vendido: {
    bg: 'bg_nt_ideal',
    scene: 'Nueva Tenochtitlán — Zona Ideal',
    lines: [
      { speaker: null, text: 'Nueva Tenochtitlán es todo lo que prometieron. Calles sin polvo. Aire filtrado.' },
      { speaker: null, text: 'Raúl cae. Los Vargas desaparecen.' },
      { speaker: null, text: 'Te dan una casa. Un nombre nuevo. Un pasado limpio.' },
      { speaker: null, text: 'Pero cada noche, cuando el viento cambia, el olor de la Zona Costera llega hasta acá.' },
    ],
    ending: true,
    endingType: 'b_vendido',
  },

  B4_justo: {
    bg: 0x2a1a0a,
    scene: 'Zona Costera — Campamento Minero',
    lines: [
      { speaker: null, text: 'El acuerdo se firmó. Agua, médicos, escuelas. Los mineros lo tienen todo.' },
      { speaker: null, text: 'Pero el agente no perdona.' },
      { speaker: 'Agente', text: 'Demasiado ruido para un contrabandista. Nos hiciste visibles.' },
      { speaker: null, text: 'Tu cuerpo aparece en una cuneta tres días después.' },
      { speaker: null, text: 'Los mineros ponen una cruz sin nombre. No saben cómo te llamabas.' },
      { speaker: null, text: 'Pero la Zona Costera aprende a recordar a los suyos.' },
    ],
    ending: true,
    endingType: 'b_justo',
  },

  // ─── RUTA C ─────────────────────────────────────────────

  C1_represalias: {
    bg: 'bg_mercado',
    scene: 'Callejón del Cobre',
    lines: [
      { speaker: null, text: 'Martín se va sin hablar. Pero su silencio ya lo dijo todo.' },
      { speaker: null, text: 'Tres días después los camiones dejan de llegar. El agua se corta. Los purificadores fallan.' },
      { speaker: null, text: 'Tu zona huele a sed y a polvo. Los vecinos murmuran. Saben que algo pasó, pero no qué.' },
      { speaker: null, text: 'Un mensaje sin remitente: "Las decisiones tienen costos." — V.' },
    ],
    choices: [
      { text: 'Continuar', nextNode: 'C2_maria' },
    ],
  },

  C2_maria: {
    bg: 'bg_mercado',
    scene: 'Callejón del Cobre — Noche',
    lines: [
      { speaker: null, text: 'Aparece al anochecer. Sin bolso, sin teléfono, sin plan.' },
      { speaker: 'María', text: 'Me fui. No pienso volver nunca.' },
      { speaker: null, text: 'Tiene catorce años. Pero su mirada ya conoce las traiciones de los adultos.' },
      { speaker: 'María', text: 'Si me entregás, te devuelven todo. Agua, suministros, protección.' },
      { speaker: 'María', text: '{nombre}... solo quiero que sepas que la decisión es tuya.' },
      { speaker: null, text: 'Tiembla. No por frío.' },
    ],
    choices: [
      { text: 'Ayudarla a escapar de la Zona', nextNode: 'C3_salvador', setFlags: { ayudar_maria: true } },
      { text: 'Rechazarla — no puedes cargar con ella', nextNode: 'C3_neutro', setFlags: { ayudar_maria: false } },
    ],
  },

  C3_salvador: {
    bg: 'bg_postgolpe',
    scene: 'Frontera — Amanecer',
    lines: [
      { speaker: null, text: 'María cruza al amanecer. Con documentos falsos, con tu dinero, con tu historia.' },
      { speaker: null, text: 'Detrás, el polvo de la Zona Costera se levanta como un telón.' },
      { speaker: 'María', text: 'No te olvido, {nombre}. Te lo prometo.' },
      { speaker: null, text: 'Volvés a tu puesto. Vacío. Pero tuyo.' },
      { speaker: null, text: 'Meses después, la prensa internacional publica una entrevista. María cuenta todo.' },
      { speaker: null, text: 'Raúl cae. La verdad, esta vez, ganó.' },
    ],
    ending: true,
    endingType: 'c_salvador',
  },

  C3_neutro: {
    bg: 'bg_postgolpe',
    scene: 'Callejón del Cobre — Después',
    lines: [
      { speaker: null, text: 'María se va sin mirar atrás. Dos días después, los hombres de Raúl se la llevan.' },
      { speaker: null, text: '"Fue devuelta con su familia". El parte oficial no dice más.' },
      { speaker: null, text: 'Tu zona sobrevive. Los purificadores funcionan. El agua corre.' },
      { speaker: null, text: 'Pero en las noches, cuando el silencio aprieta, el eco de sus pasos se queda.' },
      { speaker: null, text: '{nombre} sabe que hay decisiones que no matan. Solo pesan.' },
    ],
    ending: true,
    endingType: 'c_neutro',
  },
};
