module.exports=(sequelize, Sequelize) => {
    const products=sequelize.define("products", {
        productId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        brand: {
            type: Sequelize.STRING
        },
        price: {
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
        })
    return products
}