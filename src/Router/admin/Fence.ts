import { Router,Request,Response } from "express";
import { prisma } from "../../db";
export const adminRouter:Router = Router();


adminRouter.post('/newfence',async(req,res)=>{
    try {
        const points = req.body.points;
        const name = req.body.name;

        // Validate input
        if (!points || !Array.isArray(points)) {
            return res.status(400).json({ success: false, message: "Points are required and must be an array." });
        }

        //[[..,..],[..,..]]
        points.push(points[0]);
        // Create new fence
        const newFence = await prisma.fences.create({
            data: {
                name,
                points, // Ensure points align with your Prisma schema
            },
        });

        return res.status(201).json({ success: true, message: "Successfully added", fence: newFence });
    } catch (error) {
        console.error("Error creating fence:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

adminRouter.get('/fence',async(req:Request,res:Response)=>{

    try {
        
        const fence = await prisma.fences.findMany({
            select: {
            points: true
        }
    });
    return res.json({fence:fence[0]});
} catch (error) {
    return res.status(500).json({success:false, message:"Error fetching fence"});
    
}
})
