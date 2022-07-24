const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placesSchema = new Schema({
    title: {type: String, required: true},
    subTitle: {type: String, required: true},
    description: {type: String, required: true},
    placeImage: {type: String, required: true},
    address: {type: String, required: true},
    location: {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true},
    },
    creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
})

module.exports = mongoose.model('Place', placesSchema);