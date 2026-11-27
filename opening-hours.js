/* Magyar ünnepnapok: Mt. 102. §. Húsvét- és pünkösdvasárnap is ünnepi rend.
   https://njt.hu/jogszabaly/2012-1-00-00
   Az áthelyezett munkanap nem írja felül a terem heti rendjét; eltérés az exceptions-ben adható meg. */
const OpeningHours = (() => {
  const dayLabels = ['vasárnap', 'hétfőn', 'kedden', 'szerdán', 'csütörtökön', 'pénteken', 'szombaton'];
  const pad = n => String(n).padStart(2, '0');
  const key = d => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  const shift = (d, n) => new Date(d.getTime() + n * 86400000);
  const minutes = s => Number(s.slice(0, 2)) * 60 + Number(s.slice(3));
  function easter(year) {
    const a = year % 19, b = Math.floor(year / 100), c = year % 100;
    const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31), day = (h + l - 7 * m + 114) % 31 + 1;
    return new Date(Date.UTC(year, month - 1, day));
  }
  const holidayCache = new Map();
  function holidays(year) {
    if (!holidayCache.has(year)) {
      const dates = new Set(['01-01', '03-15', '05-01', '08-20', '10-23', '11-01', '12-25', '12-26'].map(d => `${year}-${d}`));
      [-2, 0, 1, 49, 50].forEach(offset => dates.add(key(shift(easter(year), offset))));
      holidayCache.set(year, dates);
    }
    return holidayCache.get(year);
  }
  function schedule(date, config) {
    const dateKey = key(date);
    if (Object.hasOwn(config.exceptions, dateKey)) return { hours: config.exceptions[dateKey], exception: true, holiday: holidays(date.getUTCFullYear()).has(dateKey) };
    const holiday = holidays(date.getUTCFullYear()).has(dateKey);
    return { hours: holiday ? config.holiday : [0, 6].includes(date.getUTCDay()) ? config.weekend : config.weekdays, holiday, exception: false };
  }
  function status(now = new Date(), config = FITLESZ.opening) {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Budapest', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now).map(p => [p.type, p.value]));
    const date = new Date(Date.UTC(+parts.year, +parts.month - 1, +parts.day));
    const current = +parts.hour * 60 + +parts.minute, today = schedule(date, config);
    const base = { ...today, day: date.getUTCDay(), date: key(date) };
    if (today.hours && current >= minutes(today.hours[0]) && current < minutes(today.hours[1])) return { ...base, open: true, text: `Nyitva · ${today.hours[1]}-ig` };
    // A véges keresés a teljesen zárva konfigurációt is biztonságosan kezeli.
    for (let offset = 0; offset <= 370; offset++) {
      const next = shift(date, offset), nextHours = schedule(next, config).hours;
      if (!nextHours || (offset === 0 && current >= minutes(nextHours[0]))) continue;
      const when = offset === 0 ? 'ma' : offset === 1 ? 'holnap' : offset < 7 ? dayLabels[next.getUTCDay()] : `${next.getUTCMonth() + 1}. ${next.getUTCDate()}.`;
      return { ...base, open: false, text: `Zárva · Nyitás ${when} ${nextHours[0]}-kor` };
    }
    return { ...base, open: false, text: 'Zárva · A nyitásról érdeklődj telefonon' };
  }
  return { status, schedule, holidays, easter };
})();
if (typeof module !== 'undefined') module.exports = OpeningHours;
