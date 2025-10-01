const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Student",
  tableName: "students",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true
    },
    email: {
      type: "varchar",
      unique: true
    },
    isSuspended: {
      type: "boolean",
      default: false
    }
  },
  relations: {
    teachers: {
      target: "Teacher",
      type: "many-to-many",
      mappedBy: "students"
    },
  }
});