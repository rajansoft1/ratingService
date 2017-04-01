var mongoose = require('mongoose');
var config = require('config/config');

//mongoose.connect(config.db);
//
var Rating = mongoose.model('rating', {
    recordType: String,
    rating: Number,
    userId: String,
    userType: String,
    _id: {type: mongoose.Schema.ObjectId, select: false},
    __v: {type: Number, select: false},
    createdDate: {type: Date}
});

exports.post = function (options, cb, errCb) {
    Rating.findOneAndUpdate({recordType: options.object, userId: options.userId, userType: options.userType},
        {recordType: options.object, userId: options.userId, userType: options.userType, rating: options.rating},
        {upsert: true},
        function (err, doc) {
            if (err) errCb(err);
            cb(doc);
        });
}

exports.getRatingsByUser = function (obj, cb, errCb) {
    Rating.find({userId: obj.userId, userType: obj.userType}, function (err, doc) {
        if(err){
            errCb(err);
            return;
        }
        cb(doc);
    })
}

exports.getRatingsByObject = function (obj, cb, errCb) {
    Rating.aggregate([
        {$match: {recordType: options.object}},
        {$group: { average: {$avg: '$rating'}}}
    ], function (err, result) {
        if(err){
            errCb(err);
            return;
        }
        cb(result);
    });
}