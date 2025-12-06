
export const provinces = [
  { value: "pinar_del_rio", label: "Pinar del Río" },
  { value: "artemisa", label: "Artemisa" },
  { value: "la_habana", label: "La Habana" },
  { value: "mayabeque", label: "Mayabeque" },
  { value: "matanzas", label: "Matanzas" },
  { value: "cienfuegos", label: "Cienfuegos" },
  { value: "villa_clara", label: "Villa Clara" },
  { value: "sancti_spiritus", label: "Sancti Spíritus" },
  { value: "ciego_de_avila", label: "Ciego de Ávila" },
  { value: "camaguey", label: "Camagüey" },
  { value: "las_tunas", label: "Las Tunas" },
  { value: "granma", label: "Granma" },
  { value: "holguin", label: "Holguín" },
  { value: "santiago_de_cuba", label: "Santiago de Cuba" },
  { value: "guantanamo", label: "Guantánamo" },
  { value: "isla_de_la_juventud", label: "Isla de la Juventud" },
];

export const municipalities: { [key: string]: { value: string; label: string }[] } = {
  pinar_del_rio: [
    { value: 'pinar_del_rio', label: 'Pinar del Río' },
    { value: 'consolacion_del_sur', label: 'Consolación del Sur' },
    { value: 'guane', label: 'Guane' },
    { value: 'la_palma', label: 'La Palma' },
    { value: 'los_palacios', label: 'Los Palacios' },
    { value: 'mantua', label: 'Mantua' },
    { value: 'minas_de_matahambre', label: 'Minas de Matahambre' },
    { value: 'san_juan_y_martinez', label: 'San Juan y Martínez' },
    { value: 'san_luis', label: 'San Luis' },
    { value: 'sandino', label: 'Sandino' },
    { value: 'vinales', label: 'Viñales' }
  ],
  artemisa: [
    { value: 'artemisa', label: 'Artemisa' },
    { value: 'alquizar', label: 'Alquízar' },
    { value: 'bauta', label: 'Bauta' },
    { value: 'caimito', label: 'Caimito' },
    { value: 'guanajay', label: 'Guanajay' },
    { value: 'guira_de_melena', label: 'Güira de Melena' },
    { value: 'mariel', label: 'Mariel' },
    { value: 'san_antonio_de_los_banos', label: 'San Antonio de los Baños' },
    { value: 'san_cristobal', label: 'San Cristóbal' }
  ],
  la_habana: [
    { value: 'plaza_de_la_revolucion', label: 'Plaza de la Revolución' },
    { value: 'la_habana_vieja', label: 'La Habana Vieja' },
    { value: 'centro_habana', label: 'Centro Habana' },
    { value: 'playa', label: 'Playa' },
    { value: 'marianao', label: 'Marianao' },
    { value: 'la_lisa', label: 'La Lisa' },
    { value: 'boyeros', label: 'Boyeros' },
    { value: 'arroyo_naranjo', label: 'Arroyo Naranjo' },
    { value: 'san_miguel_del_padron', label: 'San Miguel del Padrón' },
    { value: 'diez_de_octubre', label: 'Diez de Octubre' },
    { value: 'cerro', label: 'Cerro' },
    { value: 'cotorro', label: 'Cotorro' },
    { value: 'guanabacoa', label: 'Guanabacoa' },
    { value: 'regla', label: 'Regla' },
    { value: 'la_habana_del_este', label: 'La Habana del Este' }
  ],
  mayabeque: [
    { value: 'san_jose_de_las_lajas', label: 'San José de las Lajas' },
    { value: 'batabano', label: 'Batabanó' },
    { value: 'bejuco', label: 'Bejuco' },
    { value: 'guines', label: 'Güines' },
    { value: 'jaruco', label: 'Jaruco' },
    { value: 'madruga', label: 'Madruga' },
    { value: 'melena_del_sur', label: 'Melena del Sur' },
    { value: 'nueva_paz', label: 'Nueva Paz' },
    { value: 'quivican', label: 'Quivicán' },
    { value: 'san_nicolas', label: 'San Nicolás' },
    { value: 'santa_cruz_del_norte', label: 'Santa Cruz del Norte' }
  ],
  matanzas: [
    { value: 'matanzas', label: 'Matanzas' },
    { value: 'cardenas', label: 'Cárdenas' },
    { value: 'varadero', label: 'Varadero' },
    { value: 'colon', label: 'Colón' },
    { value: 'jovellanos', label: 'Jovellanos' },
    { value: 'pedro_betancourt', label: 'Pedro Betancourt' },
    { value: 'limonar', label: 'Limonar' },
    { value: 'union_de_reyes', label: 'Unión de Reyes' },
    { value: 'ciénaga_de_zapata', label: 'Ciénaga de Zapata' },
    { value: 'calimete', label: 'Calimete' },
    { value: 'los_arabos', label: 'Los Arabos' },
    { value: 'marti', label: 'Martí' },
    { value: 'perico', label: 'Perico' },
    { value: 'jagüey_grande', label: 'Jagüey Grande' }
  ],
  cienfuegos: [
    { value: 'cienfuegos', label: 'Cienfuegos' },
    { value: 'aguanieves', label: 'Aguanieve' },
    { value: 'cruces', label: 'Cruces' },
    { value: 'cumanayagua', label: 'Cumanayagua' },
    { value: 'lajas', label: 'Lajas' },
    { value: 'palmira', label: 'Palmira' },
    { value: 'rodas', label: 'Rodas' }
  ],
  villa_clara: [
    { value: 'santa_clara', label: 'Santa Clara' },
    { value: 'caibarien', label: 'Caibarién' },
    { value: 'camajuani', label: 'Camajuaní' },
    { value: 'cifuentes', label: 'Cifuentes' },
    { value: 'corralillo', label: 'Corralillo' },
    { value: 'encrucijada', label: 'Encrucijada' },
    { value: 'manicaragua', label: 'Manicaragua' },
    { value: 'placetas', label: 'Placetas' },
    { value: 'quemado_de_guines', label: 'Quemado de Güines' },
    { value: 'ranchuelo', label: 'Ranchuelo' },
    { value: 'remedios', label: 'Remedios' },
    { value: 'sagua_la_grande', label: 'Sagua la Grande' },
    { value: 'santo_domingo', label: 'Santo Domingo' }
  ],
  sancti_spiritus: [
    { value: 'sancti_spiritus', label: 'Sancti Spíritus' },
    { value: 'cabaiguan', label: 'Cabaiguán' },
    { value: 'fomento', label: 'Fomento' },
    { value: 'jatibonico', label: 'Jatibonico' },
    { value: 'la_sierpe', label: 'La Sierpe' },
    { value: 'taguasco', label: 'Taguasco' },
    { value: 'trinidad', label: 'Trinidad' },
    { value: 'yaguajay', label: 'Yaguajay' }
  ],
  ciego_de_avila: [
    { value: 'ciego_de_avila', label: 'Ciego de Ávila' },
    { value: 'baragua', label: 'Baraguá' },
    { value: 'bolivia', label: 'Bolivia' },
    { value: 'chambas', label: 'Chambas' },
    { value: 'ciro_redondo', label: 'Ciro Redondo' },
    { value: 'florencia', label: 'Florencia' },
    { value: 'majagua', label: 'Majagua' },
    { value: 'moron', label: 'Morón' },
    { value: 'primero_de_enero', label: 'Primero de Enero' },
    { value: 'venezuela', label: 'Venezuela' }
  ],
  camaguey: [
    { value: 'camaguey', label: 'Camagüey' },
    { value: 'carlos_m_de_cespedes', label: 'Carlos M. de Céspedes' },
    { value: 'esmeralda', label: 'Esmeralda' },
    { value: 'florida', label: 'Florida' },
    { value: 'guaimaro', label: 'Guáimaro' },
    { value: 'jimaguayu', label: 'Jimaguayú' },
    { value: 'minas', label: 'Minas' },
    { value: 'najas', label: 'Najas' },
    { value: 'santa_cruz_del_sur', label: 'Santa Cruz del Sur' },
    { value: 'sibanicu', label: 'Sibanicú' },
    { value: 'sierra_de_cubitas', label: 'Sierra de Cubitas' },
    { value: 'vertientes', label: 'Vertientes' }
  ],
  las_tunas: [
    { value: 'las_tunas', label: 'Las Tunas' },
    { value: 'amancio', label: 'Amancio' },
    { value: 'colombia', label: 'Colombia' },
    { value: 'jesus_menendez', label: 'Jesús Menéndez' },
    { value: 'jobabo', label: 'Jobabo' },
    { value: 'majibacoa', label: 'Majibacoa' },
    { value: 'manati', label: 'Manatí' },
    { value: 'puerto_padre', label: 'Puerto Padre' }
  ],
  granma: [
    { value: 'bayamo', label: 'Bayamo' },
    { value: 'bartolome_maso', label: 'Bartolomé Masó' },
    { value: 'buey_arriba', label: 'Buey Arriba' },
    { value: 'campechuela', label: 'Campechuela' },
    { value: 'cauto_cristo', label: 'Cauto Cristo' },
    { value: 'guisa', label: 'Guisa' },
    { value: 'jiguani', label: 'Jiguaní' },
    { value: 'manzanillo', label: 'Manzanillo' },
    { value: 'media_luna', label: 'Media Luna' },
    { value: 'niquero', label: 'Niquero' },
    { value: 'pilon', label: 'Pilón' },
    { value: 'rio_cauto', label: 'Río Cauto' },
    { value: 'yara', label: 'Yara' }
  ],
  holguin: [
    { value: 'holguin', label: 'Holguín' },
    { value: 'antilla', label: 'Antilla' },
    { value: 'baguanos', label: 'Báguanos' },
    { value: 'banes', label: 'Banes' },
    { value: 'cacocum', label: 'Cacocum' },
    { value: 'calixto_garcia', label: 'Calixto García' },
    { value: 'cueto', label: 'Cueto' },
    { value: 'frank_pais', label: 'Frank País' },
    { value: 'gibara', label: 'Gibara' },
    { value: 'mayari', label: 'Mayarí' },
    { value: 'moa', label: 'Moa' },
    { value: 'rafael_freyre', label: 'Rafael Freyre' },
    { value: 'sagua_de_tanamo', label: 'Sagua de Tánamo' },
    { value: 'urbano_noris', label: 'Urbano Noris' }
  ],
  santiago_de_cuba: [
    { value: 'santiago_de_cuba', label: 'Santiago de Cuba' },
    { value: 'contramaestre', label: 'Contramaestre' },
    { value: 'guama', label: 'Guamá' },
    { value: 'maimon', label: 'Maimón' },
    { value: 'palma_soriano', label: 'Palma Soriano' },
    { value: 'san_luis', label: 'San Luis' },
    { value: 'segundo_frente', label: 'Segundo Frente' },
    { value: 'songo_la_maya', label: 'Songo-La Maya' },
    { value: 'tercer_frente', label: 'Tercer Frente' }
  ],
  guantanamo: [
    { value: 'guantanamo', label: 'Guantánamo' },
    { value: 'baracoa', label: 'Baracoa' },
    { value: 'caimanera', label: 'Caimanera' },
    { value: 'el_salvador', label: 'El Salvador' },
    { value: 'imias', label: 'Imías' },
    { value: 'maisi', label: 'Maisí' },
    { value: 'manuel_tames', label: 'Manuel Tames' },
    { value: 'niceto_perez', label: 'Niceto Pérez' },
    { value: 'san_antonio_del_sur', label: 'San Antonio del Sur' },
    { value: 'yateras', label: 'Yateras' }
  ],
  isla_de_la_juventud: [
    { value: 'isla_de_la_juventud', label: 'Isla de la Juventud' },
  ],
};

