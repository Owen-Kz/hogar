async function OtherProdcuts(category){
    const response = await fetch(`${process.env.CURRENT_DOMAIN}/otherProducts?c=${category}`, {
        method: 'GET',
    });
    const responseData = await response.json();

    return responseData
}
const singleProduct = async (req,res) =>{
    const slug = req.params.productSlug
    try {
        const response = await fetch(`${process.env.ENDPOINT}/y/singleProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({slug:slug})
        });
        
        const responseData = await response.json();
        if (responseData.success) {
            const contactLink = responseData.contactLink

            const OtherItems = await OtherProdcuts(responseData.product.category)
            const whatsapp = responseData.whatsapp
            
            
       res.render("singleProduct", {product:responseData.product, files:responseData.files, contactLink, more:OtherItems.products, whatsapp})

        }else{
            console.log(responseData)
            res.render("404")
        }
    }catch(error){
        console.log(error)
        res.render("404")
    }
}


module.exports = singleProduct