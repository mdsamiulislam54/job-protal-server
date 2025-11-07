"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createUser_1 = require("../controllers/Authentication/createUser");
const loginUser_1 = require("../controllers/Authentication/loginUser");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Hello route");
});
router.post('/create-user', createUser_1.CreateUser);
router.post('/login', loginUser_1.LoginUser);
exports.default = router;
