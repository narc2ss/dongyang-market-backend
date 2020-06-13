import Sequelize from "sequelize";

export default (sequelize) => {
  const Post = sequelize.define(
    "Post",
    {
      postTitle: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      postPrice: {
        type: Sequelize.INTEGER(100).UNSIGNED,
        allowNull: false,
      },
      postDescription: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      postImages: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      postState: {
        type: Sequelize.ENUM("판매중", "예약중", "거래완료"),
        allowNull: false,
        defaultValue: "판매중",
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );

  Post.associate = (db) => {
    db.Post.belongsTo(db.User, { as: "User" });
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Liked" });
  };

  return Post;
};
