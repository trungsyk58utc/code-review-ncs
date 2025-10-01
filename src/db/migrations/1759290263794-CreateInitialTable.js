const { MigrationInterface, QueryRunner } = require("typeorm");

class CreateInitialTable1759290263794 {
    name = 'CreateInitialTable1759290263794'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`teachers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_7568c49a630907119e4a665c60\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`teacher_students\` (\`teacher_id\` int NOT NULL, \`student_id\` int NOT NULL, PRIMARY KEY (\`teacher_id\`, \`student_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`students\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`isSuspended\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_25985d58c714a4a427ced57507\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE INDEX \`IDX_328c82890a2e85fca6e82f49a5\` ON \`teacher_students\` (\`teacher_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_8378666b935ffb8f64262580fc\` ON \`teacher_students\` (\`student_id\`)`);
        await queryRunner.query(`ALTER TABLE \`teacher_students\` ADD CONSTRAINT \`FK_328c82890a2e85fca6e82f49a5c\` FOREIGN KEY (\`teacher_id\`) REFERENCES \`teachers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`teacher_students\` ADD CONSTRAINT \`FK_8378666b935ffb8f64262580fc4\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`teacher_students\` DROP FOREIGN KEY \`FK_8378666b935ffb8f64262580fc4\``);
        await queryRunner.query(`ALTER TABLE \`teacher_students\` DROP FOREIGN KEY \`FK_328c82890a2e85fca6e82f49a5c\``);
        await queryRunner.query(`DROP INDEX \`IDX_8378666b935ffb8f64262580fc\` ON \`teacher_students\``);
        await queryRunner.query(`DROP INDEX \`IDX_328c82890a2e85fca6e82f49a5\` ON \`teacher_students\``);
        await queryRunner.query(`DROP INDEX \`IDX_25985d58c714a4a427ced57507\` ON \`students\``);
        await queryRunner.query(`DROP TABLE \`students\``);
        await queryRunner.query(`DROP TABLE \`teacher_students\``);
        await queryRunner.query(`DROP INDEX \`IDX_7568c49a630907119e4a665c60\` ON \`teachers\``);
        await queryRunner.query(`DROP TABLE \`teachers\``);
    }

}

module.exports = CreateInitialTable1759290263794