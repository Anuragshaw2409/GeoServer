"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Fence_1 = require("./Router/admin/Fence");
const Attendance_1 = require("./Router/user/Attendance");
(0, db_1.dbConnect)();
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*"
}));
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Test route
app.get('/', (req, res) => {
    res.send('Server Working Fine');
});
// New Fence Route
app.use('/api/v1/admin', Fence_1.adminRouter);
app.use('/api/v1/user', Attendance_1.userRouter);
