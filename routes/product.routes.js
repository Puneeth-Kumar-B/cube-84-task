const express=require("express");
const productRouter=express.Router();

//CONTROLLERS
const {
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct,
    getProductList,
    bulkUploadProductData
}=require("../controllers/product.controller");

//FILE UPLOAD MIDDLEWARE
const {upload}=require("../middleware/upload");

//JWT MIDDLEWARE
const {
    adminOnlyAccess,
    adminAndUserAccess
}=require("../middleware/authMiddleware");

//ERROR HANDLER
const {errHandler}=require("../utils/errHandling");

//VALIDATORS
const {
    createProductValidation,
    updateProductValidation
}=require("../validations/product.validator");




//PRODUCT ROUTES
productRouter.post("/", createProductValidation, adminOnlyAccess, errHandler(createProduct));
productRouter.get("/", adminAndUserAccess, errHandler(getProductList));
productRouter.post("/bulk-upload/csv", upload.single("uploadFile"), adminOnlyAccess, errHandler(bulkUploadProductData));
productRouter.put("/:productId", updateProductValidation, adminOnlyAccess, errHandler(updateProduct));
productRouter.get("/:productId", adminAndUserAccess, errHandler(getProduct));
productRouter.delete("/:productId", adminOnlyAccess, errHandler(deleteProduct))

module.exports=productRouter;