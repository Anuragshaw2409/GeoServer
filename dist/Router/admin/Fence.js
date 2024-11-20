"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const db_1 = require("../../db");
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.post('/newfence', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newFence = yield db_1.prisma.fences.create({
            data: {
                name,
                points, // Ensure points align with your Prisma schema
            },
        });
        return res.status(201).json({ success: true, message: "Successfully added", fence: newFence });
    }
    catch (error) {
        console.error("Error creating fence:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}));
exports.adminRouter.get('/fence', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fence = yield db_1.prisma.fences.findMany({
            select: {
                points: true
            }
        });
        return res.json({ fence: fence[0] });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching fence" });
    }
}));
