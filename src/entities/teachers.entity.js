const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Teacher",
  tableName: "teachers",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true
    },
    email: {
      type: "varchar",
      unique: true
    }
  },
  relations: {
    students: {
      target: "Student",
      type: "many-to-many",
      joinTable: {
        name: "teacher_students",
        joinColumn: { name: "teacher_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "student_id", referencedColumnName: "id" }
      }
    },
  }
});
