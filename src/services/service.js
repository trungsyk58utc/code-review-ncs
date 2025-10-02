const {
  StudentRepo,
  TeacherStudentRepo,
  TeacherRepo,
} = require("../repositories");

const studentRepository = StudentRepo;
const teacherRepository = TeacherRepo;
const teacherStudentRepository = TeacherStudentRepo;

async function getTeacherByEmail(email) {
  const teacher = await teacherRepository.findOne({
    where: { email },
    select: ["id"],
  });
  if (!teacher) {
    throw new Error("Teacher not found");
  }
  return teacher;
}

async function suspendedStudent(email) {
  if (!email) {
    throw new Error("Student email is required");
  }
  const student = await studentRepository.findOneOrFail({
    where: { email, isSuspended: false },
    select: ["id", "isSuspended"],
  });
  if (!student.isSuspended) {
    await studentRepository.update(student.id, { isSuspended: true });
  }
}

async function registerStudent(data) {
  const { teacher, students } = data;

  if (!teacher) {
    throw new Error("Teacher email is required");
  }

  if (!Array.isArray(students) || students.length === 0) {
    throw new Error("Students must be an array");
  }

  const listAddRegister = [];
  const teacherEntity = await getTeacherByEmail(teacher);

  for (const studentEmail of students) {
    const student = await studentRepository.findOneOrFail({
      where: { email: studentEmail },
      and: { isSuspended: false },
      select: ["id"],
    });
    if (student) {
      listAddRegister.push({
        teacherId: teacherEntity.id,
        studentId: student.id,
      });
    }
  }
  if (listAddRegister.length === 0) {
    throw new Error("No valid students to register");
  } else {
    await teacherStudentRepository.save(listAddRegister);
  }
}

async function getListStudentRegisteredToTeacher(
  teacherEmail,
  checkSuspended = false
) {
  if (!teacherEmail) {
    throw new Error("At least one teacher is required");
  }
  const teacher = await getTeacherByEmail(teacherEmail);

  const listStudentOfTeacherQuery = teacherStudentRepository
    .createQueryBuilder("studentOfTeacher")
    .leftJoinAndSelect("studentOfTeacher.student", "student")
    .where("studentOfTeacher.teacherId = :teacherId", { teacherId: teacher.id })
    .select(["student.email", "studentOfTeacher.teacherId"]);

  if (checkSuspended) {
    listStudentOfTeacherQuery.andWhere("student.isSuspended = :isSuspended", {
      isSuspended: false,
    });
  }

  const listStudentOfTeacher = await listStudentOfTeacherQuery.getMany();
  return { students: listStudentOfTeacher.map((ts) => ts.student.email) };
}

async function retriveNotificationRecipients(teacherEmail, notification) {
  if (!notification) {
    throw new Error("Notification message is required");
  }

  if (!teacherEmail) {
    throw new Error("Teacher email is required");
  }
  const teacher = await getListStudentRegisteredToTeacher(teacherEmail, true);

  const mentionedEmails = (notification.match(/@\S+/g) || []).map((email) =>
    email.substring(1)
  );

  const nonRecipientsOfTeacher = mentionedEmails.filter(
    (email) => !teacher.students.includes(email)
  );

  const checkListStudentMentioned = await studentRepository
    .createQueryBuilder("student")
    .where("student.email IN (:...emails)", { emails: nonRecipientsOfTeacher })
    .andWhere("student.isSuspended = :isSuspended", { isSuspended: false })
    .select(["student.email"])
    .getMany();

  return {
    recipients: [
      ...checkListStudentMentioned.map((student) => student.email),
      ...teacher.students,
    ],
  };
}

module.exports = {
  suspendedStudent,
  registerStudent,
  getListStudentRegisteredToTeacher,
  retriveNotificationRecipients,
};
