/* eslint-disable camelcase */
const router = require('express').Router();

const card = require('../yugioh-api')
//GET /search/cards/
//accepts a query param as ?fname=dragon
router.get('/cards', async (req, res) => {
    try{

        // ?fname = dragon  
        const { name } = req.query;
        const db = req.app.locals.db;
        const yugiohCards = await card.drawNamedCard(name);
        
        const count = yugiohCards.data.length;

        const data = {
            resultCount: count,
            keyword : name,
            results: yugiohCards.data
        };

        res.json(data);
    }catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

//POST /search/cards/details
router.post('/cards/details', async(req, res) => {
    try{

        const { resultCount, keyword, selectedID } = req.body;
        
        const yugiohCards = await card.drawIdCard(selectedID);

        const time = new Date();

        const data = {
            search : {
                resultCount : resultCount,
                keyword: keyword,
                selectedID: selectedID,
            },
            results : {
                name: yugiohCards.data[0].name,
                type: yugiohCards.data[0].type,
                desc: yugiohCards.data[0].desc,
                atk: yugiohCards.data[0].atk,
                def: yugiohCards.data[0].def,
                level: yugiohCards.data[0].level
            },

            timestamp: time
        };

        const db = req.app.locals.db;
        const collection = db.collection('Users');
        await collection.insertOne(data);

        res.json(yugiohCards);
    }catch(error){
        res.status(500).json({error: error.toString() });
    }
});


module.exports = router;