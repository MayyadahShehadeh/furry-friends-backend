
const { default: axios } = require('axios');

// http://localhost:3001/getCatOwner
async function getCatOwnerHandler(req, res) {
    
    let url = `https://mmoapi.com/api/contact-generator?token=${process.env.RANDOM_PERSON_CONTACT_KEY}`;

    await axios.get(url).then(response => {
        let dataOwner = response.data;

        let ownerObj={
            ownerName : dataOwner.fullname,
            ownerEmail : dataOwner.online.email,
            ownerPhone : dataOwner.phone_number
        }
        res.send(ownerObj);
        console.log(ownerObj);
    }).catch((error) => {
        console.error(error);
    });
}

module.exports = getCatOwnerHandler;