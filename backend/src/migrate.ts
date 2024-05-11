import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
import drizzleConfig from "../drizzle.config";

const main = async () => {
  // const connection = postgres(process.env.DB_URL, { max: 1 });
  const connection = new pg.Client({
    connectionString: process.env.DB_URL,
  });
  // This will run migrations on the database, skipping the ones already applied
  await migrate(drizzle(connection), { migrationsFolder: drizzleConfig.out });

  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
};

main();
