const otherProducts = async(req,res) =>{
try{
    const category = req.query.c 
    const response = await fetch(`${process.env.ENDPOINT}/y/otherProducts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({c:category})
    });

    const responseData = await response.json();

    if (responseData.success) {
        res.json({success:"otherProducts", products:responseData.otherProducts})
    }else{
        res.json({error:responseData.error})
    }
}catch(error){
    console.log(error)
    res.json({error:error.message, products:[]})
}
}

module.exports = otherProducts