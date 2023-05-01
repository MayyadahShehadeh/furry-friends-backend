'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const { getCatsHandler, getCatsBreedsHandler } = require('./modules/GetCats');
const getCatOwnerHandler = require('./modules/CatOwnerRandom');
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const mongoLink = process.env.MONGO_LINK;

// ---------------------------------------------------------------------
mongoose.connect(mongoLink, {
    useNewUrlParser: true
});

const catSchema = new mongoose.Schema({
    userEmail: String,
    catName: String,
    catLength: String,
    catImg: String,
    catWieght: String,
})

const catModel = mongoose.model('catData', catSchema);

function seedCat() {
    const cat1 = new catModel({
        userEmail: 'miss.mayadah5@gmail.com',
        catName: 'soso',
        catLength: 'meduim',
        catImg: 'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80'
    })

    cat1.save();
}
// seedCat();

// --------------------------------------------- CRUD -------------------
app.get('/choosenCatt', getcatnameHandler);

app.get('/dbCat', getDbCatHandler);
app.post('/addNewCat', addNewCatHandler);
app.get('/getAllCats', getDbCatHandler2);
app.delete('/deleteCat/:catId', deleteCat);

function getcatnameHandler(req, res) {
    let choosenCat = req.query.choosenCat;
    console.log(choosenCat);

    // --------------------- TO FILTER DATA IN DB BY CAT NAME ----------------
  // http://localhost:3001/choosenCatt?choosenCat=soso
  catModel.find({ catName: choosenCat }).then((data,error) => {
    if(error){
        console.log(error);
    }else{
        console.log(data);
        res.send(data)
    } }) }
    
// -------------- to get all data in the db even after logout --------------
function getDbCatHandler2(req, res) {
    catModel.find({}).then((data, error) => {
        res.json(data)
    })
}

function getDbCatHandler(req, res) {
    let personEmail = req.query.userEmail;

    catModel.find({ userEmail: personEmail }).then(data => {
        console.log(data);
        res.send(data)

    })
}
async function addNewCatHandler(req, res) {
    let { userEmail, catName, catLength, catImg } = req.body;

    const newCat = new catModel({
        userEmail: userEmail,
        catName: catName,
        catLength: catLength,
        catImg: catImg,
    })
    await newCat.save();

    catModel.find({ userEmail: userEmail }).then(data => {
        console.log(data);
        res.send(data)

    })
}

// ------------------------ to delete cat from db ----------------
function deleteCat(req, res) {
    console.log(req.params);
    let catID = req.params.catId;
    let userEmail = req.query.userEmail;
  
    catModel.findOneAndDelete({ _id: catID }).then(() => {
  
        catModel.find({ userEmail }).then(data => {
        console.log(data);
        res.send(data)
      })
    })
  }

// ------------------------------------------------------
app.get('/', (req, res) => {
    res.send('alive!!!!');
})
// http://localhost:3001/getCats?breedQuery=abys
app.get('/getCats', getCatsHandler);
app.get('/getCatsBreed', getCatsBreedsHandler);
app.get('/getCatOwner', getCatOwnerHandler);

app.listen(PORT, () => console.log(`listening on ${PORT}`));