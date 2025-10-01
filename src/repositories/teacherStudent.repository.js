const { Database} = require("../db/database");
const teacherStudentsEntity = require("../entities/teacherStudents.entity");

module.exports = Database.getRepository(teacherStudentsEntity);
