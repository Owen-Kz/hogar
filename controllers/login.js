const loginPage = async (req,res) =>{
    if (req.cookies._t && req.cookies._usid) {
        res.redirect("/upload")
    }else{
    res.render("login")
    }
}

module.exports = loginPage