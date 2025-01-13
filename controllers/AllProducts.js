const dotenv = require("dotenv").config();
const fs = require('fs');
const axios = require('axios');
const path = require("path");

const products = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Ensure page is an integer
    const items_per_page = 20; // Number of items per page
    const OFFSET = (page - 1) * items_per_page;
    let data = {}
    if(req.query.q){
        data = {
            page: req.query.page || 1,
            search:req.query.q
        };
    }else{
        data = {
            page: req.query.page || 1
        };
    }
   

    try {
        const response = await fetch(`${process.env.ENDPOINT}/y/allProducts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.success) {
            const Allproducts = responseData.products;
            const totalPagesCount = responseData.totalCount;
        

     

            // Process products in batches until the `withPictures` array is filled
    
            // Pagination logic: Take the appropriate slice of the combined array

            return res.json({
                success: responseData.success,
                products: Allproducts,
                currentPage: page,
                totalPages: Math.ceil(totalPagesCount / 1),
            });
        } else {
            return res.json({ error: responseData.error });
        }
    } catch (error) {
        console.log(error);
        return res.json({ error: error.message });
    }
};

module.exports = products;
