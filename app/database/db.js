const Sequelize = require('Sequelize');
const sequelize = new Sequelize('playlist', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
	username : "root",
    schema   : "sequelize_test",
    password : ""
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.export = sequelize;