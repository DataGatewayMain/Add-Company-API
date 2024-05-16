const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config(); // Corrected the configuration loading
const cors = require('cors');
;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Define schema and model
const CompanySchema = new mongoose.Schema({
    campaignName: {
        type: String,
    },
    imagedomain: {
        type: String,
    }
});

const Data = mongoose.model('Data1', CompanySchema);


// Default route
app.get("/", (req, res) => {
    res.send("Welcome To Companies!!");
});

// Retrieve data
app.get('/Company', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Data submission endpoint
app.post('/Save', async (req, res) => {
    try {
        const { campaignName, imagedomain } = req.body;
        const newData = new Data({  campaignName, imagedomain });
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (error) {
        console.error('Error submitting data:', error);
        res.status(400).json({ error: error.message });
    }
});

// Delete data by ID
app.delete('/Company/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedData = await Data.findByIdAndDelete(id);
        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json({ message: 'Data deleted successfully', deletedData });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start server
const PORT = process.env.PORT || 3000; // Use port from environment variable or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// connection
async function main() {
    const res = await mongoose.connect(process.env.DB)
        const data = res.default
        console.log(data.STATES['1']);
}
main()
