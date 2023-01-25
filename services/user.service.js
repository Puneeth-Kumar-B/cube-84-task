const db=require("../models");
const user=db.users;


//USER REGISTRATION SERVICE
const userRegistrationService=async (params={}) => {
    try {
        let User=await user.create(params);
        return {
            status: true,
            data: User,
            message: "Success",
            statusCode: 200
        };
    }
    catch(error) {
        return {
            status: false,
            statusCode: 500,
            message: error.message,
            data: []
        };
    }
}


//FIND USER SERVICE
const findUserService=async (params) => {
    try {
        let payload={
            ...params,
            isDeleted: false
        };
        if(params.id) payload.id=params.id;
        let data=await user.findOne({where: payload});
        return {
            status: !!data,
            message: data? "Success":"User doesnot exist",
            statusCode: data? 200:404,
            data: data? data:[]
        };
    } catch(error) {
        return {
            status: false,
            statusCode: 500,
            message: error.message
        };
    }
}


module.exports={
    userRegistrationService,
    findUserService
}