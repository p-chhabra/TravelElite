const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 6},
    image: {type: String, required: false},
    places: [{type: mongoose.Types.ObjectId, required: true, ref: 'Place'}],
    isPrivate: {type: Boolean, required: true}
});

usersSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", usersSchema);