const Entry = require('../models/Entry')

const createEntry = async (req, res) =>{

    try {

        const {title, content, mood, date} = req.body;

        const newEntry = Entry({
            title, content, mood, date
        });

        await newEntry.save();
        res.status(201).json(newEntry);

    } catch(err){
        console.error("Error creating entry:", err.message);
        res.status(500).json({ error: "Failed to create entry" });
    }
}

module.exports = {createEntry}