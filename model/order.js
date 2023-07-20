module.exports = function (sequelize, DataType) {
    const Order = sequelize.define('Order', {
      oId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      pId: {
        type: DataType.INTEGER
      },
      id: {
        type: DataType.INTEGER
      },
      description: {
        type: DataType.STRING
      },        
      createdBy: {
        type: DataType.INTEGER
      },
      updatedBy: {
        type: DataType.INTEGER
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
      tableName: 'orders'
    })
  
    Order.associate = function (models) {
      models.Order.belongsTo(models.User, {
        foreignKey: 'id',
        as:"userDetails"
      })
     
      models.Order.belongsTo(models.Product, {
        foreignKey: 'pId',
        as:"productDetails"
      })
     
    }
    return Order
  }
  