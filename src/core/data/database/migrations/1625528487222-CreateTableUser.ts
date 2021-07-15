import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableUser1625528487222 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '20',
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
            ]
        })
    )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
