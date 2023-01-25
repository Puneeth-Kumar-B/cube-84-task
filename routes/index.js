const express=require("express");
const indexRouter=express.Router();

const order=require("./order.routes");
const product=require("./product.routes");
const user=require("./user.routes");

indexRouter.use('/user', user);
indexRouter.use('/product', product);
indexRouter.use('/order', order);

module.exports = indexRouter;