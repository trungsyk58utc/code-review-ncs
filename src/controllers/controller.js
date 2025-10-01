const {
  suspendedStudent,
  registerStudent,
  getListStudentRegisteredToTeacher,
  retriveNotificationRecipients,
} = require("../services/service");

async function suspendedStudentForTeacher(req, res) {
  const { email } = req.body;
  try {
    await suspendedStudent(email);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: "Some meaningful error message" });
  }
}

async function registerStudentsToTeacher(req, res) {
  const { teacher, students } = req.body;
  try {
    await registerStudent({ teacher, students });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: "Some meaningful error message" });
  }
}

async function getListStudentRegisterForTeacher(req, res) {
  const { teacher } = req.query;
  try {
    const students = await getListStudentRegisteredToTeacher(teacher);
    res.json(students);
  } catch (error) {
    res.status(400).json({ message: "Some meaningful error message" });
  }
}

async function getNotificationRecipients(req, res) {
  const { teacher, notification } = req.body;
  try {
    const recipients = await retriveNotificationRecipients(teacher, notification);
    res.json(recipients);
  } catch (error) {
    res.status(400).json({ message: "Some meaningful error message" });
  }
}

module.exports = {
  suspendedStudentForTeacher,
  registerStudentsToTeacher,
  getListStudentRegisterForTeacher,
  getNotificationRecipients,
};
