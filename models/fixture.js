'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Fixture = loader.database.define('fixtures', {
  fixtureId: {//連番
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    allowNull: false
  },
  fixtureDate: {//20190129
    type: Sequelize.DATE,
  },
  fixtureName: {//madrid-vs-atmadrid
    type: Sequelize.STRING,
    allowNull: false
  },
  fixtureDone:{//先の試合(0) or 次の（今の）試合(1) or 終了した試合(2)
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
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