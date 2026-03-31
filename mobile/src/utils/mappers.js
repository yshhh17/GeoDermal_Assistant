export function mapDurationCategory(duration) {
  if (!duration) return '2-7d';

  const value = duration.toLowerCase();

  if (value.includes('1-3') || value.includes('day')) return '<48h';
  if (value.includes('4-7') || value.includes('week')) return '2-7d';
  if (value.includes('1-2weeks') || value.includes('2-4weeks') || value.includes('month')) return '1-4w';
  if (value.includes('1month+')) return 'relocation';

  const match = value.match(/(\d+)\s*days?/);
  if (match) {
    const days = parseInt(match[1], 10);
    if (days < 2) return '<48h';
    if (days <= 7) return '2-7d';
    if (days <= 28) return '1-4w';
    return 'relocation';
  }

  return '2-7d';
}

export function getCurrentMonthOrSeason() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return months[new Date().getMonth()];
}

export function getRiskMeta(score) {
  if (score <= 3) return { label: 'Low', color: '#15803D' };
  if (score <= 6) return { label: 'Moderate', color: '#D97706' };
  return { label: 'High', color: '#E11D48' };
}
