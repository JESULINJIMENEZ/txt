const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Homologation = sequelize.define('homologation', {
  hom_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  sap_code: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  descripion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  micros_code: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  is_pizza: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  pizza_size: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  pizza_distribution: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  is_combo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  level1: { type: DataTypes.TEXT, allowNull: true },
  level2: { type: DataTypes.TEXT, allowNull: true },
  level3: { type: DataTypes.TEXT, allowNull: true },
  level4: { type: DataTypes.TEXT, allowNull: true },
  level5: { type: DataTypes.TEXT, allowNull: true },
  level6: { type: DataTypes.TEXT, allowNull: true },
  level7: { type: DataTypes.TEXT, allowNull: true },
  level8: { type: DataTypes.TEXT, allowNull: true },
  level9: { type: DataTypes.TEXT, allowNull: true },
  level10: { type: DataTypes.TEXT, allowNull: true },
  level11: { type: DataTypes.TEXT, allowNull: true },
  level12: { type: DataTypes.TEXT, allowNull: true },
  level13: { type: DataTypes.TEXT, allowNull: true },
  level14: { type: DataTypes.TEXT, allowNull: true },
  level15: { type: DataTypes.TEXT, allowNull: true },
  level16: { type: DataTypes.TEXT, allowNull: true },
  level17: { type: DataTypes.TEXT, allowNull: true },
  level18: { type: DataTypes.TEXT, allowNull: true },
  level19: { type: DataTypes.TEXT, allowNull: true },
  level20: { type: DataTypes.TEXT, allowNull: true },
  is_service: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'homologation',
  timestamps: false
});

module.exports = Homologation;