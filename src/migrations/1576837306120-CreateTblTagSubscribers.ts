import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTblTagSubscribers1576837306120 implements MigrationInterface {
    private static tblName = 'tbl_tag_subscribers';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: CreateTblTagSubscribers1576837306120.tblName,
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
                        name: 'tag_id',
                        type: 'int',
                        width: 11,
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                        width: 11,
                    },
                    {
                        name: 'created_date',
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

        await queryRunner.createForeignKey(
            CreateTblTagSubscribers1576837306120.tblName,
            new TableForeignKey({
                columnNames: ['tag_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'tbl_tag',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            CreateTblTagSubscribers1576837306120.tblName,
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'tbl_user',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(CreateTblTagSubscribers1576837306120.tblName);
    }
}
