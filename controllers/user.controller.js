const {Op}=require("sequelize");
const bcrypt=require('bcryptjs');
const db=require("../models");
const user=db.users;
const {
    userRegistrationService,
    findUserService,
}=require("../services/user.service");
const {
    sendErrorResponse,
    sendSuccessResponse
}=require("../response/response");
const {generateToken}=require('../utils/token');
let tokenHeaderKey=process.env.TOKEN_HEADER_KEY;


//USER REGISTRATION
const userRegistration=async (req, res) => {
    let {...params}=req.body;
    params.password=await bcrypt.hash(params.password, 10);
    const userExist=await findUserService({
        [Op.or]: [
            {phoneNo: params.phoneNo},
            {email: params.email}
        ]
    });
    if(userExist?.status) {
        return sendErrorResponse(
            req,
            res,
            400,
            "User already exist",
            []
        );
    }
    const result=await userRegistrationService(params);
    if(!result?.status) {
        return sendErrorResponse(
            req,
            res,
            result?.statusCode,
            result?.message,
            result?.data
        );
    }
    return sendSuccessResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        {
            id: result?.data?.id,
            name: result?.data?.name,
            email: result?.data?.email,
            phoneNo: result?.data?.phoneNo
        }
    );
}


//USER LOGIN
const userLogin=async (req, res) => {
    let {user, password}=req.body;
    const userExist=await findUserService({
        [Op.or]: [
            {phoneNo: user},
            {email: user}
        ]
    });
    if(!userExist?.status) {
        return sendErrorResponse(
            req,
            res,
            userExist?.statusCode,
            userExist?.message,
            userExist?.data
        );
    }
    let match=await bcrypt.compare(password, userExist?.data?.password)
    if(!match) {
        return sendErrorResponse(
            req,
            res,
            400,
            "Incorrect password",
            []
        );
    }
    let token=generateToken({
        id: userExist?.data?.id,
        name: userExist?.data?.name,
        isAdmin: userExist?.data?.isAdmin
    });
    const data={
        name: userExist?.data?.name,
        email: userExist?.data?.email,
        phoneNo: userExist?.data?.phoneNo,
        token
    };
    return sendSuccessResponse(
        req,
        res,
        200,
        "Success",
        data
    )
}


module.exports={
    userRegistration,
    userLogin
}