import { Sequelize } from "sequelize";

const sequelize = new Sequelize("health_declare_db", "postgres", "password", {
  host: "db",
  port: 5432,
  dialect: "postgres",
});

export default sequelize;
