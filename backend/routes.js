// Requirements
const router = require('express').Router();
const req = require('request');
const parser = require('body-parser');
const path = require('path');

const controllers = require('./controllers');

// { 
//     bear_type: 'grizzly', 
//     notes: 'It was a big one!', 
//     zip_code: '90210', 
//     num_bears: 3 
// }
router.post('/sighting', (req, res) => {
    controllers.sighting.post(req, res)
})

// Return an array of sightings, include a unique ID with each.
// Supported query params, all optional
// `start_date` (inclusive) (default: all time)
// `end_date` (inclusive) (default: all time)
// `bear_type` (default: all types)
// `zip_code` (default: all zip codes)
// `sort` (default: created timestamp, ascending. only supported value is `num_bears`)
router.get('/sighting', (req, res) => {
    controllers.sighting.get(req, res)
})

// Return a single sighting object queried by its ID
router.get('/sighting/:id', (req, res) => {
    controllers.sighting.get(req, res)
});

module.exports = router;