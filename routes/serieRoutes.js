const serieController = require('controllers/serieController');
const Joi = require('joi');

// Definierar routes för serier och validering med Joi.
module.exports = (server) => {
    server.route([
        {
            method: "GET",
            path: "/api/series",
            handler: serieController.getAllSeries
        },
        {
            method: "GET",
            path: "/api/series/{id}",
            handler: serieController.getSerieById,
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.string().length(24).required()
                    })
                }
            }
        },
        {
            method: "POST",
            path: "/api/series",
            handler: serieController.addSerie,
            options: {
                validate: {
                    payload: Joi.object({
                        name: Joi.string().min(1).required(),
                        year: Joi.number().integer().required(),
                        seen: Joi.boolean().required()
                    })
                }
            }
        },
        {
            method: "PUT",
            path: "/api/series/{id}",
            handler: serieController.updateSerieById,
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.string().length(24).required()
                    }),
                    payload: Joi.object({
                        name: Joi.string().min(1),
                        year: Joi.number().integer(),
                        seen: Joi.boolean()
                    })
                }
            }
        },
        {
            method: "DELETE",
            path: "/api/series/{id}",
            handler: serieController.deleteSerieById,
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.string().length(24).required()
                    })
                }
            }
        }
    ])
}