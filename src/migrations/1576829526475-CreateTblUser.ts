import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTblUser1576829526475 implements MigrationInterface {
    private static tblName = 'tbl_user';
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: CreateTblUser1576829526475.tblName,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        width: 11,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '100',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'create_date',
                        type: 'int',
                        width: 11,
                    },
                    {
                        name: 'update_date',
                        type: 'int',
                        width: 11,
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(CreateTblUser1576829526475.tblName);
    }
}
