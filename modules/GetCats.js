

const { default: axios } = require('axios');



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

module.exports = {getCatsHandler,getCatsBreedsHandler}