"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
function dbConnect() {
    exports.prisma.$connect()
        .then(() => {
        console.log("Connected to database");
    })
        .catch((err) => {
        console.log("Error connecting database", err.message);
    });
}
exports.dbConnect = dbConnect;
