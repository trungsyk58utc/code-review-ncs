const { Database} = require("../db/database");
const teachersEntity = require("../entities/teachers.entity");

module.exports = Database.getRepository(teachersEntity);
