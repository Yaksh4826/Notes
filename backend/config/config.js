import dotenv from "dotenv";
dotenv.config();




const env ={
  
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONTEND_URL :process.env.FRONTEND_URL
}
export default env ;