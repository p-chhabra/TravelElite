const HttpError = require('../modals/http-error');
const {v4: uuidv4} = require('uuid');
const { uuid } = require('uuidv4');
const {validationResult} = require('express-validator');
const Place = require('../modals/places');
const User = require('../modals/users');
const mongoose = require('mongoose');
const fs = require('fs');

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

    res.json({place: place.toObject({getters: true})});
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
        return next(new HttpError("Could not find a place for the given user ID"));
    }

    res.json({places: places.map((place) => place.toObject({getters: true}))});
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
        placeImage: req.file.filename
    })

    let user;
    try{
        user = await User.findById(creator);
    } catch(err){
        const error = new HttpError('Creating new place failed, please try again!', 404);
        return next(error);
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({session: sess});
        user.places.push(createdPlace);
        await user.save({session: sess});
        await sess.commitTransaction();
        

    } catch(err){
        const error = new HttpError('Creating new place failed, please try again!', 404);
        return next(error);
    }

    try{
        await createdPlace.save();
    } catch(err){
        const error = new HttpError('Creating place failed, please try again',500);
        return next(error);
    }
    res.status(201).json({place: createdPlace.toObject({getters: true})});
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

    const {description, title, subTitle} = req.body;
    updatedPlace.description = description;
    updatedPlace.title = title;
    updatedPlace.subTitle = subTitle;

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
        place = await Place.findById(placeID).populate('creator');
    } catch(err){
        const error = new HttpError("Deleting place failed, try again",404);
        return next(error);
    }

    if(!place){
        const error = new HttpError("Could not find the place, please try again",404);
        return next(error);
    }

    console.log( __dirname + '/uploads/images/' + place.placeImage)
    const imagePath = '/home/prathmeshchhabra/Web-Development/First Full Stack Project/backend/uploads/images/'+ place.placeImage;

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({session: sess});
        place.creator.places.pull(place);
        await place.creator.save({session: sess});
        await sess.commitTransaction();
    } catch(err){
        const error = new HttpError('Deleting the place failed, please try again!', 404);
        return next(error);
    }
    
    fs.unlink(imagePath, err => console.log(err));

    res.status(200).json("Succesfully deleted");
}

exports.getPlaceByID = getPlaceByID;
exports.getPlaceByUserID = getPlaceByUserID;
exports.createPlace = createPlace;
exports.editPlace = editPlace;
exports.deletePlace = deletePlace;