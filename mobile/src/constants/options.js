export const ANALYSIS_TYPES = [
  {
    value: 'skin',
    title: 'Skin Analysis',
    subtitle: 'UV, pollution, humidity impact',
    emoji: '🧴',
  },
  {
    value: 'hair',
    title: 'Hair Analysis',
    subtitle: 'Frizz, breakage, scalp stress risk',
    emoji: '💇',
  },
];

export const SKIN_TYPES = [
  { value: 'oily', label: 'Oily', description: 'Shiny, larger pores' },
  { value: 'dry', label: 'Dry', description: 'Tight, flaky patches' },
  { value: 'combination', label: 'Combination', description: 'Mixed oily and dry zones' },
  { value: 'normal', label: 'Normal', description: 'Balanced, minimal concerns' },
];

export const SKIN_SENSITIVITY = [
  { value: 'low', label: 'Not Sensitive' },
  { value: 'medium', label: 'Moderately Sensitive' },
  { value: 'high', label: 'Very Sensitive' },
];

export const SKIN_CONCERNS = ['Acne', 'Wrinkles', 'Dark Spots', 'Redness', 'Dryness', 'Oiliness'];

export const HAIR_TYPES = [
  { value: 'straight', label: 'Straight', description: 'No curl pattern' },
  { value: 'wavy', label: 'Wavy', description: 'Loose S-wave pattern' },
  { value: 'curly', label: 'Curly', description: 'Defined curls' },
  { value: 'coily', label: 'Coily', description: 'Tight coils or kinks' },
];

export const HAIR_TEXTURES = [
  { value: 'fine', label: 'Fine / Thin' },
  { value: 'medium', label: 'Medium' },
  { value: 'thick', label: 'Thick / Coarse' },
];

export const HAIR_CONCERNS = ['Frizz', 'Dryness', 'Oiliness', 'Breakage', 'Dullness', 'Dandruff'];

export const DURATION_OPTIONS = [
  { value: '1-3', label: '1-3 Days', emoji: '🌙' },
  { value: '4-7', label: '4-7 Days', emoji: '📅' },
  { value: '1-2weeks', label: '1-2 Weeks', emoji: '🗓️' },
  { value: '2-4weeks', label: '2-4 Weeks', emoji: '📆' },
  { value: '1month+', label: '1+ Month', emoji: '🌍' },
  { value: 'custom', label: 'Custom Days', emoji: '✏️' },
];
