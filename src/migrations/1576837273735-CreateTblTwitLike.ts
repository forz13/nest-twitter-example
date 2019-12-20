import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateTblTwitLike1576837273735 implements MigrationInterface {
    private static tblName = 'tbl_twit_like';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: CreateTblTwitLike1576837273735.tblName,
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
                    name: 'twit_id',
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
        }), true);

        await queryRunner.createForeignKey( CreateTblTwitLike1576837273735.tblName, new TableForeignKey({
            columnNames: ['twit_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tbl_twit',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey( CreateTblTwitLike1576837273735.tblName, new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tbl_user',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(CreateTblTwitLike1576837273735.tblName);
    }

}
