
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
    { value: 'vinales', label: 'vinales' }
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
    { value: 'manati', label: 'manati' },
    { value: 'puerto_padre', label: 'Puerto Padre' }
  ],
  granma: [
    { value: 'bayamo', label: 'Bayamo' },
    { value: 'bartolome_maso', label: 'Bartolomé Masó' },
    { value: 'buey_arriba', label: 'Buey Arriba' },
    { value: 'campechuela', label: 'Campechuela' },
    { value: 'cauto_cristo', label: 'Cauto Cristo' },
    { value: 'guisa', label: 'Guisa' },
    { value: 'jiguani', label: 'jiguani' },
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
    plaza_de_la_revolucion: {
      plaza_de_la_revolucion: 0,
      centro_habana: 1,
      cerro: 1,
      playa: 2,
      la_habana_vieja: 2,
      diez_de_octubre: 3,
      marianao: 3,
      la_lisa: 3,
      boyeros: 3,
      arroyo_naranjo: 3,
      san_miguel_del_padron: 3,
      habana_del_este: 3,
      guanabacoa: 3,
      cotorro: 3,
      regla: 3
    },
    
    playa: {
      playa: 0,
      marianao: 1,
      la_lisa: 1,
      plaza_de_la_revolucion: 2,
      cerro: 3,
      centro_habana: 3,
      la_habana_vieja: 3,
      boyeros: 3,
      diez_de_octubre: 3,
      arroyo_naranjo: 3,
      san_miguel_del_padron: 3,
      habana_del_este: 3,
      guanabacoa: 3,
      regla: 3,
      cotorro: 3
    },
    
    centro_habana: {
      centro_habana: 0,
      la_habana_vieja: 1,
      plaza_de_la_revolucion: 1,
      cerro: 1,
      regla: 2,
      san_miguel_del_padron: 2,
      diez_de_octubre: 3,
      habana_del_este: 3,
      playa: 3,
      marianao: 3,
      la_lisa: 3,
      boyeros: 3,
      arroyo_naranjo: 3,
      guanabacoa: 3,
      cotorro: 3
    },
    
    la_habana_vieja: {
      la_habana_vieja: 0,
      centro_habana: 1,
      regla: 1,
      plaza_de_la_revolucion: 2,
      cerro: 2,
      san_miguel_del_padron: 2,
      habana_del_este: 2,
      diez_de_octubre: 3,
      guanabacoa: 3,
      cotorro: 3,
      playa: 3,
      marianao: 3,
      la_lisa: 3,
      boyeros: 3,
      arroyo_naranjo: 3
    },
    
    cerro: {
      cerro: 0,
      plaza_de_la_revolucion: 1,
      centro_habana: 1,
      diez_de_octubre: 1,
      la_habana_vieja: 2,
      arroyo_naranjo: 2,
      boyeros: 2,
      san_miguel_del_padron: 2,
      playa: 3,
      marianao: 3,
      la_lisa: 3,
      habana_del_este: 3,
      guanabacoa: 3,
      cotorro: 3
    },
    
    diez_de_octubre: {
      diez_de_octubre: 0,
      cerro: 1,
      centro_habana: 2,
      plaza_de_la_revolucion: 3,
      la_habana_vieja: 3,
      arroyo_naranjo: 1,
      san_miguel_del_padron: 1,
      cotorro: 2,
      boyeros: 2,
      habana_del_este: 3,
      guanabacoa: 3,
      playa: 3,
      marianao: 3,
      la_lisa: 3
    },
    
    marianao: {
      marianao: 0,
      playa: 1,
      la_lisa: 1,
      plaza_de_la_revolucion: 3,
      cerro: 3,
      centro_habana: 3,
      la_habana_vieja: 3,
      boyeros: 2,
      arroyo_naranjo: 3,
      san_miguel_del_padron: 3,
      diez_de_octubre: 3,
      habana_del_este: 3,
      guanabacoa: 3,
      regla: 3,
      cotorro: 3
    },
    
    la_lisa: {
      la_lisa: 0,
      playa: 1,
      marianao: 1,
      boyeros: 1,
      arboroy_naranjo: 2,
      plaza_de_la_revolucion: 3,
      cerro: 3,
      centro_habana: 3,
      la_habana_vieja: 3,
      diez_de_octubre: 3,
      san_miguel_del_padron: 3,
      habana_del_este: 3,
      guanabacoa: 3,
      regla: 3,
      cotorro: 3
    },
    
    boyeros: {
      boyeros: 0,
      la_lisa: 1,
      marianao: 2,
      arroyo_naranjo: 1,
      cerro: 2,
      diez_de_octubre: 2,
      plaza_de_la_revolucion: 3,
      habana_del_este: 3,
      guanabacoa: 3,
      cotorro: 3,
      san_miguel_del_padron: 3,
      centro_habana: 3,
      la_habana_vieja: 3,
      playa: 3
    },
    
    arroyo_naranjo: {
      arroyo_naranjo: 0,
      diez_de_octubre: 1,
      boyeros: 1,
      cerro: 2,
      san_miguel_del_padron: 2,
      cotorro: 2,
      plaza_de_la_revolucion: 3,
      centro_habana: 3,
      la_habana_vieja: 3,
      playa: 3,
      marianao: 3,
      la_lisa: 3,
      habana_del_este: 3,
      guanabacoa: 3,
      regla: 3
    },
    
    san_miguel_del_padron: {
      san_miguel_del_padron: 0,
      diez_de_octubre: 1,
      cerro: 2,
      centro_habana: 2,
      la_habana_vieja: 2,
      arroyo_naranjo: 2,
      cotorro: 2,
      guanabacoa: 1,
      habana_del_este: 2,
      boyeros: 3,
      la_lisa: 3,
      marianao: 3,
      playa: 3,
      plaza_de_la_revolucion: 3
    },
    
    guanabacoa: {
      guanabacoa: 0,
      san_miguel_del_padron: 1,
      habana_del_este: 1,
      cotorro: 1,
      regla: 2,
      la_habana_vieja: 3,
      centro_habana: 3,
      plaza_de_la_revolucion: 3,
      cerro: 3,
      diez_de_octubre: 3,
      arroyo_naranjo: 3,
      boyeros: 3,
      la_lisa: 3,
      playa: 3,
      marianao: 3
    },
    
    habana_del_este: {
      habana_del_este: 0,
      guanabacoa: 1,
      san_miguel_del_padron: 2,
      la_habana_vieja: 2,
      regla: 2,
      centro_habana: 3,
      plaza_de_la_revolucion: 3,
      cerro: 3,
      diez_de_octubre: 3,
      arroyo_naranjo: 3,
      boyeros: 3,
      la_lisa: 3,
      playa: 3,
      marianao: 3,
      cotorro: 3
    },
    
    regla: {
      regla: 0,
      la_habana_vieja: 1,
      centro_habana: 2,
      san_miguel_del_padron: 2,
      guanabacoa: 2,
      habana_del_este: 2,
      plaza_de_la_revolucion: 3,
      cerro: 3,
      diez_de_octubre: 3,
      arroyo_naranjo: 3,
      boyeros: 3,
      la_lisa: 3,
      playa: 3,
      marianao: 3,
      cotorro: 3
    },
    
    cotorro: {
      cotorro: 0,
      san_miguel_del_padron: 1,
      guanabacoa: 1,
      arroyo_naranjo: 2,
      diez_de_octubre: 2,
      boyeros: 3,
      plaza_de_la_revolucion: 3,
      cerro: 3,
      centro_habana: 3,
      la_habana_vieja: 3,
      habana_del_este: 3,
      la_lisa: 3,
      playa: 3,
      marianao: 3
    }
  },
  matanzas: {
    matanzas: {
      matanzas: 0,
      cardenas: 1,
      limonar: 1,
      union_de_reyes: 2,
      perico: 2,
      jaguey_grande: 3,
      colon: 3,
      marti: 3,
      calimete: 3,
      cienaga_de_zapata: 3,
      varadero: 2
    },
    
    cardenas: {
      cardenas: 0,
      varadero: 1,
      matanzas: 1,
      jovellanos: 2,
      perico: 2,
      limonar: 2,
      union_de_reyes: 3,
      colon: 3,
      marti: 3,
      jaguey_grande: 3,
      calimete: 3,
      cienaga_de_zapata: 3
    },
    
    varadero: {
      varadero: 0,
      cardenas: 1,
      matanzas: 2,
      limonar: 3,
      perico: 3,
      union_de_reyes: 3,
      colon: 3,
      marti: 3,
      jovellanos: 3,
      jaguey_grande: 3,
      calimete: 3,
      cienaga_de_zapata: 3
    },
    
    limonar: {
      limonar: 0,
      matanzas: 1,
      perico: 1,
      cardenas: 2,
      union_de_reyes: 2,
      colon: 2,
      jovellanos: 2,
      marti: 3,
      jaguey_grande: 3,
      calimete: 3,
      varadero: 3,
      cienaga_de_zapata: 3
    },
    
    perico: {
      perico: 0,
      limonar: 1,
      jovellanos: 1,
      colon: 1,
      matanzas: 2,
      union_de_reyes: 2,
      cardenas: 2,
      marti: 2,
      jaguey_grande: 3,
      calimete: 3,
      varadero: 3,
      cienaga_de_zapata: 3
    },
    
    jovellanos: {
      jovellanos: 0,
      perico: 1,
      colon: 1,
      union_de_reyes: 1,
      cardenas: 2,
      limonar: 2,
      matanzas: 3,
      marti: 2,
      jaguey_grande: 2,
      calimete: 3,
      cienaga_de_zapata: 3,
      varadero: 3
    },
    
    union_de_reyes: {
      union_de_reyes: 0,
      jovellanos: 1,
      limonar: 2,
      matanzas: 2,
      perico: 2,
      colon: 3,
      cardenas: 3,
      marti: 3,
      jaguey_grande: 3,
      calimete: 3,
      cienaga_de_zapata: 3,
      varadero: 3
    },
    
    colon: {
      colon: 0,
      perico: 1,
      jovellanos: 1,
      marti: 1,
      limonar: 2,
      jaguey_grande: 2,
      union_de_reyes: 3,
      cardenas: 3,
      matanzas: 3,
      calimete: 3,
      varadero: 3,
      cienaga_de_zapata: 3
    },
    
    marti: {
      marti: 0,
      colon: 1,
      perico: 2,
      jovellanos: 2,
      cardenas: 3,
      limonar: 3,
      union_de_reyes: 3,
      matanzas: 3,
      jaguey_grande: 3,
      calimete: 3,
      varadero: 3,
      cienaga_de_zapata: 3
    },
    
    jaguey_grande: {
      jaguey_grande: 0,
      colon: 2,
      jovellanos: 2,
      calimete: 1,
      cienaga_de_zapata: 1,
      perico: 3,
      union_de_reyes: 3,
      cardenas: 3,
      matanzas: 3,
      limonar: 3,
      marti: 3,
      varadero: 3
    },
    
    calimete: {
      calimete: 0,
      jaguey_grande: 1,
      colon: 3,
      marti: 3,
      perico: 3,
      jovellanos: 3,
      union_de_reyes: 3,
      cienaga_de_zapata: 2,
      cardenas: 3,
      limonar: 3,
      matanzas: 3,
      varadero: 3
    },
    
    cienaga_de_zapata: {
      cienaga_de_zapata: 0,
      jaguey_grande: 1,
      calimete: 2,
      colon: 3,
      jovellanos: 3,
      union_de_reyes: 3,
      perico: 3,
      cardenas: 3,
      limonar: 3,
      matanzas: 3,
      varadero: 3,
      marti: 3
    }
  },
  artemisa: {
    artemisa: {
      artemisa: 0,
      candelaria: 1,
      guanajay: 1,
      san_antonio_de_los_banos: 2,
      caimito: 2,
      alquizar: 2,
      mariel: 2,
      san_cristobal: 3,
      bahia_honda: 3,
      bauta: 3,
      guira_de_melena: 3
    },
    
    bauta: {
      bauta: 0,
      caimito: 1,
      guanajay: 1,
      san_antonio_de_los_banos: 1,
      mariel: 2,
      artemisa: 3,
      guira_de_melena: 3,
      alquizar: 3,
      candelaria: 3,
      bahia_honda: 3,
      san_cristobal: 3
    },
    
    caimito: {
      caimito: 0,
      bauta: 1,
      san_antonio_de_los_banos: 1,
      guanajay: 2,
      guira_de_melena: 2,
      artemisa: 2,
      mariel: 3,
      alquizar: 3,
      candelaria: 3,
      bahia_honda: 3,
      san_cristobal: 3
    },
    
    guanajay: {
      guanajay: 0,
      bauta: 1,
      caimito: 2,
      artemisa: 1,
      mariel: 1,
      san_antonio_de_los_banos: 2,
      candelaria: 2,
      bahia_honda: 2,
      guira_de_melena: 3,
      alquizar: 3,
      san_cristobal: 3
    },
    
    san_antonio_de_los_banos: {
      san_antonio_de_los_banos: 0,
      bauta: 1,
      caimito: 1,
      guira_de_melena: 1,
      alquiler: 2,
      artemisa: 2,
      guanajay: 2,
      mariel: 3,
      candelaria: 3,
      san_cristobal: 3,
      bahia_honda: 3
    },
    
    guira_de_melena: {
      guira_de_melena: 0,
      san_antonio_de_los_banos: 1,
      caimito: 2,
      alquizar: 1,
      bauta: 3,
      artemisa: 3,
      guanajay: 3,
      mariel: 3,
      candelaria: 3,
      san_cristobal: 3,
      bahia_honda: 3
    },
    
    alquizar: {
      alquizar: 0,
      guira_de_melena: 1,
      artemisa: 2,
      san_antonio_de_los_banos: 2,
      caimito: 3,
      bauta: 3,
      guanajay: 3,
      candelaria: 3,
      san_cristobal: 3,
      mariel: 3,
      bahia_honda: 3
    },
    
    mariel: {
      mariel: 0,
      guanajay: 1,
      bahia_honda: 1,
      artemisa: 2,
      bauta: 2,
      candelaria: 2,
      caimito: 3,
      san_antonio_de_los_banos: 3,
      guira_de_melena: 3,
      san_cristobal: 3,
      alquizar: 3
    },
    
    bahia_honda: {
      bahia_honda: 0,
      mariel: 1,
      candelaria: 1,
      guanajay: 2,
      artemisa: 3,
      san_cristobal: 2,
      caimito: 3,
      bauta: 3,
      guira_de_melena: 3,
      san_antonio_de_los_banos: 3,
      alquizar: 3
    },
    
    candelaria: {
      candelaria: 0,
      bahia_honda: 1,
      artemisa: 1,
      mariel: 2,
      san_cristobal: 1,
      guanajay: 2,
      caimito: 3,
      bauta: 3,
      guira_de_melena: 3,
      san_antonio_de_los_banos: 3,
      alquizar: 3
    },
    
    san_cristobal: {
      san_cristobal: 0,
      candelaria: 1,
      bahia_honda: 2,
      artemisa: 3,
      mariel: 3,
      guanajay: 3,
      caimito: 3,
      bauta: 3,
      guira_de_melena: 3,
      alquizar: 3,
      san_antonio_de_los_banos: 3
    }
  },
  mayabeque: {
    guines: {
      guines: 0,
      san_jose_de_las_lajas: 1,
      madruga: 1,
      melena_del_sur: 1,
      san_nicolas: 1,
      batabano: 2,
      quivican: 2,
      nueva_paz: 2,
      bejucal: 2,
      jaruco: 2,
      santa_cruz_del_norte: 3
    },
    
    san_jose_de_las_lajas: {
      san_jose_de_las_lajas: 0,
      guines: 1,
      bejucal: 1,
      jaruco: 1,
      melena_del_sur: 2,
      quivican: 2,
      batabano: 2,
      madruga: 2,
      san_nicolas: 2,
      nueva_paz: 3,
      santa_cruz_del_norte: 2
    },
    
    san_nicolas: {
      san_nicolas: 0,
      guines: 1,
      madruga: 1,
      nueva_paz: 1,
      melena_del_sur: 2,
      batabano: 2,
      quivican: 3,
      san_jose_de_las_lajas: 2,
      bejucal: 3,
      jaruco: 3,
      santa_cruz_del_norte: 3
    },
    
    madruga: {
      madruga: 0,
      guines: 1,
      san_nicolas: 1,
      nueva_paz: 1,
      jaruco: 2,
      san_jose_de_las_lajas: 2,
      melena_del_sur: 2,
      batabano: 3,
      quivican: 3,
      bejucal: 3,
      santa_cruz_del_norte: 3
    },
    
    melena_del_sur: {
      melena_del_sur: 0,
      guines: 1,
      quivican: 1,
      batabano: 1,
      san_jose_de_las_lajas: 2,
      san_nicolas: 2,
      madruga: 2,
      bejucal: 3,
      jaruco: 3,
      nueva_paz: 3,
      santa_cruz_del_norte: 3
    },
    
    quivican: {
      quivican: 0,
      melena_del_sur: 1,
      batabano: 1,
      bejucal: 1,
      san_jose_de_las_lajas: 2,
      guines: 2,
      san_nicolas: 3,
      madruga: 3,
      jaruco: 3,
      nueva_paz: 3,
      santa_cruz_del_norte: 3
    },
    
    bejucal: {
      bejucal: 0,
      san_jose_de_las_lajas: 1,
      quivican: 1,
      batabano: 2,
      guines: 2,
      jaruco: 2,
      melena_del_sur: 3,
      san_nicolas: 3,
      madruga: 3,
      nueva_paz: 3,
      santa_cruz_del_norte: 3
    },
    
    batabano: {
      batabano: 0,
      melena_del_sur: 1,
      quivican: 1,
      guines: 2,
      san_jose_de_las_lajas: 2,
      san_nicolas: 2,
      nueva_paz: 3,
      madruga: 3,
      bejucal: 2,
      jaruco: 3,
      santa_cruz_del_norte: 3
    },
    
    nueva_paz: {
      nueva_paz: 0,
      san_nicolas: 1,
      madruga: 1,
      guines: 2,
      melena_del_sur: 3,
      batabano: 3,
      quivican: 3,
      san_jose_de_las_lajas: 3,
      bejucal: 3,
      jaruco: 3,
      santa_cruz_del_norte: 3
    },
    
    jaruco: {
      jaruco: 0,
      san_jose_de_las_lajas: 1,
      santa_cruz_del_norte: 1,
      guines: 2,
      bejucal: 2,
      madruga: 2,
      san_nicolas: 3,
      melena_del_sur: 3,
      batabano: 3,
      quivican: 3,
      nueva_paz: 3
    },
    
    santa_cruz_del_norte: {
      santa_cruz_del_norte: 0,
      jaruco: 1,
      san_jose_de_las_lajas: 2,
      guines: 3,
      madruga: 3,
      san_nicolas: 3,
      bejucal: 3,
      melena_del_sur: 3,
      quivican: 3,
      batabano: 3,
      nueva_paz: 3
    }
  },
  santiago_de_cuba: {
    santiago_de_cuba: {
      santiago_de_cuba: 0,
      palma_soriano: 1,
      san_luis: 1,
      mella: 2,
      songo_la_maya: 2,
      guama: 2,
      contramaestre: 2,
      tercer_frente: 3
    },
    
    palma_soriano: {
      palma_soriano: 0,
      santiago_de_cuba: 1,
      san_luis: 1,
      contramaestre: 1,
      mella: 2,
      songo_la_maya: 2,
      guama: 3,
      tercer_frente: 3
    },
    
    san_luis: {
      san_luis: 0,
      santiago_de_cuba: 1,
      palma_soriano: 1,
      songo_la_maya: 2,
      mella: 2,
      guama: 2,
      contramaestre: 3,
      tercer_frente: 3
    },
    
    guama: {
      guama: 0,
      mella: 1,
      songo_la_maya: 1,
      santiago_de_cuba: 2,
      san_luis: 2,
      palma_soriano: 3,
      contramaestre: 3,
      tercer_frente: 3
    },
    
    mella: {
      mella: 0,
      guama: 1,
      songo_la_maya: 1,
      santiago_de_cuba: 2,
      san_luis: 2,
      palma_soriano: 2,
      contramaestre: 3,
      tercer_frente: 3
    },
    
    songo_la_maya: {
      songo_la_maya: 0,
      guama: 1,
      mella: 1,
      santiago_de_cuba: 2,
      san_luis: 2,
      palma_soriano: 2,
      contramaestre: 3,
      tercer_frente: 3
    },
    
    contramaestre: {
      contramaestre: 0,
      palma_soriano: 1,
      tercer_frente: 1,
      santiago_de_cuba: 2,
      mella: 2,
      songo_la_maya: 3,
      guama: 3,
      san_luis: 3
    },
    
    tercer_frente: {
      tercer_frente: 0,
      contramaestre: 1,
      palma_soriano: 2,
      santiago_de_cuba: 3,
      san_luis: 3,
      guama: 3,
      mella: 3,
      songo_la_maya: 3
    }
  },
  holguin: {
    holguin: {
      holguin: 0,
      banes: 1,
      mayari: 1,
      urbano_noris: 1,
      cueto: 2,
      rafael_freyre: 2,
      gibara: 2,
      antilla: 2,
      moa: 3,
      sacagua_de_tanamo: 3,
      cacocum: 3
    },
    
    banes: {
      banes: 0,
      holguin: 1,
      antilla: 1,
      mayari: 2,
      rafael_freyre: 2,
      cueto: 2,
      moa: 3,
      urbano_noris: 3,
      gibara: 3,
      cacocum: 3,
      sagua_de_tanamo: 3
    },
    
    antilla: {
      antilla: 0,
      banes: 1,
      mayari: 1,
      rafael_freyre: 2,
      holguin: 2,
      cueto: 2,
      moa: 3,
      gibara: 3,
      urbano_noris: 3,
      sagua_de_tanamo: 3,
      cacocum: 3
    },
    
    mayari: {
      mayari: 0,
      holguin: 1,
      banes: 2,
      antilla: 1,
      rafael_freyre: 1,
      cueto: 2,
      moa: 2,
      gibara: 3,
      urbano_noris: 2,
      sagua_de_tanamo: 3,
      cacocum: 3
    },
    
    rafael_freyre: {
      rafael_freyre: 0,
      mayari: 1,
      cueto: 1,
      holguin: 2,
      antilla: 2,
      banes: 2,
      gibara: 2,
      moa: 3,
      urbano_noris: 3,
      sagua_de_tanamo: 3,
      cacocum: 3
    },
    
    cueto: {
      cueto: 0,
      rafael_freyre: 1,
      mayari: 2,
      holguin: 2,
      banes: 2,
      gibara: 3,
      antilla: 3,
      moa: 3,
      urbano_noris: 3,
      sagua_de_tanamo: 3,
      cacocum: 3
    },
    
    gibara: {
      gibara: 0,
      rafael_freyre: 2,
      mayari: 2,
      holguin: 2,
      cueto: 3,
      antilla: 3,
      banes: 3,
      moa: 3,
      urbano_noris: 3,
      sagua_de_tanamo: 3,
      cacocum: 3
    },
    
    moa: {
      moa: 0,
      mayari: 2,
      banes: 3,
      antilla: 3,
      holguin: 3,
      rafael_freyre: 3,
      cueto: 3,
      gibara: 3,
      urbano_noris: 3,
      sagua_de_tanamo: 3,
      cacocum: 3
    },
    
    sagua_de_tanamo: {
      sagua_de_tanamo: 0,
      urbano_noris: 1,
      holguin: 3,
      mayari: 3,
      banes: 3,
      antilla: 3,
      rafael_freyre: 3,
      cueto: 3,
      gibara: 3,
      moa: 3,
      cacocum: 2
    },
    
    urbano_noris: {
      urbano_noris: 0,
      holguin: 1,
      sagua_de_tanamo: 1,
      mayari: 2,
      rafael_freyre: 2,
      cueto: 2,
      gibara: 3,
      moa: 3,
      banes: 3,
      antilla: 3,
      cacocum: 3
    },
    
    cacocum: {
      cacocum: 0,
      sagua_de_tanamo: 2,
      mayari: 3,
      holguin: 3,
      banes: 3,
      antilla: 3,
      rafael_freyre: 3,
      cueto: 3,
      gibara: 3,
      moa: 3,
      urbano_noris: 3
    }
  },
  villa_clara: {
    santa_clara: {
      santa_clara: 0,
      camajuani: 1,
      ranchuelo: 1,
      placetas: 1,
      caibarien: 2,
      remedios: 2,
      cifuentes: 2,
      encrucijada: 2,
      sagua_la_grande: 3,
      manicaragua: 3,
      quemado_de_guines: 3
    },
    
    camajuani: {
      camajuani: 0,
      santa_clara: 1,
      ranchuelo: 1,
      placetas: 1,
      cifuentes: 2,
      sagua_la_grande: 2,
      remedios: 2,
      caibarien: 2,
      encrucijada: 2,
      manicaragua: 3,
      quemado_de_guines: 3
    },
    
    ranchuelo: {
      ranchuelo: 0,
      santa_clara: 1,
      camajuani: 1,
      placetas: 1,
      encrucijada: 2,
      cifuentes: 2,
      sagua_la_grande: 3,
      caibarien: 3,
      remedios: 2,
      manicaragua: 2,
      quemado_de_guines: 3
    },
    
    placetas: {
      placetas: 0,
      santa_clara: 1,
      ranchuelo: 1,
      camajuani: 1,
      manicaragua: 2,
      remedios: 2,
      cifuentes: 2,
      caibarien: 3,
      sagua_la_grande: 3,
      encrucijada: 2,
      quemado_de_guines: 3
    },
    
    caibarien: {
      caibarien: 0,
      remediоs: 1,
      santa_clara: 2,
      camajuani: 2,
      placetas: 3,
      ranchuelo: 3,
      sagua_la_grande: 2,
      cifuentes: 2,
      encrucijada: 3,
      manicaragua: 3,
      quemado_de_guines: 3
    },
    
    remedios: {
      remedios: 0,
      caibarien: 1,
      santa_clara: 2,
      placetas: 2,
      camajuani: 2,
      ranchuelo: 2,
      sagua_la_grande: 2,
      cifuentes: 3,
      encrucijada: 3,
      manicaragua: 3,
      quemado_de_guines: 3
    },
    
    sagua_la_grande: {
      sagua_la_grande: 0,
      camajuani: 2,
      caibarien: 2,
      santa_clara: 3,
      ranchuelo: 3,
      placetas: 3,
      encrucijada: 1,
      cifuentes: 2,
      remedios: 2,
      manicaragua: 3,
      quemado_de_guines: 2
    },
    
    manicaragua: {
      manicaragua: 0,
      placetas: 2,
      santa_clara: 3,
      ranchuelo: 2,
      camajuani: 3,
      remedios: 3,
      cifuentes: 3,
      caibarien: 3,
      sagua_la_grande: 3,
      encrucijada: 3,
      quemado_de_guines: 3
    },
    
    cifuentes: {
      cifuentes: 0,
      camajuani: 2,
      ranchuelo: 2,
      placetas: 2,
      santa_clara: 2,
      sagua_la_grande: 2,
      encrucijada: 1,
      caibarien: 2,
      remedios: 3,
      manicaragua: 3,
      quemado_de_guines: 3
    },
    
    quemado_de_guines: {
      quemado_de_guines: 0,
      encrucijada: 2,
      sagua_la_grande: 2,
      santa_clara: 3,
      ranchuelo: 3,
      camajuani: 3,
      placetas: 3,
      cifuentes: 3,
      manicaragua: 3,
      caibarien: 3,
      remedios: 3
    },
    
    encrucijada: {
      encrucijada: 0,
      sagua_la_grande: 1,
      cifuentes: 1,
      camajuani: 2,
      ranchuelo: 2,
      placetas: 2,
      santa_clara: 2,
      quemado_de_guines: 2,
      manicaragua: 3,
      caibarien: 3,
      remedios: 3
    }
  },
  camaguey: {
    camaguey: {
      camaguey: 0,
      florida: 1,
      vertientes: 1,
      najasa: 2,
      guaimaro: 2,
      esmeralda: 2,
      sibanicu: 2,
      carlos_manuel_de_cespedes: 2,
      minas: 2,
      jimaguayu: 2,
      sierra_de_cubitas: 3,
      nuevitas: 3
    },
    
    florida: {
      florida: 0,
      camaguey: 1,
      vertientes: 1,
      najasa: 1,
      guaimaro: 2,
      esmeralda: 2,
      sibanicu: 2,
      carlos_manuel_de_cespedes: 2,
      minas: 2,
      jimaguayu: 3,
      sierra_de_cubitas: 3,
      nuevitas: 3
    },
    
    vertientes: {
      vertientes: 0,
      florida: 1,
      camaguey: 1,
      najasa: 2,
      guaimaro: 2,
      esmeralda: 2,
      sibanicu: 2,
      carlos_manuel_de_cespedes: 2,
      minas: 2,
      jimaguayu: 3,
      sierra_de_cubitas: 3,
      nuevitas: 3
    },
    
    najasa: {
      najasa: 0,
      florida: 1,
      vertientes: 2,
      camaguey: 2,
      guaimaro: 1,
      esmeralda: 2,
      sibanicu: 2,
      carlos_manuel_de_cespedes: 2,
      minas: 2,
      jimaguayu: 3,
      sierra_de_cubitas: 3,
      nuevitas: 3
    },
    
    guaimaro: {
      guaimaro: 0,
      najasa: 1,
      florida: 2,
      vertientes: 2,
      camaguey: 2,
      esmeralda: 1,
      sibanicu: 2,
      carlos_manuel_de_cespedes: 2,
      minas: 2,
      jimaguayu: 2,
      sierra_de_cubitas: 3,
      nuevitas: 3
    },
    
    esmeralda: {
      esmeralda: 0,
      guaimaro: 1,
      najasa: 2,
      florida: 2,
      vertientes: 2,
      camaguey: 2,
      sibanicu: 2,
      carlos_manuel_de_cespedes: 2,
      minas: 2,
      jimaguayu: 2,
      sierra_de_cubitas: 3,
      nuevitas: 3
    },
    
    sibanicu: {
      sibanicu: 0,
      guaimaro: 2,
      najasa: 2,
      florida: 2,
      vertientes: 2,
      camaguey: 2,
      carlos_manuel_de_cespedes: 1,
      minas: 1,
      jimaguayu: 2,
      esmeralda: 2,
      sierra_de_cubitas: 3,
      nuevitas: 3
    },
    
    carlos_manuel_de_cespedes: {
      carlos_manuel_de_cespedes: 0,
      sibanicu: 1,
      minas: 1,
      camaguey: 2,
      guaimaro: 2,
      esmeralda: 2,
      jimaguayu: 2,
      sierra_de_cubitas: 3,
      vertientes: 2,
      florida: 2,
      nuevitas: 3
    },
    
    minas: {
      minas: 0,
      sibanicu: 1,
      carlos_manuel_de_cespedes: 1,
      camaguey: 2,
      guaimaro: 2,
      esmeralda: 2,
      jimaguayu: 2,
      sierra_de_cubitas: 3,
      vertientes: 2,
      florida: 2,
      nuevitas: 3
    },
    
    jimaguayu: {
      jimaguayu: 0,
      guaimaro: 2,
      carlos_manuel_de_cespedes: 2,
      minas: 2,
      camaguey: 2,
      esmeralda: 2,
      sibanicu: 2,
      vertientes: 3,
      florida: 3,
      sierra_de_cubitas: 3,
      nuevitas: 3
    },
    
    sierra_de_cubitas: {
      sierra_de_cubitas: 0,
      camaguey: 3,
      guaimaro: 3,
      esmeralda: 3,
      vertientes: 3,
      florida: 3,
      sibanicu: 3,
      carlos_manuel_de_cespedes: 3,
      minas: 3,
      jimaguayu: 3,
      nuevitas: 1
    },
    
    nuevitas: {
      nuevitas: 0,
      sierra_de_cubitas: 1,
      camaguey: 3,
      guaimaro: 3,
      esmeralda: 3,
      vertientes: 3,
      florida: 3,
      sibanicu: 3,
      carlos_manuel_de_cespedes: 3,
      minas: 3,
      jimaguayu: 3
    }
  },
  cienfuegos: {
    cienfuegos: {
      cienfuegos: 0,
      palmira: 1,
      rodas: 1,
      lajas: 2,
      cruces: 2,
      aguada_de_pasajeros: 2
    },
    
    aguada_de_pasajeros: {
      aguada_de_pasajeros: 0,
      lajas: 1,
      cruces: 1,
      palmira: 2,
      rodas: 2,
      cienfuegos: 2
    },
    
    palmira: {
      palmira: 0,
      cienfuegos: 1,
      rodas: 1,
      lajas: 2,
      cruces: 2,
      aguada_de_pasajeros: 2
    },
    
    rodas: {
      rodas: 0,
      cienfuegos: 1,
      palmira: 1,
      lajas: 2,
      cruces: 2,
      aguada_de_pasajeros: 2
    },
    
    lajas: {
      lajas: 0,
      aguada_de_pasajeros: 1,
      cruces: 1,
      cienfuegos: 2,
      palmira: 2,
      rodas: 2
    },
    
    cruces: {
      cruces: 0,
      aguada_de_pasajeros: 1,
      lajas: 1,
      cienfuegos: 2,
      palmira: 2,
      rodas: 2
    }
  },
  ciego_de_avila: {
    ciego_de_avila: {
      ciego_de_avila: 0,
      bolivia: 1,
      ciro_redondo: 1,
      majagua: 2,
      baragua: 2,
      primero_de_enero: 2,
      moron: 3,
      chambas: 3,
      florencia: 3,
      venezuela: 3
    },
    
    moron: {
      moron: 0,
      chambas: 1,
      bolivia: 2,
      ciego_de_avila: 3,
      ciro_redondo: 3,
      majagua: 3,
      baragua: 3,
      primero_de_enero: 3,
      florencia: 3,
      venezuela: 3
    },
    
    chambas: {
      chambas: 0,
      moron: 1,
      bolivia: 2,
      ciego_de_avila: 3,
      ciro_redondo: 3,
      majagua: 3,
      baragua: 3,
      primero_de_enero: 3,
      florencia: 3,
      venezuela: 3
    },
    
    bolivia: {
      bolivia: 0,
      ciego_de_avila: 1,
      ciro_redondo: 1,
      moron: 2,
      chambas: 2,
      majagua: 2,
      baragua: 2,
      primero_de_enero: 2,
      florencia: 3,
      venezuela: 3
    },
    
    ciro_redondo: {
      ciro_redondo: 0,
      ciego_de_avila: 1,
      bolivia: 1,
      majagua: 2,
      baragua: 2,
      primero_de_enero: 2,
      moron: 3,
      chambas: 3,
      florencia: 3,
      venezuela: 3
    },
    
    majagua: {
      majagua: 0,
      primero_de_enero: 1,
      ciro_redondo: 2,
      ciego_de_avila: 2,
      bolivia: 2,
      baragua: 2,
      moron: 3,
      chambas: 3,
      florencia: 3,
      venezuela: 3
    },
    
    baragua: {
      baragua: 0,
      ciego_de_avila: 2,
      bolivia: 2,
      ciro_redondo: 2,
      majagua: 2,
      primero_de_enero: 2,
      moron: 3,
      chambas: 3,
      florencia: 3,
      venezuela: 3
    },
    
    primero_de_enero: {
      primero_de_enero: 0,
      majagua: 1,
      ciro_redondo: 2,
      ciego_de_avila: 2,
      bolivia: 2,
      baragua: 2,
      moron: 3,
      chambas: 3,
      florencia: 3,
      venezuela: 3
    },
    
    florencia: {
      florencia: 0,
      venezuela: 1,
      ciego_de_avila: 3,
      moron: 3,
      chambas: 3,
      bolivia: 3,
      ciro_redondo: 3,
      majagua: 3,
      baragua: 3,
      primero_de_enero: 3
    },
    
    venezuela: {
      venezuela: 0,
      florencia: 1,
      ciego_de_avila: 3,
      moron: 3,
      chambas: 3,
      bolivia: 3,
      ciro_redondo: 3,
      majagua: 3,
      baragua: 3,
      primero_de_enero: 3
    }
  },
  pinar_del_rio: {
    pinar_del_rio: {
      pinar_del_rio: 0,
      consolacion_del_sur: 1,
      san_juan_y_martinez: 1,
      vinales: 2,
      los_palacios: 2,
      la_palma: 2,
      guane: 3,
      mantua: 3,
      minas_de_matahambre: 3,
      sandino: 3,
      san_luis: 2,
    },
    
    vinales: {
      vinales: 0,
      pinar_del_rio: 2,
      san_juan_y_martinez: 2,
      consolacion_del_sur: 3,
      la_palma: 3,
      los_palacios: 3,
      guane: 1,
      mantua: 1,
      minas_de_matahambre: 2,
      sandino: 2,
      san_luis: 3,
    },
    
    consolacion_del_sur: {
      consolacion_del_sur: 0,
      pinar_del_rio: 1,
      san_juan_y_martinez: 1,
      los_palacios: 1,
      la_palma: 2,
      guane: 3,
      mantua: 3,
      minas_de_matahambre: 3,
      sandino: 3,
      san_luis: 2,
      vinales: 3
    },
    
    san_juan_y_martinez: {
      san_juan_y_martinez: 0,
      pinar_del_rio: 1,
      consolacion_del_sur: 1,
      vinales: 2,
      la_palma: 2,
      los_palacios: 2,
      guane: 3,
      mantua: 3,
      minas_de_matahambre: 3,
      sandino: 3,
      san_luis: 2,
    },
    
    sandino: {
      sandino: 0,
      mantua: 1,
      guane: 1,
      minas_de_matahambre: 2,
      vinales: 2,
      pinar_del_rio: 3,
      san_juan_y_martinez: 3,
      consolacion_del_sur: 3,
      los_palacios: 3,
      la_palma: 3,
      san_luis: 3,
    },
    
    la_palma: {
      la_palma: 0,
      los_palacios: 1,
      san_juan_y_martinez: 2,
      pinar_del_rio: 2,
      consolacion_del_sur: 2,
      vinales: 3,
      guane: 2,
      mantua: 3,
      minas_de_matahambre: 3,
      sandino: 3,
      san_luis: 2,
    },
    
    los_palacios: {
      los_palacios: 0,
      la_palma: 1,
      consolacion_del_sur: 1,
      san_juan_y_martinez: 2,
      pinar_del_rio: 2,
      vinales: 3,
      guane: 2,
      mantua: 3,
      minas_de_matahambre: 3,
      sandino: 3,
      san_luis: 2,
    },
    
    guane: {
      guane: 0,
      sandino: 1,
      mantua: 1,
      vinales: 1,
      la_palma: 2,
      los_palacios: 2,
      minas_de_matahambre: 2,
      pinar_del_rio: 3,
      san_juan_y_martinez: 3,
      consolacion_del_sur: 3,
      san_luis: 3,
    },
    
    mantua: {
      mantua: 0,
      guane: 1,
      sandino: 1,
      vinales: 1,
      minas_de_matahambre: 2,
      la_palma: 3,
      los_palacios: 3,
      pinar_del_rio: 3,
      san_juan_y_martinez: 3,
      consolacion_del_sur: 3,
      san_luis: 3,
    },
    
    minas_de_matahambre: {
      minas_de_matahambre: 0,
      sandino: 2,
      guane: 2,
      mantua: 2,
      vinales: 2,
      pinar_del_rio: 3,
      consolacion_del_sur: 3,
      san_juan_y_martinez: 3,
      la_palma: 3,
      los_palacios: 3,
      san_luis: 3,
    },
    
    san_luis: {
      san_luis: 0,
      pinar_del_rio: 2,
      consolacion_del_sur: 2,
      san_juan_y_martinez: 2,
      la_palma: 2,
      los_palacios: 2,
      guane: 3,
      mantua: 3,
      minas_de_matahambre: 3,
      sandino: 3,
      vinales: 3,
    },
  },
  sancti_spiritus: {
    sancti_spiritus: {
      sancti_spiritus: 0,
      cabaiguan: 1,
      taguasco: 1,
      jatibonico: 2,
      trinidad: 2,
      fomento: 2,
      yaguajay: 3,
      la_sierpe: 3,
      colon: 3
    },
    
    cabaiguan: {
      cabaiguan: 0,
      sancti_spiritus: 1,
      taguasco: 1,
      jatibonico: 2,
      fomento: 2,
      trinidad: 2,
      yaguajay: 3,
      la_sierpe: 3,
      colon: 3
    },
    
    taguasco: {
      taguasco: 0,
      sancti_spiritus: 1,
      cabaiguan: 1,
      jatibonico: 2,
      trinidad: 2,
      fomento: 2,
      yaguajay: 3,
      la_sierpe: 3,
      colon: 3
    },
    
    jatibonico: {
      jatibonico: 0,
      sancti_spiritus: 2,
      cabaiguan: 2,
      taguasco: 2,
      fomento: 1,
      trinidad: 2,
      yaguajay: 3,
      la_sierpe: 3,
      colon: 3
    },
    
    fomento: {
      fomento: 0,
      trinidad: 1,
      jatibonico: 1,
      sancti_spiritus: 2,
      cabaiguan: 2,
      taguasco: 2,
      yaguajay: 3,
      la_sierpe: 3,
      colon: 3
    },
    
    trinidad: {
      trinidad: 0,
      fomento: 1,
      jatibonico: 2,
      sancti_spiritus: 2,
      cabaiguan: 2,
      taguasco: 2,
      yaguajay: 3,
      la_sierpe: 3,
      colon: 3
    },
    
    yaguajay: {
      yaguajay: 0,
      sancti_spiritus: 3,
      cabaiguan: 3,
      taguasco: 3,
      jatibonico: 3,
      fomento: 3,
      trinidad: 3,
      la_sierpe: 1,
      colon: 2
    },
    
    la_sierpe: {
      la_sierpe: 0,
      yaguajay: 1,
      sancti_spiritus: 3,
      cabaiguan: 3,
      taguasco: 3,
      jatibonico: 3,
      fomento: 3,
      trinidad: 2,
      colon: 2
    },
    
    colon: {
      colon: 0,
      yaguajay: 2,
      la_sierpe: 2,
      sancti_spiritus: 3,
      cabaiguan: 3,
      taguasco: 3,
      jatibonico: 3,
      fomento: 3,
      trinidad: 3
    }
  },
  guantanamo: {
    guantanamo: {
      guantanamo: 0,
      caimanera: 1,
      el_salvador: 1,
      niceto_perez: 2,
      manuel_tames: 2,
      baracoa: 3,
      maisi: 3,
      imias: 3,
      san_antonio_del_sur: 3,
      yateras: 2
    },
    
    caimanera: {
      caimanera: 0,
      guantanamo: 1,
      el_salvador: 2,
      niceto_perez: 3,
      manuel_tames: 3,
      baracoa: 3,
      maisi: 3,
      imias: 3,
      san_antonio_del_sur: 3,
      yateras: 3
    },
    
    el_salvador: {
      el_salvador: 0,
      guantanamo: 1,
      caimanera: 2,
      niceto_perez: 1,
      manuel_tames: 2,
      baracoa: 3,
      maisi: 3,
      imias: 3,
      san_antonio_del_sur: 3,
      yateras: 2
    },
    
    niceto_perez: {
      niceto_perez: 0,
      el_salvador: 1,
      guantanamo: 2,
      manuel_tames: 1,
      caimanera: 3,
      baracoa: 2,
      maisi: 3,
      imias: 3,
      san_antonio_del_sur: 3,
      yateras: 2
    },
    
    manuel_tames: {
      manuel_tames: 0,
      niceto_perez: 1,
      guantanamo: 2,
      el_salvador: 2,
      baracoa: 2,
      yateras: 1,
      caimanera: 3,
      maisi: 3,
      imias: 3,
      san_antonio_del_sur: 3
    },
    
    baracoa: {
      baracoa: 0,
      manuel_tames: 2,
      niceto_perez: 2,
      guantanamo: 3,
      el_salvador: 3,
      yateras: 2,
      maisi: 2,
      imias: 3,
      san_antonio_del_sur: 3,
      caimanera: 3
    },
    
    maisi: {
      maisi: 0,
      baracoa: 2,
      imias: 1,
      san_antonio_del_sur: 1,
      guantanamo: 3,
      manuel_tames: 3,
      el_salvador: 3,
      niceto_perez: 3,
      caimanera: 3,
      yateras: 2
    },
    
    imias: {
      imias: 0,
      maisi: 1,
      san_antonio_del_sur: 1,
      baracoa: 3,
      guantanamo: 3,
      manuel_tames: 3,
      el_salvador: 3,
      niceto_perez: 3,
      caimanera: 3,
      yateras: 2
    },
    
    san_antonio_del_sur: {
      san_antonio_del_sur: 0,
      imias: 1,
      maisi: 1,
      baracoa: 3,
      guantanamo: 3,
      manuel_tames: 3,
      el_salvador: 3,
      niceto_perez: 3,
      caimanera: 3,
      yateras: 2
    },
    
    yateras: {
      yateras: 0,
      manuel_tames: 1,
      baracoa: 2,
      guantanamo: 2,
      el_salvador: 2,
      niceto_perez: 2,
      caimanera: 3,
      maisi: 2,
      imias: 2,
      san_antonio_del_sur: 2
    }
  },
  granma: {
    bayamo: {
      bayamo: 0,
      jiguani: 1,
      contramaestre: 1,
      yarа: 2,
      buey_arriba: 2,
      media_luna: 2,
      campechuela: 2,
      manzanillo: 2,
      niquero: 3,
      pilon: 3,
      bartolome_maso: 2,
      guisa: 2
    },
    
    manzanillo: {
      manzanillo: 0,
      campechuela: 1,
      media_luna: 1,
      bayamo: 2,
      pilon: 2,
      niquero: 2,
      buey_arriba: 3,
      contramaestre: 3,
      jiguani: 3,
      bartolome_maso: 3,
      guisa: 3,
      yara: 2
    },
    
    campechuela: {
      campechuela: 0,
      manzanillo: 1,
      media_luna: 1,
      bayamo: 2,
      pilon: 2,
      niquero: 2,
      buey_arriba: 3,
      contramaestre: 3,
      jiguani: 3,
      bartolome_maso: 3,
      guisa: 3,
      yara: 2
    },
    
    niquero: {
      niquero: 0,
      pilon: 1,
      manzanillo: 2,
      campechuela: 2,
      media_luna: 2,
      bayamo: 3,
      contramaestre: 3,
      jiguani: 3,
      bartolome_maso: 3,
      guisa: 3,
      buey_arriba: 3,
      yara: 3
    },
    
    media_luna: {
      media_luna: 0,
      manzanillo: 1,
      campechuela: 1,
      bayamo: 2,
      pilon: 2,
      buey_arriba: 2,
      contramaestre: 3,
      jiguani: 3,
      bartolome_maso: 3,
      guisa: 3,
      niquero: 2,
      yara: 2
    },
    
    bartolome_maso: {
      bartolome_maso: 0,
      bayamo: 2,
      jiguani: 1,
      contramaestre: 2,
      guisa: 1,
      buey_arriba: 2,
      media_luna: 3,
      manzanillo: 3,
      campechuela: 3,
      pilon: 3,
      niquero: 3,
      yara: 2
    },
    
    jiguani: {
      jiguani: 0,
      bayamo: 1,
      bartolome_maso: 1,
      contramaestre: 2,
      yarа: 2,
      guisa: 2,
      buey_arriba: 2,
      media_luna: 3,
      manzanillo: 3,
      campechuela: 3,
      pilon: 3,
      niquero: 3
    },
    
    cauto_cristo: {
      cauto_cristo: 0,
      contramaestre: 1,
      bayamo: 2,
      jiguani: 2,
      bartolome_maso: 2,
      yarа: 2,
      buey_arriba: 2,
      media_luna: 3,
      manzanillo: 3,
      campechuela: 3,
      pilon: 3,
      guisa: 3,
      niquero: 3
    },
    
    yara: {
      yara: 0,
      bayamo: 2,
      jiguani: 2,
      contramaestre: 1,
      bartolome_maso: 2,
      guisa: 2,
      buey_arriba: 3,
      media_luna: 3,
      manzanillo: 3,
      campechuela: 3,
      pilon: 3,
      niquero: 3
    },
    
    contramaestre: {
      contramaestre: 0,
      cauto_cristo: 1,
      bayamo: 1,
      jiguani: 2,
      yara: 1,
      bartolome_maso: 2,
      buey_arriba: 2,
      media_luna: 3,
      manzanillo: 3,
      campechuela: 3,
      pilon: 3,
      guisa: 3,
      niquero: 3
    },
    
    buey_arriba: {
      buey_arriba: 0,
      media_luna: 2,
      bayamo: 2,
      jiguani: 2,
      bartolome_maso: 2,
      contramaestre: 2,
      manzanillo: 3,
      campechuela: 3,
      pilon: 3,
      guisa: 3,
      niquero: 3,
      yara: 3
    },
    
    pilon: {
      pilon: 0,
      niquero: 1,
      manzanillo: 2,
      campechuela: 2,
      media_luna: 2,
      bayamo: 3,
      contramaestre: 3,
      jiguani: 3,
      bartolome_maso: 3,
      guisa: 3,
      buey_arriba: 3,
      yara: 3
    },
    
    guisa: {
      guisa: 0,
      bartolome_maso: 1,
      bayamo: 2,
      jiguani: 2,
      yara: 2,
      contramaestre: 3,
      buey_arriba: 3,
      media_luna: 3,
      manzanillo: 3,
      campechuela: 3,
      pilon: 3,
      niquero: 3
    }
  },
  las_tunas: {
    las_tunas: {
      las_tunas: 0,
      puerto_padre: 1,
      jesus_menendez: 1,
      amancio: 2,
      majibacoa: 2,
      jobabo: 2,
      manati: 3,
      colombia: 3
    },
    
    puerto_padre: {
      puerto_padre: 0,
      las_tunas: 1,
      jesus_menendez: 1,
      amancio: 2,
      majibacoa: 2,
      jobabo: 2,
      manati: 3,
      colombia: 3
    },
    
    jesus_menendez: {
      jesus_menendez: 0,
      las_tunas: 1,
      puerto_padre: 1,
      amancio: 2,
      majibacoa: 2,
      jobabo: 2,
      manati: 3,
      colombia: 3
    },
    
    amancio: {
      amancio: 0,
      majibacoa: 1,
      las_tunas: 2,
      jesus_menendez: 2,
      puerto_padre: 2,
      jobabo: 2,
      manati: 3,
      colombia: 3
    },
    
    majibacoa: {
      majibacoa: 0,
      amancio: 1,
      jobabo: 1,
      las_tunas: 2,
      jesus_menendez: 2,
      puerto_padre: 2,
      manati: 3,
      colombia: 3
    },
    
    jobabo: {
      jobabo: 0,
      majibacoa: 1,
      amancio: 1,
      las_tunas: 2,
      jesus_menendez: 2,
      puerto_padre: 2,
      manati: 3,
      colombia: 3
    },
    
    manati: {
      manati: 0,
      colombia: 1,
      las_tunas: 3,
      puerto_padre: 3,
      jesus_menendez: 3,
      amancio: 3,
      majibacoa: 3,
      jobabo: 3
    },
    
    colombia: {
      colombia: 0,
      manati: 1,
      las_tunas: 3,
      puerto_padre: 3,
      jesus_menendez: 3,
      amancio: 3,
      majibacoa: 3,
      jobabo: 3
    }
  }
};
