function FactSpotlight({ fact, analysisType, compact = false }) {
  const isHair = analysisType === 'hair';
  const accentClass = isHair
    ? 'from-primary-blue/15 to-accent-teal/10 border-primary-blue/35'
    : 'from-primary-green/15 to-accent-mint/20 border-primary-green/35';
  const badgeClass = isHair ? 'bg-primary-blue text-white' : 'bg-primary-green text-white';

  if (!fact) return null;

  return (
    <article className={`rounded-2xl border bg-gradient-to-br ${accentClass} shadow-sm ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Did you know?</p>
          <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-text-primary mt-1`}>{fact.title}</h3>
        </div>
        <span className={`shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${badgeClass}`}>
          {isHair ? 'Hair' : analysisType === 'skin' ? 'Skin' : 'Care'}
        </span>
      </div>
      <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{fact.description}</p>
    </article>
  );
}

export default FactSpotlight;
