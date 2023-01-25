const joi=require('joi');
const {bodyParamValidation}=require('./validator');

const userValidation=(req, res, next) => {
    const schema=joi.object({
        name: joi.string().min(3).required(),
        phoneNo: joi.string().regex(/^[0-9]*$/).length(10).required(),
        email: joi.string().email().lowercase().required(),
        password: joi.string().min(7).required(),
        isAdmin: joi.boolean().optional(),
        isDeleted: joi.boolean().optional()
    })
    return bodyParamValidation(req, res, next, schema)
}

const loginValidation=(req, res, next) => {
    const schema=joi.object({
        user: joi.string().required(),
        password: joi.string().min(7).required()
    })
    return bodyParamValidation(req, res, next, schema)
}

module.exports={
    userValidation,
    loginValidation
}