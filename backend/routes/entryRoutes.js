const express = require('express')
const router = express.Router()

const { createEntry } = require('../controllers/entryController');

router.post('/entries', createEntry);

module.exports = router;
