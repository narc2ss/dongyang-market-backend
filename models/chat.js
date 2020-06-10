import Sequelize from "sequelize";

export default (sequelize) => {
  const Chat = sequelize.define(
    "Chat",
    {
      chatSender: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      chatRecevier: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      chatContent: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );

  Chat.associate = (db) => {
    db.Chat.belongsToMany(db.User, { through: "UserChat", as: "ChatList" });
  };

  return Chat;
};
