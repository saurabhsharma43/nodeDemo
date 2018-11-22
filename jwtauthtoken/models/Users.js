const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    userName: { type: String, required: true, },
    mobileNumber: { type: Number },
    address: {
        type: { type: String },
        street: { type: String },
        city: {
            name: { type: String }
        },
        zip: { type: Number }
    },
    craetedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    email: { type: String, required: true, unique: true },
    hash: String,
    salt: String,
    type: String,
});



// UsersSchema.path('email').validate(function(value, done) {
//     console.log('sdf', value);

//     mongoose.model('Users').count({ email: value }, function(err, count) {
//         console.log('sdf', count);
//         if (err) {
//             return done(err);
//         }
//         // If `count` is greater than zero, "invalidate"
//         done(!count);
//     });
// }, 'Email already exists');

UsersSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        userName: this.userName,
        email: this.email,
        firstName: this.name.firstName,
        id: parseInt(this._id),
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
    return {
        _id: parseInt(this._id),
        email: this.email,
        firstName: this.name.firstName,
        userName: this.userName,
        token: this.generateJWT(),

    };
};
// UsersSchema.methods.decodedtoken = function(req, res) {
//     console.log('dihsadgsiagdsgfsgfshdyfgsfj');
//     try {
//         return jwt.verify(req.body.token, 'secret', function(err, decode) {
//             if (err) {
//                 console.log('error', err);
//             }
//             return res.json({ succes2: true, decodedtoken: decode });
//         });
//     } catch (error) {
//         return res.status(401).json({ message: 'Auth failed' });
//     }
// }


module.exports = mongoose.model('User', UsersSchema);