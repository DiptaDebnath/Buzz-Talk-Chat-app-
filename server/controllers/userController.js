const Users = require("../model/userModel");
const bcrypt = require("bcrypt");

//Register
module.exports.register = async (req, res, next) => {
    // const result = validationResult(req);
    // if (!result.isEmpty()) {
    //     return res.status(400).json({ errors: result.array() });
    // }
    try {
        console.log(req.body);
        let { username, email, password } = req.body

        const usernameCheck = await Users.findOne({ username })
        if (usernameCheck) {
            return res.json({ msg: "username is already used", success: false })
        }
        const emailCheck = await Users.findOne({ email })
        if (emailCheck) {
            return res.json({ msg: "email is already used", success: false })
        }


        const salt = await bcrypt.genSalt(10);
        let setPassword = await bcrypt.hash(password, salt);

        let user = new Users(
            { username, email, password: setPassword }
        )
        await user.save();

        // Convert user to plain JavaScript object
        let userObj = user.toObject();
        delete userObj.password;


        res.json({ success: true, userObj });
    } catch (error) {
        console.log("error = == = = == = = = = == = = =")
        next(error);
        // next(new ExpressError(300,"database problem"));
    }
}


global.loggedInUser = new Map();


//Login
module.exports.login = async (req, res, next) => {
    // const result = validationResult(req);
    // if (!result.isEmpty()) {
    //     return res.status(400).json({ errors: result.array() });
    // }
    try {
        console.log(req.body);
        let { username, password } = req.body


        const user = await Users.findOne({ username })
        if (!user) {
            return res.json({ msg: "incorrect username or password", success: false })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.json({ msg: "incorrect password", success: false })
        }

        if(loggedInUser.get(username)){
            return res.json({ msg: "You are already Logged in another device", success: false })
        }else{
            loggedInUser.set(username,true)
        }


        let userObj = user.toObject();
        delete userObj.password;


        res.json({ success: true, userObj });
    } catch (error) {
        console.log("error = == = = == = = = = == = = =")
        next(error);
        // next(new ExpressError(300,"database problem"));
    }
}

//Logout
module.exports.logout = async (req, res, next) => {
    try {
        let  username = req.body.username
        // console.log(req.body.username)
        // console.log(loggedInUser.get(username))
        loggedInUser.delete(username)
        res.json({ success: true, msg: "Logged out successfully" })
    } catch (error) {
        next(error)
    }
}


//set avatar  logout

module.exports.setAvatar = async (req, res, next) => {
    try {
        let{_id,avatarImage} = req.body
        const userData = await Users.findByIdAndUpdate( _id ,{isAvatarImageSet:true ,avatarImage},{ runValidators: true, new: true });
        return res.json({isSet:userData.isAvatarImageSet,avatarImage})

    } catch (error) {
        next(error);
    }
}    


//allusers contacts
module.exports.allUsers = async (req, res, next) => {
    try {
        const currentUser = await Users.findOne({ _id:req.params.id});
        loggedInUser.set(currentUser.username,true)
        const users = await Users.find({ _id:{$ne : req.params.id} }).select([
            "email","username","avatarImage","_id",
        ])
        return res.json(users);
    } catch (error) {
        next(error);
    }
}
