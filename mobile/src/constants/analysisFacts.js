const SKIN_FACTS = [
  'Your skin renews itself roughly every 28 to 40 days, so consistency matters more than one-time routines.',
  'UV rays can affect skin even on cloudy days, which is why daily protection still helps.',
  'Well-hydrated skin often feels less reactive to changes in weather and pollution.',
  'Hot showers can strip natural oils and may leave skin feeling tighter afterward.',
  'Humidity influences how skin behaves, including dryness, oiliness, and irritation risk.',
];

const HAIR_FACTS = [
  'Hair is most fragile when wet, so gentle detangling helps reduce breakage.',
  'Scalp health directly affects hair quality, comfort, and long-term strength.',
  'Sun, wind, and pollution can increase dryness and frizz over time.',
  'Hard water minerals may make hair feel rough or harder to manage for some people.',
  'Trimming split ends improves appearance, but scalp care still drives healthy growth conditions.',
];

export function getRandomAnalysisFact(type, excludeFact = null) {
  const normalizedType = (type || '').toLowerCase();

  let pool = [...SKIN_FACTS, ...HAIR_FACTS];
  if (normalizedType === 'skin') pool = SKIN_FACTS;
  if (normalizedType === 'hair') pool = HAIR_FACTS;

  const candidates = excludeFact ? pool.filter((item) => item !== excludeFact) : pool;
  const finalPool = candidates.length ? candidates : pool;

  return finalPool[Math.floor(Math.random() * finalPool.length)];
}
