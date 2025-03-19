const superagent = require('superagent')

//a config file to hold our "base" URL 
//*no authentication needed
const config = require('./config.json');


//GET SEARCH
//using fuzzy search
const drawNamedCard = async (name) => {
    try{
        const cardURL = `${config.url}?&fname=${name}`;
        const response = await superagent.get(cardURL);
        return response.body;
    }catch (error){
        return error;
    }
}


//search by ID 
const drawIdCard = async (id) => {
    try {
        const cardURL = `${config.url}?id=${id}`
        const response = await superagent.get(cardURL);
        return response.body;
    }catch (error){
        return error; 
    }
}

//exported modules
module.exports = {
    drawNamedCard, 
    drawIdCard
}


