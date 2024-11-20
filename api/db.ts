import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient();

export function dbConnect(){
   prisma.$connect()
   .then(()=>{
    console.log("Connected to database");    
   })
   .catch((err)=>{
    console.log("Error connecting database",err.message);
   })
}