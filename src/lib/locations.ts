export const provinces = [
  { value: "madrid", label: "Madrid" },
  { value: "barcelona", label: "Barcelona" },
  { value: "valencia", label: "Valencia" },
  { value: "sevilla", label: "Sevilla" },
  { value: "malaga", label: "Málaga" },
];

export const municipalities: { [key: string]: { value: string; label: string }[] } = {
  madrid: [
    { value: "madrid_city", label: "Madrid" },
    { value: "getafe", label: "Getafe" },
    { value: "leganes", label: "Leganés" },
    { value: "mostoles", label: "Móstoles" },
  ],
  barcelona: [
    { value: "barcelona_city", label: "Barcelona" },
    { value: "hospitalet", label: "L'Hospitalet de Llobregat" },
    { value: "badalona", label: "Badalona" },
    { value: "terrassa", label: "Terrassa" },
  ],
  valencia: [
    { value: "valencia_city", label: "Valencia" },
    { value: "torrent", label: "Torrent" },
    { value: "gandia", label: "Gandia" },
    { value: "paterna", label: "Paterna" },
  ],
  sevilla: [
    { value: "sevilla_city", label: "Sevilla" },
    { value: "dos_hermanas", label: "Dos Hermanas" },
    { value: "alcala_de_guadaira", label: "Alcalá de Guadaíra" },
  ],
  malaga: [
    { value: "malaga_city", label: "Málaga" },
    { value: "marbella", label: "Marbella" },
    { value: "mijas", label: "Mijas" },
  ],
};
