import dotenv from "dotenv";

dotenv.config();

const development = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: process.env.MYSQL_DIALECT,
};
const production = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: process.env.MYSQL_DIALECT,
  port: process.env.MYSQL_PORT,
};
const test = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE_TEST,
  host: process.env.MYSQL_HOST,
  dialect: process.env.MYSQL_DIALECT,
  port: process.env.MYSQL_PORT,
};

export { development, production, test };
