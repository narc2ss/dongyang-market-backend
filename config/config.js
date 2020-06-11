import dotenv from "dotenv";

dotenv.config();

const development = {
  username: process.env.MYSQL_DEV_USERNAME,
  password: process.env.MYSQL_DEV_PASSWORD,
  database: process.env.MYSQL_DEV_DATABASE,
  host: process.env.MYSQL_DEV_HOST,
  dialect: process.env.MYSQL_DEV_DIALECT,
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
  username: process.env.MYSQL_TEST_USERNAME,
  password: process.env.MYSQL_TEST_PASSWORD,
  database: process.env.MYSQL_TEST_DATABASE,
  host: process.env.MYSQL_TEST_HOST,
  dialect: process.env.MYSQL_TEST_DIALECT,
  port: process.env.MYSQL_TEST_PORT,
};

export { development, production, test };
