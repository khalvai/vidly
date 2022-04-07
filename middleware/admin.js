const { model } = require("mongoose");


const isAdmin=function(req,res,next){

//401 unathurazied
//403 forbidden

    if(!req.user.isAdmin)
       res.status(403).send("access denied.");

       next();
}

module.exports=isAdmin;