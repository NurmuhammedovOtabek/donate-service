import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Donate } from "../../donate/models/donate.model";
import { Order } from "../../order/models/order.model";

interface IUserCreationAttr{
    full_name:string
    email:string
    password:string
    card_number:string
}

@Table({ tableName: "user" })
export class User extends Model<User, IUserCreationAttr> {
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
    unique: true,
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
  declare is_active: boolean;

  @Column({
    type: DataType.STRING(),
  })
  declare card_number: string;

  @Column({
    type: DataType.STRING(),
  })
  declare token: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

  @HasMany(() => Donate)
  donates: Donate[];

  @HasMany(() => Order)
  orders: Order[];
}
