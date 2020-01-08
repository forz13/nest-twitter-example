import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTblTag1576830300705 implements MigrationInterface {
    private static tblName = 'tbl_tag';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: CreateTblTag1576830300705.tblName,
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
                        length: '20',
                        isUnique: true,
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
        await queryRunner.dropTable(CreateTblTag1576830300705.tblName);
    }
}
