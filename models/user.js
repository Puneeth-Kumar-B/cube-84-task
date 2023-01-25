module.exports=(sequelize, Sequelize) => {
    const users=sequelize.define("users", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phoneNo: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            default: false
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
    return users
}