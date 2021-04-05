// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Player extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Player.init({
//     username: DataTypes.STRING,
//     password: DataTypes.STRING,
//     passwordHash: DataTypes.STRING,
//     waiverLeft: DataTypes.INTEGER,
//     pointTotal: DataTypes.DECIMAL,
//     league: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Player',
//   });
//   return Player;
// };



const bcrypt = require('bcrypt');
'use strict';
module.exports = (sequelize, DataTypes) => {

  const Player = sequelize.define('Player', {

    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    waiverLeft: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pointTotal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    league: {
      type: DataTypes.INTEGER
    }
  }, {});
  Player.associate = function ({ AuthToken }) {
    Player.hasMany(AuthToken);
  };

  Player.authenticate = async function (name, password) {

    let user = await Player.findOne({ where: { username: name } })

    if (bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    };
    throw new Error(['invalid password or username']);


  }

  Player.prototype.authorize = async function () {
    const { AuthToken } = sequelize.models;
    const user = this;
    const authToken = await AuthToken.generate(this.id);
    const id = this.id
    await user.addAuthToken(authToken);
    return { user, authToken };
  }

  Player.prototype.logout = async function (token) {
    sequelize.models.AuthToken.destroy({ where: { token } });
  };

  return Player;
};