const dotenv = require("dotenv").config();

const Register = async (req,res) =>{
try{
    console.log(req.body)
    const response = await fetch(`${process.env.ENDPOINT}/y/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });
 
    const responseData = await response.json(); 
    if(responseData.success){
        // create cookie expiry date 
        const cookieOptions = {
        expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: false
        }
        res.cookie("_t", responseData.userToken, cookieOptions)
        res.cookie('_usid', responseData.userId, cookieOptions)
        // res.redirect("/profile")
        // res.redirect("/upload")
        return res.json({success:"UserLoggedIn", token:responseData.cookie, message:responseData.success})
    }else{
        console.log(responseData.error)
        return res.json({error:responseData.error})
    }
}catch(error){
    console.log(error)
    res.json({error:error.message})
}
}


module.exports = Register