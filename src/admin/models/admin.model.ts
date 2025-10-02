import { Column, DataType, Model, Table } from "sequelize-typescript"

interface IAdminCreationAttr{
    full_name: string
    email:string
    password:string
    is_creator:boolean
    is_active:boolean
}

@Table({ tableName: "admin" })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare is_creator: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare is_active: boolean;


  @Column({
    type: DataType.STRING(),
  })
  declare token: string;
}
