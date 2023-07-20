module.exports = function (sequelize, DataType) {
    const Product = sequelize.define('Product', {
      pId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      productNo: {
        type: DataType.INTEGER
      },   
      productName: {
        type: DataType.STRING
      },   
      productDesc: {
        type: DataType.STRING
      },   
      createdAt: {
        type: DataType.DATE
      },
      updatedAt: {
        type: DataType.DATE
      },
      createdBy: {
        type: DataType.INTEGER
      },
      updatedBy: {
        type: DataType.INTEGER
      },
      productPrice: {
        type: DataType.INTEGER
      },
      status:{
        type:DataType.STRING
      }
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'product'
    })
  
    Product.associate = function (models) {
      models.Product.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as:"UserDetails"
      })
     
    }
    return Product
  }
  