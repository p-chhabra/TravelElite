const HttpError = require('../modals/http-error');
const {v4: uuidv4} = require('uuid');
const { uuid } = require('uuidv4');
const {validationResult} = require('express-validator');
const Place = require('../modals/places');

let DUMMY_PLACES = [{
    id:"p1",
    title: "ABC",
    subTitle: "asdsaf",
    img: "",
    description:"asdasfasfadfsd",
    address: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001",
    location:{
        lat: 43.38621,
        lng: -79.83713   
    },
    creatorID: "u1"
},{
    id:"p2",
    title: "ABC",
    subTitle: "asdsaf",
    img: "",
    description:"asdasfasfadfsd",
    address: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001",
    location:{
        lat: 43.38621,
        lng: -79.83713   
    },
    creatorID: "u2"
},{
    id:"p3",
    title: "ABC",
    subTitle: "asdsaf",
    img: "",
    description:"asdasfasfadfsd",
    address: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001",
    location:{
        lat: 43.38621,
        lng: -79.83713   
    },
    creatorID: "u3"
}]

const getPlaceByID = async (req, res, next) => {
    const placeID = req.params.pid;

    let place;
    try{
        place = await Place.findById(placeID);
    } catch(err){
        const error = new HttpError("Could not find the place!", 404);
        return next(error)
    }

    if(!place){
        const error = new HttpError('Could not find a place for the given place ID',404);
        return next(error);
    }

    res.status(200).json({place: place.toObject({getters: true})});
}


const getPlaceByUserID = async (req, res, next) => {
    const userID = req.params.uid;
    let places;
    try{
        places = await Place.find({creator: userID});
    } catch(err){
        const error = new HttpError("Something went wrong. Could not get the places!",404);
    }

    if(!places || places.length === 0){
        next(new HttpError("Could not find a place for the given user ID"));
    }

    res.status(200).json({places: places.map((place) => place.toObject({getters: true}))});
}

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const error = new HttpError("Invalid inputs passed. Please check your data",422);
        return next(error);
    }

    const {title, description, subTitle, address, creator} = req.body;

    const createdPlace = new Place({
        title,
        subTitle,
        description,
        location: {
            lat: 28.6129,
            lng: 77.2295  
        },
        address,
        creator,
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
    })

    res.status(201).json({place: createdPlace});
    try{
        await createdPlace.save();
    } catch(err){
        const error = new HttpError('Creating place failed, please try again',500);
        return next(error);
    }
}

const editPlace = async (req, res, next) => {
    const placeID = req.params.pid;
    let updatedPlace;
    try{
        updatedPlace = await Place.findById(placeID);
    } catch(err){
        const error = new HttpError("Updating place failed, try again",404);
        return next(error);
    }

    const {description} = req.body;
    updatedPlace.description = description;

    try{
        await updatedPlace.save();
    } catch(err){
        const error = new HttpError("Updating place failed, try again",404);
        return next(error);
    }

    res.status(200).json({updatedPlace: updatedPlace.toObject({getters: true})});
}

const deletePlace = async (req, res, next) => {
    const placeID = req.params.pid;
    let place;
    try{
        place = await Place.findById(placeID);
    } catch(err){
        const error = new HttpError("Deleting place failed, try again",404);
        return next(error);
    }

    try{
        await place.remove();
    } catch(err){
        const error = new HttpError("Deleting place failed, try again",404);
        return next(error);
    }
    
    res.status(200).json("Succesfully deleted",200);
}

exports.getPlaceByID = getPlaceByID;
exports.getPlaceByUserID = getPlaceByUserID;
exports.createPlace = createPlace;
exports.editPlace = editPlace;
exports.deletePlace = deletePlace;