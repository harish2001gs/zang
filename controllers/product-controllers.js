const product = require("../models/product-model")


// get all products and get single product


exports.getAllProducts = async (req, res) => {
    try {
        const result = await product.find()
        console.log(result)
        res.json({
            count: result.length,
            success: true,
            message: "all products loaded successfully",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "all products not loaded ",
            data: null
        })
    }
}

exports.getSingleProduct = async (req, res) => {
    try {
        const result = await product.findById(req.params.id)
        console.log(result)
        res.json({
            success: true,
            message: "product loaded successfully",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "product not loaded",
            data: null
        })
    }
}

exports.addProduct = async (req, res) => {
    try {
        const data = await product.create(req.body)
        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            result: data
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Product Can't Add " + error,
            result: null
        })

    }
}
