import { table } from "console";
import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableRecados1625528499282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'recados',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '200',
                        isNullable: false,
                    },
                    {
                        name: "detalhamento",
                        type: 'varchar',
                        length: '200',
                        isNullable: true,
                    },
                ],
            })
        );
        await queryRunner.createForeignKey(
            "recados",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE"
            })
        );
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("recados");
    }

}
