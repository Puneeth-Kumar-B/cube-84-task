const {sendErrorResponse}=require('../response/response');
const {verifyToken}=require('../utils/token');
const tokenHeaderKey=process.env.TOKEN_HEADER_KEY;


//ADMIN ONLY ACCESS
const adminOnlyAccess=async (req, res, next) => {
    try {
        let token=await req.header(tokenHeaderKey);
        if(!token) {
            return sendErrorResponse(
                req,
                res,
                401,
                "Token cannot be empty",
                []
            );
        }
        token=token.split(" ")[1];
        let decode=verifyToken(token);
        req.user=decode;
        if(decode && decode.isAdmin===false) {
            return sendErrorResponse(
                req,
                res,
                403,
                "Access denied..!",
                []
            );
        }
        next();
    }
    catch(error) {
        return sendErrorResponse(
            req,
            res,
            400,
            error.message,
            []
        );
    }
}


//ADMIN & USER ACCESS
const adminAndUserAccess=async (req, res, next) => {
    try {
        let token=await req.header(tokenHeaderKey);
        if(!token) {
            return sendErrorResponse(
                req,
                res,
                401,
                "Token cannot be empty",
                []
            );
        }
        token=token.split(" ")[1];
        let decode=verifyToken(token);
        req.user=decode;
        if(!decode) {
            return sendErrorResponse(
                req,
                res,
                403,
                "Token invalid",
                []
            );
        }
        next();
    }
    catch(error) {
        return sendErrorResponse(
            req,
            res,
            400,
            error.message,
            []
        );
    }
}

module.exports={
    adminOnlyAccess,
    adminAndUserAccess
};