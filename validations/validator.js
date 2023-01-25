const {joierrors}=require("../response/response");
const options={
    // generic type options
    basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
    }
};

//VALIDATION OF BODY DATA
const bodyParamValidation=(req, res, next, schama) => {
    let schema=schama;
    let option=options.basic;
    let {error}=schema.validate(req.body, option);
    if(error&&Object.keys(error).length>0) {
        joierrors(
            req,
            res,
            400,
            "Bad Request",
            error
        );
    } else {
        next();
    }
};


module.exports={
    bodyParamValidation
};