"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const route_1 = __importDefault(require("./routes/route"));
const errorHandling_1 = require("./middlewares/ErrorHandling/errorHandling");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_1.connectDB)().then(() => {
    console.log("Database connection established");
}).catch((err) => {
    console.error("Database connection failed:", err);
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.use('/api', route_1.default);
app.use(errorHandling_1.errorHandler);
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route Not Found" });
});
