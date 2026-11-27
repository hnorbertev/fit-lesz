# Fit-Lesz weboldaldemó

Függőségek nélküli, statikus magyar weboldal. Helyi indítás: `npm run dev`, majd http://127.0.0.1:5173. Az `index.html` közvetlenül is megnyitható. Az ellenőrzésekhez: `npm test`.

## Tartalom és beállítások

- `data.js`: árak, termékek, illusztratív edzők, elérhetőségek, nyitvatartás.
- `opening-hours.js`: Europe/Budapest időzóna, automatikusan számított magyar ünnepnapok, következő nyitás. A húsvét- és pünkösdvasárnap is ünnepi rendet kap. Az áthelyezett munkanapok nem módosítják a terem heti nyitvatartását.
- Rendkívüli nyitvatartás: a `data.js` fájl `opening.exceptions` objektumában `ÉÉÉÉ-HH-NN: ['08:00', '12:00']` alakban; egész napos zárás: `null`.
- `styles.css`: arculat és reszponzív elrendezés.
- `assets/optimized/`: a kapott képek kisebb WebP-változatai. Az eredeti fájlok változatlanok.

Az értékelések megadott pillanatképek. Az edzők illusztrációk, a termékfotók rekonstruált látványtervek, a hero hangulatkép. A térképhez és a Google Fonts betűkhöz internet szükséges; a többi funkció helyben működik.

Élesítéskor a `noindex, nofollow` meta és a `robots.txt` tiltás eltávolítandó, a demós tartalmak és árak ellenőrizendők. A demó nem tartalmaz adatgyűjtést, online vásárlást vagy háttérrendszert.

## Elvégzett ellenőrzések

- Böngészős vizuális ellenőrzés 1440, 1024, 768, 390 és 360 px szélességen; nincs vízszintes túlcsordulás vagy hibás kép.
- Mobilmenü megnyitása, bezárása és menüpontos navigáció; sima görgetés és aktív navigációs jelzés.
- Futó szöveg szüneteltetése és folytatása; a szüneteltetett animáció állapota ellenőrizve.
- Termékek, portrék, árak, elérhetőségek és a betöltött Fit-Lesz térkép vizuális ellenőrzése; nincs böngészőkonzol-hiba.
- Négy automatikus tesztcsoport: nyitási/zárási határok, hétvége, téli/nyári időszámítás, fix és mozgó ünnepnapok több évben, évváltás és kézi kivételek.

A külső telefon-, e-mail- és Facebook-hivatkozások célja ellenőrizve; hívást és üzenetet az ellenőrzés nem indított. A reduced-motion mód CSS-ben kezelt; külön operációs rendszeres beállításváltással nem tesztelt.
