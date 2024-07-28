const router = require("express").Router()

const { addMassage,getAllMassage } = require("../controllers/messagesControler.js")

router.post("/addMessage",
    addMassage
);

router.post("/getmsg",
    getAllMassage
);

module.exports = router;  

