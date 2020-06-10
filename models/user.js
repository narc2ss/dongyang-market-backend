import Sequelize from "sequelize";

export default (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      userPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false,
      },
      userEmail: {
        type: Sequelize.STRING(320),
        allowNull: false,
        unique: true,
      },
      userProfileImage: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post, { as: "Post" });
    db.User.belongsToMany(db.Chat, { through: "UserChat", as: "ChatList" });
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
  };
  return User;
};
