# REST API

Detta repository innehåller kod för ett REST API byggt med Node.js, Hapi och MongoDB Atlas. API:et innehåller data för ett fritidsintresse, i detta fall information om TV-serier, och full CRUD-funktionalitet finns.

## Länk

En liveversion av API:t finns tillgänglig på följande URL: XXXXX

## Installation, databas

API:et använder MongoDB Atlas för datalagring.
För att installera och köra lokalt:

- git clone https://github.com/frja2400/dt193g-lab2.2.git
- npm install
- Skapa en .env-fil och ange miljövariabler enligt .env-sample.
- Starta servern: npm run start

## Datamodell

```js
const serieSchema = new mongoose.Schema({
    name: String,
    year: Number,
    seen: Boolean
});
```

## Användning

**Serier:**
| Metod  | Ändpunkt                  | Beskrivning                                   |
|--------|---------------------------|-----------------------------------------------|
| GET    | `/api/series`             | Hämtar alla serier.                           |
| GET    | `/api/series/:id`         | Hämtar specifik serie.                        |
| POST   | `/api/series`             | Adderar ny serie.                             |
| PUT    | `/api/series/:id`         | Uppdaterar specifik serie.                    |
| DELETE | `/api/series/:id`         | Raderar specifik serie.                       |

## Validering

Validerar routes med Joi:
- params för path-variabler (id).
- payload för POST/PUT-data.
- Returnerar felkod 400 vid fel input och 404 om id inte finns.