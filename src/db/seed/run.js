const { Database } = require("../database");
const { StudentRepo, TeacherRepo } = require("../../repositories");
const studentsData = require("../data/student.json");
const teachersData = require("../data/teacher.json");

async function seedDatabase() {
    await Database.initialize();
    const studentRepo = StudentRepo;
    const teacherRepo = TeacherRepo;

    const [studentCount, teacherCount] = await Promise.all([
        studentRepo.count(),
        teacherRepo.count()
    ]);

    if (studentCount > 0 && teacherCount > 0) {
        console.log("Database already seeded. Exiting.");
        process.exit(0);
    } else {
        await Promise.all([
            studentRepo.save(studentsData),
            teacherRepo.save(teachersData)
        ]);
        process.exit(0);
    }

}
seedDatabase().then(() => {
    console.log("Database seeded with initial students and teachers.");
    process.exit(1);
}).catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
});