const { Database} = require("../db/database");
const TeachersEntity = require("../entities/Teachers.entity");

module.exports = Database.getRepository(TeachersEntity);
