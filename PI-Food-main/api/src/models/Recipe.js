const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    vegetarian: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    vegan: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    glutenFree: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
         allowNull: true,
         validate: {
            isUrl: false
          }
    },
    summary: {
      type: DataTypes.TEXT,
         allowNull: true
    },
    dietTags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    analyzedInstructions: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true
    }
  }, { timestamps: false });
};
