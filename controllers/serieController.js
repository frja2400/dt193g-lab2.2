const Serie = require('models/Serie');

// Hämta alla serier
exports.getAllSeries = async (request, h) => {
    try {
        return h.response({ series: await Serie.find() }).code(200);    // 200 - allt gick bra.
    } catch (error) {
        return h.response({ error: 'Could not fetch series' }).code(500);
    }
};

// Hämta serie med specifikt id
exports.getSerieById = async (request, h) => {
    try {
        // Hämta id från routens parametrar
        const { id } = request.params;
        // Hämta serien från databasen
        const serie = await Serie.findById(id);

        if (!serie) {
            return h.response({ error: 'Serie not found' }).code(404);
        }
        return h.response({ serie }).code(200);
    } catch (error) {
        return h.response({ error: 'Could not fetch serie' }).code(500);
    }
};

// Lägg till serie
exports.addSerie = async (request, h) => {
    try {
        // Skapa en ny instans med payload
        const serie = new Serie(request.payload);
        // Spara instansen i databasen
        const savedSerie = await serie.save();

        return h.response({ serie: savedSerie }).code(201);  // 201 - den är skapad.
    } catch (error) {
        return h.response({ error: 'Could not add serie' }).code(500);
    }
};

// Uppdatera serie med specifikt id
exports.updateSerieById = async (request, h) => {
    try {
        const { id } = request.params;
        // Hämta data att uppdatera från payload
        const updateData = request.payload;

        // Hitta och uppdatera serien med data från request.payload och returnera den uppdaterade serien
        const updatedSerie = await Serie.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedSerie) {
            return h.response({ error: 'Serie not found' }).code(404);
        }
        return h.response({ serie: updatedSerie }).code(200);
    } catch (error) {
        return h.response({ error: 'Could not update serie' }).code(500);
    }
};

// Ta bort serie med specifikt id
exports.deleteSerieById = async (request, h) => {
    try {
        const { id } = request.params;
        const deleteSerie = await Serie.findByIdAndDelete(id);

        if (!deleteSerie) {
            return h.response({ error: 'Serie not found' }).code(404);
        }

        return h.response({ serie: deleteSerie }).code(200);
    } catch (error) {
        return h.response({ error: 'Could not delete serie' }).code(500);
    }
};