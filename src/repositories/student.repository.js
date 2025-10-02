const { Database } = require("../db/database");
const studentsEntity = require("../entities/students.entity");

module.exports = Database.getRepository(studentsEntity);
