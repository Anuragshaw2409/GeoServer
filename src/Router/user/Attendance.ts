import { Router } from "express";
import { Request,Response } from "express";
export const userRouter = Router();
import { booleanPointInPolygon } from "@turf/turf";
import * as turf from '@turf/turf'
import { prisma } from "../../db";


userRouter.post('/isinside',async(req:Request,res:Response)=>{

try {
  
  const points = turf.point(req.body.points);
  
  const fence = await prisma.fences.findMany({
    select:{
      points:true
    }
  });
  if(!fence)
    return res.json({isInside:false});
  const array = [fence[0].points as []];
  
  var poly = turf.polygon(array);
  
  const isInside = booleanPointInPolygon(points, poly);
  return res.json({isInside});
  
  
} catch (error) {
  console.log(error);
  
 return res.status(500).json({message:"Error"}) 
}

})