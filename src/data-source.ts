import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "suleiman.db.elephantsql.com",
    port: 5432,
    username: "sqbxwtho",
    password: "xSEV5g9oLioR6XGsCK5WucnjKI19G5EB",
    database: "sqbxwtho",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
