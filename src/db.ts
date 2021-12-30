import { Sequelize } from "sequelize-typescript";
import fs from "fs";

const database = "test";

const sqlite = (): Sequelize => {
  return new Sequelize({
    dialect: "sqlite",
    database,
    storage: "database.db",
    models: [__dirname + "/model"],
    modelMatch: (filename: string, member: string): boolean => {
      return (
        filename.substring(0, filename.indexOf(".model")) ===
        member.toLowerCase()
      );
    },
    dialectOptions: {
      multipleStatements: true,
    },
    define: {
      underscored: true,
    },
  });
};

const init = (): Sequelize => sqlite();

export default {
  init,
};
