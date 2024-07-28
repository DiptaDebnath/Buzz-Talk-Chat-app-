const Massage = require("../model/messageModel")
const Users = require("../model/userModel");

module.exports.addMassage = async(req,res,next)=>{
try {
    const {from,to,message} = req.body
    console.log(from)
    console.log(to)
    console.log(message)
    let msg = new Massage({
        message: {text:message },
        users:[from,to],
        sender:from,
    })

    await msg.save();



    if(msg){
        return res.json({msg:"Message added"})
    }else{
        return res.json({msg:"Failed to add message to the database"})
    }


} catch (error) {
    next(error)
}
}

module.exports.getAllMassage = async(req,res,next)=>{
    try {
        const {from,to} =  req.body;
        const messages = await Massage.find({
            users:{
                $all:[from,to]
            }
        }).sort({updatedAt:1});
        const projectMessages = messages.map((msg)=>{
            return{
                fromSelf:msg.sender.toString() === from,
                message:msg.message.text,
            } 
                
        })
        res.json(projectMessages)
           
        
    } catch (error) {
        next(error)
    }
}