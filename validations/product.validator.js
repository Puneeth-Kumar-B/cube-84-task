const joi=require('joi');
const {bodyParamValidation}=require('./validator');

const createProductValidation=(req, res, next) => {
    const schema=joi.object({
        productName: joi.string().required(),
        category: joi.string().required(),
        brand: joi.string().required(),
        price: joi.number().required(),
        quantity: joi.number().optional(),
        isDeleted: joi.boolean().optional()
    })
    return bodyParamValidation(req, res, next, schema)
}

const updateProductValidation=(req, res, next) => {
    const schema=joi.object({
        productName: joi.string().optional(),
        category: joi.string().optional(),
        brand: joi.string().optional(),
        price: joi.number().optional(),
        quantity: joi.number().optional(),
        isDeleted: joi.boolean().optional()
    })
    return bodyParamValidation(req, res, next, schema)
}

module.exports={
    createProductValidation,
    updateProductValidation
}