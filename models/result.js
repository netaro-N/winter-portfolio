'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Result = loader.database.define('results', {
  fixtureId: {//連番
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  homeScore: {//
    type: Sequelize.INTEGER,
    allowNull: false
  },
  awayScore: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
    freezeTableName: true,
    timestamps: false,
  });

module.exports = Result;