const singleProduct = async (req,res) =>{
    const slug = req.params.productSlug

    res.render("singleProduct")
}


module.exports = singleProduct