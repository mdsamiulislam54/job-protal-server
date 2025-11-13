"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostApplication = void 0;
const applicationModel_1 = __importDefault(require("../../models/ApplicationModel/applicationModel"));
const PostApplication = async (req, res, next) => {
    try {
        const applicationData = req.body;
        const application = await applicationModel_1.default.insertOne(applicationData);
        res.status(200).send({ message: "Application posted Successfully!", application });
    }
    catch (error) {
        next(error);
    }
};
exports.PostApplication = PostApplication;
