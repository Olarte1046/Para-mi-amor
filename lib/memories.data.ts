export interface Memory {
    id: number;
    fileName: string;
    caption: string;
    date: string;
    sceneId: number;
    clusterId?: string; // Identifier for grouped photos
    side: 'left' | 'right' | 'center';
    foliageType: 'fern' | 'flower' | 'leaves' | 'moss';
}

export const memories: Memory[] = [
    // ACT I - El comienzo del camino
    {
        id: 1,
        fileName: 'memory_1.jpeg',
        caption: 'El vuelo que lo inició todo, o aquella tarde donde nuestros caminos empezaron a cruzarse.',
        date: 'Septiembre 2025',
        sceneId: 2,
        side: 'left',
        foliageType: 'leaves'
    },
    {
        id: 2,
        fileName: 'memory_2.jpeg',
        caption: 'Las primeras conversaciones nocturnas que se extendían por horas y horas.',
        date: 'Octubre 2025',
        sceneId: 3,
        clusterId: 'inicios',
        side: 'right',
        foliageType: 'fern'
    },
    {
        id: 3,
        fileName: 'memory_3.jpeg',
        caption: 'Tu estilo único y esos pequeños detalles de ti que me cautivaron al instante.',
        date: 'Octubre 2025',
        sceneId: 3,
        clusterId: 'inicios',
        side: 'left',
        foliageType: 'moss'
    },
    {
        id: 4,
        fileName: 'memory_4.jpeg',
        caption: 'Nuestra primera cita cultural, encontrando arte en cada rincón juntos.',
        date: 'Octubre 2025',
        sceneId: 3,
        clusterId: 'inicios',
        side: 'right',
        foliageType: 'flower'
    },
    {
        id: 5,
        fileName: 'memory_5.jpeg',
        caption: 'Las luces de colores iluminando tu mirada y contagiándome de tu energía.',
        date: 'Noviembre 2025',
        sceneId: 5,
        clusterId: 'anecdotas',
        side: 'left',
        foliageType: 'leaves'
    },
    {
        id: 6,
        fileName: 'memory_6.jpeg',
        caption: 'El primer abrazo cálido en aquellas caminatas de las noches frías.',
        date: 'Noviembre 2025',
        sceneId: 5,
        clusterId: 'anecdotas',
        side: 'right',
        foliageType: 'fern'
    },
    {
        id: 7,
        fileName: 'memory_7.jpeg',
        caption: 'Risas tontas, complicidad pura y la simple felicidad de estar acurrucados.',
        date: 'Noviembre 2025',
        sceneId: 5,
        clusterId: 'anecdotas',
        side: 'left',
        foliageType: 'moss'
    },

    // ACT II - El bosque profundo (Encuentro en Escena 6, caminan juntos desde aquí)
    {
        id: 8,
        fileName: 'memory_8.jpeg',
        caption: 'Tus delineados perfectos y esa mirada misteriosa que siempre me deja sin palabras.',
        date: 'Diciembre 2025',
        sceneId: 7,
        clusterId: 'bosqueprofundo',
        side: 'left',
        foliageType: 'leaves'
    },
    {
        id: 9,
        fileName: 'memory_9.jpeg',
        caption: 'Nuestras primeras aventuras a dos ruedas, sintiendo el viento y la emoción.',
        date: 'Diciembre 2025',
        sceneId: 7,
        clusterId: 'bosqueprofundo',
        side: 'right',
        foliageType: 'flower'
    },
    {
        id: 10,
        fileName: 'memory_10.jpeg',
        caption: 'Las risas a carcajadas mientras jugabas con tu pelo y el camino pasaba.',
        date: 'Diciembre 2025',
        sceneId: 7,
        clusterId: 'bosqueprofundo',
        side: 'left',
        foliageType: 'fern'
    },
    {
        id: 11,
        fileName: 'memory_11.jpeg',
        caption: 'Bajo el cielo abierto y las gorras compartidas, sintiéndonos en sintonía.',
        date: 'Diciembre 2025',
        sceneId: 7,
        clusterId: 'bosqueprofundo',
        side: 'right',
        foliageType: 'moss'
    },
    {
        id: 12,
        fileName: 'memory_19.jpeg', // The 19th moto photo
        caption: 'Nuestra fiel compañera de viajes nocturnos, la que carga con cascos y risas.',
        date: 'Diciembre 2025',
        sceneId: 7,
        clusterId: 'bosqueprofundo',
        side: 'left',
        foliageType: 'leaves'
    },
    {
        id: 13,
        fileName: 'memory_12.jpeg', // The cat photo
        caption: 'El michi consentido adueñándose de la cama y llenando las tardes de paz.',
        date: 'Enero 2026',
        sceneId: 8,
        side: 'right',
        foliageType: 'fern'
    },

    // ACT III - La recta final & Claro final
    {
        id: 14,
        fileName: 'memory_13.jpeg',
        caption: 'Un ramo de flores y mariposas para recordarte lo mucho que iluminas mi vida.',
        date: 'Febrero 2026',
        sceneId: 9,
        clusterId: 'rectafinal',
        side: 'left',
        foliageType: 'flower'
    },
    {
        id: 15,
        fileName: 'memory_14.jpeg',
        caption: 'Esa mirada de complicidad al revés y la gorra roja que te queda tan linda.',
        date: 'Febrero 2026',
        sceneId: 9,
        clusterId: 'rectafinal',
        side: 'right',
        foliageType: 'leaves'
    },
    {
        id: 16,
        fileName: 'memory_15.jpeg',
        caption: 'Incluso bajo cielos nublados y cascos de moto, rodar contigo hace que todo brille.',
        date: 'Marzo 2026',
        sceneId: 9,
        clusterId: 'rectafinal',
        side: 'left',
        foliageType: 'fern'
    },
    {
        id: 17,
        fileName: 'memory_16.jpeg',
        caption: 'Paisajes y atardeceres hermosos de Colombia, pero ninguno tan mágico como mirarte.',
        date: 'Marzo 2026',
        sceneId: 9,
        clusterId: 'rectafinal',
        side: 'right',
        foliageType: 'moss'
    },
    {
        id: 18,
        fileName: 'memory_17.jpeg',
        caption: 'Sabores, risas y pláticas en restaurantes compartidos, celebrando estar juntos.',
        date: 'Abril 2026',
        sceneId: 9,
        clusterId: 'rectafinal',
        side: 'left',
        foliageType: 'flower'
    },
    {
        id: 19,
        fileName: 'memory_18.jpeg',
        caption: 'Tu sonrisa y tu mirada de cerca, el único lugar en el mundo al que siempre quiero regresar.',
        date: 'Mayo 2026',
        sceneId: 10,
        side: 'center',
        foliageType: 'leaves'
    }
];

