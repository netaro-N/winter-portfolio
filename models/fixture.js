'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Fixture = loader.database.define('fixtures', {
  fixtureDate: {//20190129
    type: Sequelize.DATE,
    primaryKey: true,
    allowNull: false
  },
  fixture: {//madrid-vs-atmadrid
    type: Sequelize.STRING,
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

module.exports = Fixture;