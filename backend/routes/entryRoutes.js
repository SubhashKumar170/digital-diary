const express = require('express')
const router = express.Router()

const { createEntry, getEntries, getEntry, updateEntry, deleteEntry } = require('../controllers/entryController');

router.post('/add-entry', createEntry);
router.get('/all-entries', getEntries);
router.get('/entry-id/:id', getEntry );
router.put('/update/:id', updateEntry);
router.delete('/delete/:id', deleteEntry);

module.exports = router;