export interface SceneConfig {
    id: number;
    name: string;
    height: string; // Tailwind height or raw height class
    act: 1 | 2 | 3;
    description: string;
}

export const scenes: SceneConfig[] = [
    { id: 0, name: 'Portada', height: 'h-screen', act: 1, description: 'Semilla germina y título inicial' },
    { id: 1, name: 'Primeros pasos', height: 'min-h-[120vh]', act: 1, description: 'Caminata introductoria por el bosque' },
    { id: 2, name: 'Primer recuerdo', height: 'min-h-[100vh]', act: 1, description: 'El vuelo inicial' },
    { id: 3, name: 'Inicios del viaje', height: 'min-h-[160vh]', act: 1, description: 'Primer cluster de fotos' },
    { id: 4, name: 'Camino silvestre', height: 'min-h-[120vh]', act: 1, description: 'Ramas, piedras y charcos' },
    { id: 5, name: 'Anécdotas divertidas', height: 'min-h-[160vh]', act: 1, description: 'Segundo cluster de fotos' },
    { id: 6, name: 'El encuentro', height: 'min-h-[120vh]', act: 2, description: 'Aparición del Pikmin de roca acompañante' },
    { id: 7, name: 'El bosque profundo', height: 'min-h-[220vh]', act: 2, description: 'Fotos en pareja, luciérnagas y follaje' },
    { id: 8, name: 'Recuerdo destacado', height: 'min-h-[100vh]', act: 2, description: 'El michi consentido' },
    { id: 9, name: 'La recta final', height: 'min-h-[240vh]', act: 3, description: 'Último cluster amplio antes del claro' },
    { id: 10, name: 'El claro final', height: 'min-h-[120vh]', act: 3, description: 'Ambos sentados viendo el último recuerdo' },
    { id: 11, name: 'Cierre y la propuesta', height: 'h-screen', act: 3, description: 'Pregunta central y celebración interactiva' }
];
