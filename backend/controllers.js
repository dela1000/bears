const req = require('request');

const models = require('./models')

let controllers;

module.exports = controllers = {
    sighting: {
        // Post new bear sighting
        post: (req, res) => {

            let bearSighting = {
                bear_type: req.body.bear_type,
                notes: req.body.notes,
                zip_code: req.body.zip_code,
                num_bears: req.body.num_bears,
            }

            models.sighting.post(bearSighting, (result) => {
                if (result) {
                    res.status(201)
                        .json({
                            code: 201,
                            sightingAdded: result
                        })
                } else {
                    res.status(406)
                        .send({
                            'code': 406,
                            'message': 'Not added',
                            error: result
                        });
                };
            })
        },
        // Query bear sighting
        get: (req, res) => {
            if (req.params.id) {
                // Query bear sighting by Id
                let sightingId = req.params.id;
                models.sighting.getSearchById(sightingId, (result) => {
                    if (result) {
                        res.status(201).json({
                            code: 201,
                            sightings: result
                        })
                    } else {
                        res.status(404)
                            .send({
                                'code': 404,
                                'message': 'Sighting not found',
                                error: result
                            });
                    };
                })
            } else {
                // Query bear sighting by query params
                let empty = isEmpty(req.query)
                if (!empty) {
                    models.sighting.getSearchbyQuery(req.query, (result) => {
                        if (result) {
                            res.status(201).json({
                                code: 201,
                                sightings: result
                            })
                        } else {
                            res.status(404)
                                .send({
                                    'code': 404,
                                    'message': 'Nothing found'
                                });
                        };
                    })
                } else {
                    res.status(503)
                        .send({
                            'code': 503,
                            'message': 'No data on get',
                        });
                }
            }
        },
    }
}

// Helper function
isEmpty = (object) => {
    for (let key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            return false;
        }
    }
    return true;
}