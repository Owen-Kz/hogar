async function OtherProdcuts(category){

    const response = await fetch(`${process.env.CURRENT_DOMAIN}/otherProducts?c=${category}`, {
        method: 'GET',
    });
    const responseData = await response.json();

    return responseData
}
const productCategory = async (req,res) =>{
    const slug = req.params.productSlug
    try {

        
        const responseData = await OtherProdcuts(req.params.category);
        if (responseData.success) {
            
       res.render("productCategory", {products:responseData.products, category:req.params.category, whatsapp: process.env.WhatsApp})

        }else{
            console.log(responseData)
            res.render("404")
        }
    }catch(error){
        console.log(error)
        res.render("404")
    }
}


module.exports = productCategory