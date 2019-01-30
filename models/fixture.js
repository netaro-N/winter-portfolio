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
  fixtureDate: {//19/09/2018 21:00
    type: Sequelize.DATE,
    allowNull:false
  },
  fixtureType: {//コパデルレイ
    type: Sequelize.TEXT,
    allowNull: false
  },
  fixtureDone:{//先の試合(0) or 表示させたい（試合開始2時間前〜次試合開始２時間前まで）試合(1) or 終了した試合(2)
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  homeTeam: {//レアル・マドリード
    type: Sequelize.TEXT,
    allowNull: false
  },
  awayTeam: {//ヘタフェ
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
    freezeTableName: true,
    timestamps: false,
  });

module.exports = Fixture;