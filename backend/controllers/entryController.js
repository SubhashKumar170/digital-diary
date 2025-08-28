const Entry = require('../models/Entry')

const createEntry = async (req, res) =>{

    try {

        const {title, content, mood, date} = req.body;

        const newEntry = new Entry({
            title, content, mood, date
        });

        await newEntry.save();
        res.status(201).json(newEntry);

    } catch(err){
        console.error("Error creating entry:", err.message);
        res.status(500).json({ error: "Failed to create entry" });
    }
}

const getEntries = async (req, res) =>{
    try{
        const entries = await Entry.find();
        res.status(200).json(entries);
    } catch(err){
        console.log('error occured : ', err);
        res.status(500).json({message: "server error"});
    }
}

const getEntry = async (req, res) =>{

    try{
        const entry = await Entry.findById(req.params.id);

        if(!entry){
            return res.status(404).json({message: "entry not found"});
        }
        res.status(200).json(entry);
    } catch(err){
        if (err.name === "CastError") {
            return res.status(404).json({ message: "Entry not found" });
        }
        console.log('error occured : ', err);
        res.status(500).json({message: "server error"})
    }

}

module.exports = { createEntry, getEntries, getEntry }