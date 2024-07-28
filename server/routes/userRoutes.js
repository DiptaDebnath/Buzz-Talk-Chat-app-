const router = require("express").Router()

const { register,login,setAvatar,allUsers,logout } = require("../controllers/userController")


router.post("/register",
    // [body('name', 'name is too short').notEmpty().isLength({ min: 5 }), body('email', 'incorrect email').isEmail(), body('password', 'password is to short').isLength({ min: 5 }), body('location', 'Empty location').notEmpty()],
    register
);

router.post("/login",
    // [body('name', 'name is too short').notEmpty().isLength({ min: 5 }), body('email', 'incorrect email').isEmail(), body('password', 'password is to short').isLength({ min: 5 }), body('location', 'Empty location').notEmpty()],
    login
);


router.post("/logout",
    // [body('name', 'name is too short').notEmpty().isLength({ min: 5 }), body('email', 'incorrect email').isEmail(), body('password', 'password is to short').isLength({ min: 5 }), body('location', 'Empty location').notEmpty()],
    logout
);

router.post("/setAvatar",
    setAvatar
);

router.get("/allusers/:id",
    allUsers
);

module.exports = router;  