const express=require("express");
const orderRouter=express.Router();

//CONTROLLERS
const {
    createOrder,
    updateOrder,
    getOrder,
    deleteOrder,
    orderDataCount,
    getOrderList
}=require("../controllers/order.controller");

//JWT MIDDLEWARE
const {
    adminOnlyAccess,
    adminAndUserAccess
}=require("../middleware/authMiddleware");

//ERROR HANDLER
const {errHandler}=require("../utils/errHandling");

//VALIDATORS
const {
    createOrderValidation,
    updateOrderValidation
}=require("../validations/order.validator");




//ORDER ROUTES
orderRouter.post("/", createOrderValidation, adminAndUserAccess, errHandler(createOrder));
orderRouter.get("/count", adminOnlyAccess, errHandler(orderDataCount));
orderRouter.get("/", adminOnlyAccess, errHandler(getOrderList));
orderRouter.put("/:id", updateOrderValidation, adminAndUserAccess, errHandler(updateOrder));
orderRouter.get("/:id", adminAndUserAccess, errHandler(getOrder));
orderRouter.delete("/:id", adminAndUserAccess, errHandler(deleteOrder))

module.exports=orderRouter;