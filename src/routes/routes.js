const { Router } = require("express");
const {
  suspendedStudentForTeacher,
  registerStudentsToTeacher,
  getListStudentRegisterForTeacher,
  getNotificationRecipients,
} = require("../controllers/controller");

const routes = Router();

routes.post("/suspend", suspendedStudentForTeacher);
routes.post("/register", registerStudentsToTeacher);
routes.get("/commonstudents", getListStudentRegisterForTeacher);
routes.get("/retrievefornotifications", getNotificationRecipients);

module.exports = routes;
