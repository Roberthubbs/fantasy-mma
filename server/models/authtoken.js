'use strict';
module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define('AuthToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  AuthToken.associate = function ({ Player }) {
    AuthToken.belongsTo(Player);
  };

  AuthToken.generate = async function (UserId) {
    if (!UserId) {
      throw new Error('AuthToken requires a user ID')
    };
    let token = '';

    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 15; i++) {
      token += possibleChars.charAt(
        Math.floor(Math.random() * possibleChars.length)
      );
    };
    return AuthToken.create({ token, UserId });
  }
  return AuthToken;
};