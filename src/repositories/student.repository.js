const { Database } = require("../db/database");
const StudentsEntity = require("../entities/Students.entity");

module.exports = Database.getRepository(StudentsEntity);
