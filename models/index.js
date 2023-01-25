const Sequelize=require('sequelize');

const sequelize=new Sequelize('e-commerce', 'root', '$lh50155015', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 7,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch(err => {
    console.log('Database connection failed: '+ err);
  })

// sequelize.sync({force: true})
//   .then(() => {
//     console.log('yes re-sync done!');
//   })


const db={};

db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.users=require('./user')(sequelize, Sequelize);
db.products=require('./product')(sequelize, Sequelize);
db.orders=require('./order')(sequelize, Sequelize);

module.exports=db;