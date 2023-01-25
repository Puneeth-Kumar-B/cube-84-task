const {Op}=require('sequelize');
const db=require('../models');
const {getPaginatedData}=require('../utils/pagination');
const {getProductService}=require('./product.service');
const order=db.orders;
const product=db.products;

//ORDER CREATION SERVICE
const createOrderService=async (params={}) => {
    try {
        let Order=await order.create(params);
        return {
            status: true,
            statusCode: 200,
            message: "Success",
            data: Order
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


//ORDER UPDATION SERVICE
const updateOrderService=async (id, params) => {
    try {
        let payload={
            id: id,
            isDeleted: false
        };
        let update=await order.update({
            ...params
        }, {
            where: payload
        });
        if(!update) {
            return {
                status: false,
                statusCode: 422,
                message: "Something went wrong",
                data: []
            };
        }
        return {
            status: true,
            statusCode: 200,
            message: "Updated successfully",
            data: []
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


//ORDERS LIST SERVICE
const orderListService=async (pageData) => {
    try {
        let page=pageData.page? parseInt(pageData.page):1;
        let limit=pageData.limit? parseInt(pageData.limit):10;
        let start=(page-1)*limit;
        let searchCondition={}
        if(pageData.search) {
            searchCondition={
                customerId: pageData.search
            }
        }
        let count=await order.count({
            where: {
                [Op.and]: [{...searchCondition}, {isDeleted: false}]
            }})
        let list=await order.findAll({
            where: {
                [Op.and]: [{...searchCondition}, {isDeleted: false}]
            },
            limit: limit,
            offset: start
        });
        let data=getPaginatedData (list,page,limit,count);
        return {
            status: !!data,
            message: data? "Success":"Data not found",
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


//GET ORDER SERVICE
const getOrderService=async (params) => {
    try {
        let payload={
            ...params,
            isDeleted: false
        };
        if(params.id) payload.id=params.id;
        let findProduct=await order.findOne({where: payload});
        let product_Ids=await findProduct.productIds.map(async (d) => await getProductService({productId:d.id}));
        let productData=await Promise.all(product_Ids).then((prod) => prod.map(d => d.data));
        findProduct.productIds = findProduct.productIds.map(productId => {
            let product = productData.find(product => product.productId === productId.id);
        return {
            id: productId.id,
            quantity: productId.quantity,
            productName: product.productName,
            brand: product.brand,
            price: product.price
        }
        });
        if(!findProduct) {
            return {
                status: false,
                statusCode: 404,
                message: "Data not found",
                data: []
            };
        }
        return {
            status: true,
            statusCode: 200,
            message: "Success",
            data: findProduct
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


//ORDER DATA COUNT SERVICE
const orderDataCountService=async()=>{
    try{
        let start = new Date();
        start.setHours(0, 0, 0, 0);
    
        let ORDER_DATA;
        let TOTAL=await order.findAndCountAll({where:{isDeleted:false}});
        let TODAY=await order.findAndCountAll(
            {
            where:{
                [Op.and]:
                [
                    {isDeleted:false,
                        createdAt: {
                            [Op.gte]: start
                            }
                        }
                    ]
                }
            }
        );
        let DELETED=await order.findAndCountAll({where:{isDeleted:true}});
        ORDER_DATA={
            TOTAL,
            TODAY,
            DELETED
        };
        return {
            status: true,
            statusCode: 200,
            message: "Success",
            data: ORDER_DATA
        };

    }
    catch(error){
        return {
            status: false,
            statusCode: 500,
            message: error.message,
            data: []
        };
    }
}


module.exports={
    createOrderService,
    updateOrderService,
    orderListService,
    getOrderService,
    orderDataCountService
}