// Matriz de distancia aproximada entre municipios de una misma provincia.
// El valor es un factor de "costo" o "distancia", no necesariamente km. Menor es mejor.
export const municipalityDistances: { [province: string]: { [municipality: string]: { [neighbor: string]: number } } } = {
  la_habana: {
    plaza_de_la_revolucion: { plaza_de_la_revolucion: 0, centro_habana: 1, cerro: 1, playa: 2, la_habana_vieja: 2, diez_de_octubre: 3, marianao: 3 },
    playa: { playa: 0, marianao: 1, la_lisa: 2, plaza_de_la_revolucion: 2, cerro: 3 },
    centro_habana: { centro_habana: 0, la_habana_vieja: 1, plaza_de_la_revolucion: 1, cerro: 2 },
    la_habana_vieja: { la_habana_vieja: 0, centro_habana: 1, regla: 2, san_miguel_del_padron: 3, diez_de_octubre: 3 },
    cerro: { cerro: 0, plaza_de_la_revolucion: 1, centro_habana: 2, diez_de_octubre: 2, boyeros: 3, arroyo_naranjo: 3 },
    // ... y así sucesivamente para todos los municipios de La Habana
  },
  matanzas: {
    matanzas: { matanzas: 0, cardenas: 1, limonar: 1, varadero: 2 },
    cardenas: { cardenas: 0, matanzas: 1, varadero: 1, jovellanos: 2 },
    varadero: { varadero: 0, cardenas: 1, matanzas: 2 },
    // ... y así sucesivamente para todos los municipios de Matanzas
  },
  //... y así sucesivamente para todas las provincias
};
