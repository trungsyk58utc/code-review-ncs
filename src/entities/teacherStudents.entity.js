const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "TeacherStudent",
  tableName: "teacher_students",
  columns: {
    teacherId: {
      name: "teacher_id",
      type: "int",
      primary: true
    },
    studentId: {
      name: "student_id",
      type: "int",
      primary: true
    }
  },
  relations: {
    teacher: {
      target: "Teacher",
      type: "many-to-one",
      joinColumn: { name: "teacher_id" },
      onDelete: "CASCADE"
    },
    student: {
      target: "Student",
      type: "many-to-one",
      joinColumn: { name: "student_id" },
      onDelete: "CASCADE"
    }
  }
});
