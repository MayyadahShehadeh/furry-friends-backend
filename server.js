'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const { getCatsHandler, getCatsBreedsHandler, getCatsHandler22,getCatsDesHandler} = require('./modules/GetCats');
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
    userName:String,
    userEmail: String,
    userPhone:Number,
    catName: String,
    catLength: String,
    catImg: String,
    origin: String,
    catWieght: String,

})

const catModel = mongoose.model('catData', catSchema);

function seedCat() {
    const cat1 = new catModel({
        userName:'mayadah',
        userPhone:parseInt('0782465514'),
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
app.get('/getAllCats', getDbCatHandler2);
app.get('/dbCat', getDbCatHandler);
app.post('/addNewCat', addNewCatHandler);
app.put('/updateCatData/:catId', updateCatHandler);
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
    let personName = req.query.userName;

    catModel.find({ userEmail: personEmail, userName:personName }).then(data => {
        console.log(data);
        res.send(data)

    })
}
async function addNewCatHandler(req, res) {
    let { userEmail, catName, catLength, catImg, userName,userPhone,origin ,catWieght} = req.body;
    const newCat = new catModel({
        userName:userName,
        userEmail: userEmail,
        userPhone:userPhone,
        catName: catName,
        catLength: catLength,
        catImg: catImg,
        origin:origin,
        catWieght:catWieght

    })
    await newCat.save();
    catModel.find({ userEmail: userEmail }).then(data => {
        console.log(data);
        res.send(data)
    })
}

function updateCatHandler(req, res) {
    let { userEmail, catName, catLength, catImg, userPhone, origin,catWieght } = req.body;
  
    let catID = req.params.catId;
  
    catModel.findOne({ _id: catID }).then(data => {
        data.userPhone = userPhone;
      data.userEmail = userEmail;
      data.catName = catName;
      data.catLength = catLength;
      data.catImg = catImg;
      data.origin = origin;
      data.catWieght = catWieght;

      console.log(data);
  
      data.save().then(()=> {
        catModel.find({ userEmail }).then(data => {
          console.log(data);
          res.send(data)
        })
      }).catch(error =>{
        console.log(error);
      })
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
app.get('/getCats2', getCatsHandler22);
app.get('/getCats', getCatsHandler);
app.get('/getCatsBreed', getCatsBreedsHandler);
app.get('/getCatOwner', getCatOwnerHandler);
app.get('/getCatsDes', getCatsDesHandler);

app.listen(PORT, () => console.log(`listening on ${PORT}`));