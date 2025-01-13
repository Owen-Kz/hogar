const homePage = async (req,res) =>{
    if(req.query.q){
        res.render("search")
    }else{
    res.render("home")
    }
}


module.exports = homePage