module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("image", {
    
    name: {
      type: DataTypes.JSON,
    },
   
    path: {
      type: DataTypes.STRING,
    },

    dataset:{
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING
    },
    model: {
      type: DataTypes.STRING
    }

  });

  return Image;
};
