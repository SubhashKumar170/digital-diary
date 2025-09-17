const Entry = require('../models/Entry')

const createEntry = async (req, res) =>{

    try {

        const {title, content, mood, date} = req.body;
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const newEntry = new Entry({
            title, content, mood, date, userId: req.user.id
        });

        await newEntry.save();
        res.status(201).json(newEntry);

    } catch(err){
        console.error("Error creating entry:", err.message);
        res.status(500).json({ error: "Failed to create entry" });
    }
}

const getEntries = async (req, res) => {
  try {
    const { year, month, mood } = req.query;
    let filter = {userId: req.user.id};

    if (year && month) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      filter.createdAt = { $gte: start, $lte: end };
    } else if (year) {
      const start = new Date(`${year}-01-01`);
      const end = new Date(`${year}-12-31T23:59:59`);
      filter.createdAt = { $gte: start, $lte: end };
    } else if (month) {
      const thisYear = new Date().getFullYear();
      const start = new Date(thisYear, month - 1, 1);
      const end = new Date(thisYear, month, 0, 23, 59, 59);
      filter.createdAt = { $gte: start, $lte: end };
    }

    if (mood) filter.mood = mood;

    const entries = await Entry.find(filter).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


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

const updateEntry = async (req, res) =>{

    try{
        const id = req.params.id
        const{ title ,content } = req.body;

        const updateFields = {};

        if (title) updateFields.title = title;
        if (content) updateFields.content = content;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }

        const updatedEntry = await Entry.findByIdAndUpdate(
            id,
            {$set:updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }

        res.status(200).json(updatedEntry);
    } catch (err){
        console.log('error occured : ', err);
        res.status(500).json({message: "server Error"})
    }

}

const deleteEntry = async(req, res) =>{

    try{
        await Entry.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch(err){
        console.log('error occured: ', err);
        if (err.name === "CastError") {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.status(500).json({message: "server error"})
    }
}


 
module.exports = { createEntry, getEntries, getEntry, updateEntry, deleteEntry }