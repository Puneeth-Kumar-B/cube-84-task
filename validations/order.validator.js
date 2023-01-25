const joi=require('joi');
const {bodyParamValidation}=require('./validator');


//VALIDATION FOR ORDER CREATION
const createOrderValidation=(req, res, next) => {
    const schema=joi.object({
        productIds: joi.array().items(joi.object({
            id: joi.number(),
            quantity: joi.number()
        }).required()).required(),
        address: joi.string().required()
    })
    return bodyParamValidation(req, res, next, schema)
}


//VALIDATION FOR ORDER UPDATION
const updateOrderValidation=(req, res, next) => {
    const schema=joi.object({
        productIds: joi.array().items(joi.object({
            id: joi.number(),
            quantity: joi.number()
        }).optional()).optional(),
        address: joi.string().optional()
    })
    return bodyParamValidation(req, res, next, schema)
}

module.exports={
    createOrderValidation,
    updateOrderValidation
}
