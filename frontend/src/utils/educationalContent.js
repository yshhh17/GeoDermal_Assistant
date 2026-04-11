export const skinHairFacts = [
	{
		title: 'UV Peaks Midday',
		description: 'UV exposure is usually strongest between 10 AM and 4 PM, so reapplication timing matters during travel.',
		type: 'skin'
	},
	{
		title: 'Humidity Changes Hair Shape',
		description: 'High humidity can increase frizz and curl expansion, while dry air may increase static and breakage risk.',
		type: 'hair'
	},
	{
		title: 'Water Quality Affects Barrier',
		description: 'Hard water minerals can leave residue on skin and scalp, often needing gentler cleansing and extra hydration.',
		type: 'both'
	},
	{
		title: 'Skin Renews in Cycles',
		description: 'Skin turnover happens gradually over weeks, so consistent routines are usually more effective than short bursts.',
		type: 'skin'
	},
	{
		title: 'Wet Hair Is More Fragile',
		description: 'Hair fibers are more elastic and fragile when wet, so gentle drying and detangling can reduce breakage.',
		type: 'hair'
	},
	{
		title: 'Pollution Can Increase Stress',
		description: 'Fine particles and oxidants can increase skin and scalp stress, especially in high-traffic environments.',
		type: 'both'
	},
	{
		title: 'Temperature Swings Matter',
		description: 'Rapid changes between outdoor heat and indoor cooling can alter hydration balance in both skin and hair.',
		type: 'both'
	},
	{
		title: 'Scalp Care Supports Hair Quality',
		description: 'A balanced scalp environment helps improve comfort and supports healthy-looking hair over time.',
		type: 'hair'
	}
];

export function getFactsByType(analysisType) {
	if (!analysisType) return skinHairFacts;

	return skinHairFacts.filter(
		(fact) => fact.type === analysisType || fact.type === 'both'
	);
}

export function getRandomFact(analysisType, excludeTitle = null) {
	const pool = getFactsByType(analysisType);
	const candidates = excludeTitle
		? pool.filter((fact) => fact.title !== excludeTitle)
		: pool;
	const finalPool = candidates.length ? candidates : pool;

	return finalPool[Math.floor(Math.random() * finalPool.length)] || skinHairFacts[0];
}

export function getFactHighlights(analysisType, currentTitle, count = 2) {
	const pool = getFactsByType(analysisType).filter((fact) => fact.title !== currentTitle);
	const shuffled = [...pool].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}
