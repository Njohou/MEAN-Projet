const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = new Schema({
    username : {
        type: String , 
        required:true, 
        unique:true 
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    telephone : {
        type: Number, 
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String
    }
});

// for crypt a user's password
User.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

User.pre('updateOne', function(next){
    const data = this.getUpdate();

    bcrypt.hash(data.password, null, null, (err,hash)=>{
        if(err) return next(err);
        data.password = hash
        //console.log(data.password);
        next();
    });

    this.update({}, data).exec();
});

const Users = mongoose.model('Users', User);

/** functions **/

//Post Register
Users.registerUser = (users, callback)=>{
    users.save((err, result)=>{
        if(err){
            console.log(err);
            callback('Username or email already exists !!', null);
        }else{
            let token = jwt.sign({username : users.username}, 'secret', {expiresIn: '1h'}); 
            callback(null,token); // 'Register successfully !!'
        }
    });
}


// Post Login
Users.loginUser = (username, password, callback)=>{
    Users.findOne({ username : username }, (error, user)=>{
        if(error){
            console.log(error);
            callback('Server Error');
        }else if(user == undefined){
            callback('Username Not Found !!');
        }else{
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if(err){
                    callback('Server Error');
                }else if(isMatch === true){
                    let token = jwt.sign({username : user.username}, 'secret', {expiresIn: '1h'});
                    callback(token, 'Login successfully');
                }else{
                    callback('Password incorrect !!');
                }
            });
        }
    });
}

/**  End  **/

//Change Password users

Users.updateUser = (user, users, callback)=>{
    Users.updateOne(user, users, (err, res)=>{
        if(!err){
           return callback(res, 'Updated done !!');
        }else{
            callback(err);
        }
    });
}

//

// End

module.exports = Users