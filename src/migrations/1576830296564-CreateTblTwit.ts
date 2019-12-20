import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateTblTwit1576830296564 implements MigrationInterface {
    private static tblName = 'tbl_twit';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: CreateTblTwit1576830296564.tblName,
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
                    name: 'text',
                    type: 'varchar',
                    length: '280',
                },
                {
                    name: 'user_id',
                    type: 'int',
                    length: '11',
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

        await queryRunner.createForeignKey( CreateTblTwit1576830296564.tblName, new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tbl_user',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(CreateTblTwit1576830296564.tblName);
    }

}
