/* A bemutató könnyen módosítható tartalmai. Az eredeti képek az assets mappában maradnak. */
const FITLESZ = {
  opening: {
    weekdays: ['06:00', '22:00'], weekend: ['08:00', '18:00'], holiday: ['08:00', '13:00'],
    // Dátum szerinti felülírás, budapesti helyi időben. null = egész nap zárva.
    // '2026-12-24': ['08:00', '12:00'], '2026-12-31': null
    exceptions: {}
  },
  prices: [
    { name: 'Havi bérlet', price: '15 000', description: 'Rendszeres edzéshez.', featured: true },
    { name: '10 alkalmas bérlet', price: '17 500', description: '2 hónapig érvényes.' },
    { name: 'Napijegy', price: '2 000', description: 'Ha alkalmanként edzenél.' }
  ],
  benefits: [
    { icon: 'weights', name: 'Folyamatosan fejlődő géppark', text: 'Változatos edzési lehetőségek, hogy mindig legyen lehetőséged továbblépni.' },
    { icon: 'people', name: 'Összetartó közösség', text: 'Barátságos, motiváló környezet kezdőknek és tapasztalt sportolóknak egyaránt.' },
    { icon: 'ticket', name: 'Korrekt árak', text: 'Átlátható jegy- és bérletlehetőségek, felesleges bonyodalmak nélkül.' },
    { icon: 'target', name: 'Személyi edzés', text: 'Egyéni segítség, ha tudatosabban szeretnél haladni a céljaid felé.' }
  ],
  reviews: [
    { name: 'V. László', text: 'Folyamatosan fejlődő, felszerelt terem,barátságos hangulat.' },
    { name: 'R. Bálint', text: 'Esztergom és környékének a legjobb edzőterme. A közösség jó, a felszerelések száma folyton bővül, és az öltözők is megújultak az utóbbi fél évben. Árban is verhetetlen a konkurenciával szemben. Csak ajánlani tudom.' },
    { name: 'V. Petra', text: 'Jó terem, kedves emberek, nagyon jó gépek' }
  ],
  trainers: [
    { image: 'ferfi1', name: 'Kovács Dániel', specialization: 'Erőnlét és életmódváltás', text: 'Segít az edzés alapjainak elsajátításában, a helyes gyakorlatvégzésben és a fokozatos, tudatos fejlődésben.' },
    { image: 'no', name: 'Tóth Fanni', specialization: 'Alakformálás és funkcionális edzés', text: 'A változatos edzéseket, a jó hangulatot és a következetes fejlődést helyezi előtérbe.' },
    { image: 'ferfi2', name: 'Nagy Márk', specialization: 'Izomépítés és teljesítményfejlesztés', text: 'Segít az erőnlét fejlesztésében, az izomépítésben és a következő edzési célok elérésében.' }
  ],
  products: [
    { image: 'polo', name: 'Fit-Lesz póló', price: '3 500 Ft' },
    { image: 'pulcsi', name: 'Fit-Lesz pulóver', price: '7 000 Ft' },
    { image: 'triko2', name: 'Fit-Lesz kapucnis trikó', price: '7 000 Ft' },
    { image: 'triko', name: 'Fit-Lesz trikó', price: '3 500 Ft' }
  ],
  contact: {
    phone: { href: 'tel:+36704205968', text: '+36 70 420 5968' },
    email: { href: 'mailto:fit.lesz.se@gmail.com', text: 'fit.lesz.se@gmail.com' },
    facebook: { href: 'https://www.facebook.com/FitLeszSe' },
    directions: { href: 'https://www.google.com/maps/dir/?api=1&destination=Fit-Lesz+Sportegyes%C3%BClet+Esztergom+Dorogi+%C3%BAt+5-7' }
  }
};
if (typeof module !== 'undefined') module.exports = FITLESZ;
