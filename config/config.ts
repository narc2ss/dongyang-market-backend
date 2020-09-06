import * as dotenv from "dotenv";
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

type Config = {
  username: string;
  password: string;
  database: string;
  host: string;
  [key: string]: string;
};

interface IConfigGroup {
  development: Config;
  test: Config;
  production: Config;
}

const config: IConfigGroup = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mariadb",
    timezone: "+09:00",
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mariadb",
    timezone: "Asia/soul",
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mariadb",
    timezone: "Asia/soul",
  },
};

export default config;
