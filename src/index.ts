import { dbConnect } from "./db";
import  express, { Request, Response } from 'express';
import { Express } from "express";
import cors from 'cors';
import { prisma } from "./db";
import { adminRouter } from "./Router/admin/Fence";
import { userRouter } from "./Router/user/Attendance";

dbConnect();

export const app :Express= express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: "*"
    })
);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Test route
app.get('/', (req, res) => {
    res.send('Server Working Fine');
});

// New Fence Route
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/user', userRouter);
