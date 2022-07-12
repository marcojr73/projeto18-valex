import dotenv from "dotenv";
import pg from "pg";
dotenv.config();
var Pool = pg.Pool;
var configDatabase = {
    connectionString: process.env.DATABASE_URL,
    ssl: {}
};
if (process.env.MODE = "PROD") {
    configDatabase.ssl = {
        rejectUnauthorized: false
    };
}
export var connection = new Pool({
    connectionString: process.env.DATABASE_URL
});
