import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import net from "node:net";

// Adjust Happy Eyeballs auto-select timeout for Node 20+ on Windows / slow connections
if (net.setDefaultAutoSelectFamilyAttemptTimeout) {
  net.setDefaultAutoSelectFamilyAttemptTimeout(1000);
}

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
