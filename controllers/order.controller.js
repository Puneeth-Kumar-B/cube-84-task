const {
    getOrderService,
    createOrderService,
    updateOrderService,
    orderDataCountService,
    orderListService
}=require("../services/order.service");
const {
    sendErrorResponse,
    sendSuccessResponse
}=require("../response/response");
const {getProductService}=require("../services/product.service");
const {total}=require('../utils/calculation');


//CREATE ORDER
const createOrder=async (req, res) => {
    let params=req.body;
    let dataList=params.productIds.map(async (id) => await getProductService({productId: id.id}))
    let data=await Promise.all(dataList).then((prod) => prod.map(d => d?.data));
    let arrOfPrice=await data.map(d => d.price);
    let arrOfQuantity=await params.productIds.map(q => q.quantity);
    let calculatedAmount=total(arrOfPrice, arrOfQuantity);
    let totalPrice=await calculatedAmount.reduce((pre, curr) => {
        pre+=curr
        return pre
    }, 0);
    const result=await createOrderService({
        ...params,
        totalAmount: totalPrice,
        customerId: req.user.id
    });
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


//UPDATE ORDER
const updateOrder=async (req, res) => {
    let orderId=req.params.id;
    let params=req.body;
    if(params.id) delete params.id;
    if(params.customerId) delete params.customerId;
    let orderExist=await getOrderService({id: orderId});
    if(!orderExist?.status) {
        return sendErrorResponse(
            req,
            res,
            productExist?.statusCode,
            productExist?.message,
            productExist?.data
        );
    }
    let totalPrice;
    if(params.productIds) {
        let dataList=params.productIds.map(async (id) => await getProductService({productId: id.id}))
        let data=await Promise.all(dataList).then((prod) => prod.map(d => d?.data));
        let arrOfPrice=await data.map(d => d.price);
        let arrOfQuantity=await params.productIds.map(q => q.quantity);
        let calculatedAmount=total(arrOfPrice, arrOfQuantity);
        totalPrice=await calculatedAmount.reduce((pre, curr) => {
            pre+=curr
            return pre
        }, 0);
    }
    const result=await updateOrderService(orderId, {...params, totalAmount: totalPrice});
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


//ORDER LIST
const getOrderList=async (req, res) => {
    let {...params}=req.query||{};
    const result=await orderListService(params);
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


//GET ORDER
const getOrder=async (req, res) => {
    let id=req.params.id;
    const result=await getOrderService({id: id});
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


//DELETE ORDER
const deleteOrder=async (req, res) => {
    let orderId=req.params.id;
    let orderExist=await getOrderService({id: orderId});
    if(!orderExist?.status) {
        return sendErrorResponse(
            req,
            res,
            productExist?.statusCode,
            productExist?.message,
            productExist?.data
        );
    }
    const result=await updateOrderService(orderId, {isDeleted: true});
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


//ORDER DATA COUNT
const orderDataCount=async (req, res) => {
    const result=await orderDataCountService();
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


module.exports={
    createOrder,
    updateOrder,
    getOrderList,
    getOrder,
    deleteOrder,
    orderDataCount
};