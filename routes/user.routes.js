const express=require("express");
const userRouter=express.Router();

//CONTROLLERS
const {
    userRegistration,
    userLogin
}=require("../controllers/user.controller");

//ERROR HANDLER
const {errHandler}=require("../utils/errHandling");

//VALIDATORS
const {
    userValidation,
    loginValidation
}=require("../validations/user.validator");



//USER ROUTES
userRouter.post("/register", userValidation, errHandler(userRegistration));
userRouter.post("/login", loginValidation, errHandler(userLogin));

module.exports=userRouter;