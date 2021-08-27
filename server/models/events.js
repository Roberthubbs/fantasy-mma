'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    link: DataTypes.STRING,
    date: DataTypes.DATE,
    title: DataTypes.STRING
  }, {});
  Events.associate = function(models) {
    // associations can be defined here
  };
  return Events;
};