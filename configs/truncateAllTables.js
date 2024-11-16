import { json, pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import { db } from "./index.js";

async function truncateAllTables() {
  try {
    // 1. Disable foreign key checks (for PostgreSQL)
    await db.execute("SET session_replication_role = replica");

    // 2. Truncate the tables in the correct order (CarImages first because it references CarListing)
    await db.execute("TRUNCATE TABLE carImages RESTART IDENTITY CASCADE");
    await db.execute("TRUNCATE TABLE carListing RESTART IDENTITY CASCADE");

    console.log(
      "Both CarListing and CarImages tables have been truncated successfully."
    );

    // 3. Re-enable foreign key checks
    await db.execute("SET session_replication_role = origin");
  } catch (err) {
    console.error("Error truncating tables:", err);
  } finally {
    // Close the database connection if necessary
    await db.close();
  }
}
