const express = require('express')
const router = express.Router()

const { createEntry, getEntries, getEntry } = require('../controllers/entryController');

router.post('/add-entry', createEntry);
router.get('/all-entries', getEntries);
router.get('/entry-id/:id', getEntry )

module.exports = router;
