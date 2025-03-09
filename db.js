const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './names.db'
});

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const SpinList = sequelize.define('SpinList', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Name = sequelize.define('Name', {
  value: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

User.hasMany(SpinList, { foreignKey: 'UserId' });
SpinList.belongsTo(User, { foreignKey: 'UserId' });
SpinList.hasMany(Name, { foreignKey: 'SpinListId' });
Name.belongsTo(SpinList, { foreignKey: 'SpinListId' });

const initDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true })
    console.log('SQLite connected successfully');
  } catch (error) {
    console.error('SQLte connection error:', error);
  }
}

module.exports = {sequelize, User, SpinList, Name, initDB}
