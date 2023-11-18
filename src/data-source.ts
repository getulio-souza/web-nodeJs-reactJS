import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "./entity/User"
import { Tasks } from "./entity/Tasks"
import "dotenv/config";

const getBDConfig = (json: any) => {
  const newObj = {}
  for (const prop in json) {
    if (!prop.startsWith("DB_")) {
      continue;
    }
    const newProp = prop.substring(prop.indexOf("_") + 1).toLowerCase();
    newObj[newProp] = json[prop]
  }
  return newObj
}

const config = getBDConfig(process.env) as DataSourceOptions

export const AppDataSource = new DataSource({
    ...config,
    synchronize: true,
    logging: false,
    entities: [User, Tasks],
    migrations: [],
    subscribers: [],
})
