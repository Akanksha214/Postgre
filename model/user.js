module.exports = function (sequelize, DataType) {
  const User = sequelize.define('User', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    contactNo: {
      type: DataType.INTEGER
    },   
    name: {
      type: DataType.STRING
    },   
    createdAt: {
      type: DataType.DATE
    },
    updatedAt: {
      type: DataType.DATE
    },
    status:{
      type:DataType.STRING
    }
  },
  {
    timestamps: true,
    underscored: true,
    tableName: 'users'
  })

  User.associate = function (models) {
    // models.User.belongsTo(models.UserSession, {
    //   foreignKey: 'userId'
    // })
   
  }
  return User
}
