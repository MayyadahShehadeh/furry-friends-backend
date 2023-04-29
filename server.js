'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { default: axios } = require('axios');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;


app.get('/',(req,res) =>{
    res.send('alive!!!!');
} )
// http://localhost:3001/getCats?breedQuery=abys
app.get('/getCats', getCatsHandler);
app.get('/getCatsBreed', getCatsBreedsHandler);



// http://localhost:3001/getCats
function getCatsHandler (req,res) {
    // let breedSearchQuery = req.query.breedQuery;

    let options = {
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/cats?grooming=5`,

        headers: {
            'X-Api-Key': 'mNs9+mOi4Db1P/jnY0J2AA==R13Q4QZjUKmO8Nhm',
        },
    };

    axios.request(options).then(response => {
        let catsData = response.data.map(item => {
            return new catObj (item);
        })
        res.json(catsData)

    }).catch((error) => {
        console.error(error);
    });
}


// http://localhost:3001/getCatsBreed?breedQuery=Snowshoe
    function getCatsBreedsHandler (req,res) {
        let breedSearchQuery = req.query.breedQuery;
    
        let options = {
            method: 'GET',
            url: `https://api.api-ninjas.com/v1/cats?grooming=5&name=${breedSearchQuery}`,
    
            headers: {
                'X-Api-Key': 'mNs9+mOi4Db1P/jnY0J2AA==R13Q4QZjUKmO8Nhm',
            },
        };
    
        axios.request(options).then(response => {
            let catsData = response.data.map(item => {
                return new catObj (item);
            })
            res.json(catsData)
    
        }).catch((error) => {
            console.error(error);
        });
    }

class catObj{
    constructor(item){
        this.catName = item.name,
        this.catLength = item.length,
        this.catImg = item.image_link,
        this.catWieght = `${item.min_weight} - ${item.max_weight}`
    }

}
app.listen(PORT, () => console.log(`listening on ${PORT}`));