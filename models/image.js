import Sequelize from "sequelize";

export default (sequelize) => {
  const Image = sequelize.define(
    "Image",
    {
      imageSrc: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Image.associate = (db) => {
    db.Image.belongsTo(db.User);
  };

  return Image;
};
