const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()


interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReport)

interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportById)

interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReports)

interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)



module.exports = interviewRouter