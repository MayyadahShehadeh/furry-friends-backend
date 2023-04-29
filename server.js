'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const {getCatsHandler,getCatsBreedsHandler} = require('./modules/GetCats');
const getCatOwnerHandler = require('./modules/CatOwnerRandom');
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;


app.get('/',(req,res) =>{
    res.send('alive!!!!');
} )
// http://localhost:3001/getCats?breedQuery=abys
app.get('/getCats', getCatsHandler);
app.get('/getCatsBreed', getCatsBreedsHandler);
app.get('/getCatOwner', getCatOwnerHandler);







app.listen(PORT, () => console.log(`listening on ${PORT}`));