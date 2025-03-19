const router = require('express').Router();

// GET /
router.get('/', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const collection = db.collection('Users');

        const results = await collection.find({}).toArray();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;
