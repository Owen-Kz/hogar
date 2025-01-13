const uploadPage = async (req,res) =>{
    if (req.cookies._t && req.cookies._usid) {
    res.render("upload")
    }else{
        res.render("login")
    }
}

module.exports = uploadPage