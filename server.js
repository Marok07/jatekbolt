import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/jatekok', async (req,res) =>{
    try{
        const [rows] = await db.query('SELECT * FROM jatekok WHERE raktaron = TRUE');
        res.status(200).json(rows);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Database Error!"});
    }
});
app.get('/api/jatekok/:id', async (req,res) =>{
    try{
        const [rows] = await db.query('SELECT * FROM jatekok WHERE id = ?', [req.params.id]);
        res.status(200).json(rows);
    if (rows.length === 0) {
        res.status(404).json({ error: 'Game not found' });
    } else {
        res.json(rows[0]);
    }
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`)
})