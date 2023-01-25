const {Op}=require("sequelize");
const csv=require('csvtojson');
const db=require('../models');
const {getPaginatedData}=require("../utils/pagination");
const product=db.products;


//PRODUCT CREATION SERVICE
const createProductService=async (params={}) => {
    try {
        let User=await product.create(params);
        return {
            status: true,
            statusCode: 200,
            message: "Success",
            data: User
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


//PRODUCT UPDATION SERVICE
const updateProductService=async (productId, params) => {
    try {
        let payload={
            productId: productId,
            isDeleted: false
        };
        let update=await product.update({
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


//PRODUCTS LIST SERVICE
const productListService=async (pageData) => {
    try {
        let page=pageData.page? parseInt(pageData.page):1;
        let limit=pageData.limit? parseInt(pageData.limit):10;
        let start=(page-1)*limit;
        let searchCondition={}
        if(pageData.search) {
            searchCondition={
                ...searchCondition,
                [Op.and]: [
                    {
                        [Op.or]: [
                            {productName: {[Op.like]: `%${pageData.search}%`}},
                            {category: {[Op.like]: `%${pageData.search}%`}},
                            {brand: {[Op.like]: `%${pageData.search}%`}}
                        ]
                    }
                ]
            }
        }
        let count=await product.count({
            where: {
                [Op.and]: [{...searchCondition}, {isDeleted: false}]
            }
        })
        let list=await product.findAll({
            where: {
                [Op.and]: [{...searchCondition}, {isDeleted: false}]
            },
            limit: limit,
            offset: start
        });
        let data=getPaginatedData(list, page, limit, count);
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


//GET PRODUCT SERVICE
const getProductService=async (params) => {
    try {
        let payload={
            ...params,
            isDeleted: false
        };
        if(params.productId) payload.productId=params.productId;
        let findProduct=await product.findOne({where: payload});
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


//BULK UPLOAD PRODUCT DATA SERVICE
const bulkUploadProductDataService=async (filePath) => {
    try {
        return csv().fromFile(filePath).then(async (csvfile) => {
            await product.bulkCreate(csvfile, {updateOnDuplicate: ["productName", "category", "brand", "price", "isDeleted"]}, {raw: true});
            return {
                status: true,
                statusCode: 200,
                message: "Data inserted successfully",
                data: []
            };
        })
    } catch(error) {
        console.log(error);
        return {
            status: false,
            statusCode: 500,
            message: error.message,
            data: []
        };
    }
}

module.exports={
    createProductService,
    updateProductService,
    productListService,
    getProductService,
    bulkUploadProductDataService
}