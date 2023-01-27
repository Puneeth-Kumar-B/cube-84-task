const {
    getProductService,
    createProductService,
    updateProductService,
    productListService,
    bulkUploadProductDataService
}=require("../services/product.service");
const {
    sendErrorResponse,
    sendSuccessResponse
}=require("../response/response");


//CREATE PRODUCT
const createProduct=async (req, res) => {
    let params=req.body;
    let productExist=await getProductService({productName: params.productName});
    if(productExist?.status) {
        return sendErrorResponse(
            req,
            res,
            400,
            "Product already exist",
            []
        );
    }
    const result=await createProductService({...params});
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
        result?.data
    );
}


//UPDATE PRODUCT
const updateProduct=async (req, res) => {
    let productId=req.params.productId;
    let params=req.body;
    if(params.productId) delete params.productId;
    let productExist=await getProductService({productId: productId});
    if(!productExist?.status) {
        return sendErrorResponse(
            req,
            res,
            productExist?.statusCode,
            productExist?.message,
            productExist?.data
        );
    }
    const result=await updateProductService(productId, {...params});
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
        result?.data
    );
}


//PRODUCT LIST
const getProductList=async (req, res) => {
    let {...params}=req.query||{};
    const result=await productListService(params);
    if(!result.status) {
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message,
            result.data
        );
    }
    return sendSuccessResponse(
        req,
        res,
        result.statusCode,
        result.message,
        result.data
    );
}


//GET PRODUCT
const getProduct=async (req, res) => {
    let productId=req.params.productId;
    const result=await getProductService({productId: productId});
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
        result?.data
    );
}


//DELETE PRODUCT
const deleteProduct=async (req, res) => {
    let productId=req.params.productId;
    let productExist=await getProductService({productId: productId});
    if(!productExist?.status) {
        return sendErrorResponse(
            req,
            res,
            productExist?.statusCode,
            productExist?.message,
            productExist?.data
        );
    }
    const result=await updateProductService(productId, {isDeleted: true});
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
        "Deleted successfully",
        result?.data
    );
}


//BULK UPLOAD PRODUCT DATA
const bulkUploadProductData=async (req, res) => {
    if(!req.file.path) {
        return sendErrorResponse(
            req,
            res,
            404,
            "File does not exist",
            []
        );
    }
    const result=await bulkUploadProductDataService(req.file.path);
    if(result?.status) {
        return sendSuccessResponse(
            req,
            res,
            result?.statusCode,
            result?.message,
            result?.data
        );
    }
    else {
        return sendErrorResponse(
            req,
            res,
            result?.statusCode,
            result?.message,
            result?.data
        );
    }
}

module.exports={
    createProduct,
    updateProduct,
    getProductList,
    getProduct,
    deleteProduct,
    bulkUploadProductData
}; 