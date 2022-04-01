const user = require("../models/user-model")


// get

exports.createUser = async (req, res) => {
    try {
        const result = await user.create(req.body)
        console.log(result)
        res.json({
            success: true,
            message: "user created succesfully",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "user not created  " + error,
            result: null
        })
    }
}

exports.getSingleUser = async (req, res) => {
    try {
        const result = await user.findById(req.params.id)
        console.log(result)
        res.json({
            success: true,
            message: "user found succesfully",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "user not found " + error,
            result: null
        })
    }
}
exports.getAllUser = async (req, res) => {
    try {
        const result = await user.find()
        console.log(result)
        res.json({
            count: result.length,
            success: true,
            message: "All user found succesfully",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "All user not found " + error,
            result: null
        })
    }
}