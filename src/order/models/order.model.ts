import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../user/models/user.model";
import { Shop } from "../../shop/models/shop.model";

export enum Status {
  in_progress = "in_progress",
  completed = "completed",
  cancelled = "cancelled",
}

interface IOrderCreationAttr {
  locatin: string;
  userId: number;
  shopId: number;
  status: Status;
  quantity: number;
}

@Table({ tableName: "order" })
export class Order extends Model<Order, IOrderCreationAttr> {
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
  declare locatin: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @ForeignKey(() => Shop)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare shopId: number;

  @Column({
    type: DataType.ENUM(...Object.values(Status)),
    allowNull: false,
    defaultValue: Status.in_progress,
  })
  declare status: Status;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantity: number;


  @BelongsTo(()=>User)
  users:User

  @BelongsTo(()=>Shop)
  shops:Shop
}
