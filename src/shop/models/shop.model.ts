import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Recipient } from "../../recipient/models/recipient.model";
import { Category } from "../../category/models/category.model";
import { Order } from "../../order/models/order.model";

interface IShopCreationAttr {
  name: string;
  count: number;
  price: number;
  title: string;
  description: string;
  recipientId: number;
  categoryId: number;
}

@Table({ tableName: "shop" })
export class Shop extends Model<Shop, IShopCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(),
    allowNull: true,
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare count: number;

  @Column({
    type: DataType.DECIMAL(8,2),
    allowNull: true,
  })
  declare price: number;

  @Column({
    type: DataType.STRING(),
    allowNull: true,
  })
  declare title: string;

  @Column({
    type: DataType.STRING(),
    allowNull: true,
  })
  declare description: string;

  @ForeignKey(() => Recipient)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare recipientId: number;

  @ForeignKey(()=>Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare categoryId: number;

  @BelongsTo(()=>Recipient)
  recipients:Recipient

  @BelongsTo(()=>Category)
  categorys:Category

  @HasMany(()=>Order)
  orders:Order[]
}
