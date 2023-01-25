module.exports=(sequelize, Sequelize) => {
    const orders=sequelize.define("orders", {
        customerId: {
            type: Sequelize.INTEGER
        },
        productIds: {
            type: Sequelize.JSON
        },
        address: {
            type: Sequelize.STRING
        },
        totalAmount: {
            type: Sequelize.INTEGER
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    },
        {
            freezeTableName: true,
            timestamps: true
        });

    // orders.associate=function(models) {
    //     orders.hasMany(models.products, {
    //         foreignKey: "productId",
    //         sourceKey: "productId",
    //         as: "products"
    //     }),
    //         orders.hasMany(models.users, {
    //             foreignKey: "id",
    //             sourceKey: "customerId",
    //             as: "customer"
    //         })
    // };

    return orders;
}