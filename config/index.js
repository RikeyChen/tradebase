import { config } from 'dotenv';

config();

export default {
  port: process.env.PORT,
  databaseURI: process.env.DATABASE_URI
}