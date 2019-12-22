import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateTblTwitHasTag1576837070107 implements MigrationInterface {
    private static tblName = 'tbl_twit_has_tag';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: CreateTblTwitHasTag1576837070107.tblName,
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
                    name: 'tag_id',
                    type: 'int',
                    width: 11,
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
        }), true);

        await queryRunner.createForeignKey( CreateTblTwitHasTag1576837070107.tblName, new TableForeignKey({
            columnNames: ['twit_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tbl_twit',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey( CreateTblTwitHasTag1576837070107.tblName, new TableForeignKey({
            columnNames: ['tag_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tbl_tag',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(CreateTblTwitHasTag1576837070107.tblName);
    }

}
