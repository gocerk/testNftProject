const axios = require('axios');
require('dotenv').config('./env');


const getImageWithMetadata = async (id) => {
    try {
        const image = await axios.get(`http://localhost:3000/image?height=300&width=200&id=${id}`);
        return image.data.data;
    } catch(e) {
        return e;
    }
}

module.exports = { getImageWithMetadata }