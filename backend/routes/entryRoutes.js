const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware') 

const { createEntry, getEntries, getEntry, updateEntry, deleteEntry } = require('../controllers/entryController');

router.post('/add-entry', authMiddleware, createEntry)
router.get('/all-entries', authMiddleware, getEntries)
router.get('/entry-id/:id', authMiddleware, getEntry)
router.put('/update/:id', authMiddleware, updateEntry)
router.delete('/delete/:id', authMiddleware, deleteEntry)

module.exports = router;
