import { Column, DataType, Model, Table } from "sequelize-typescript";

export enum Payment_method {
  payme = "payme",
  click = "click",
  uzum = "uzum",
}

export enum PStatus {
  pending = "pending",
  success = "success",
  failed = "failed",
  refunded = "refunded",
}

interface IPaymentCreationAttr {
  userId: number;
  donateId: number;
  orderId: number;
  payment_method: Payment_method;
  status: PStatus;
  amount: number;
  payment_date: Date;
}

@Table({ tableName: "payment" })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;
  @Column({
    type: DataType.INTEGER,
  })
  declare userId: number;
  @Column({
    type: DataType.INTEGER,
  })
  declare donateId: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare orderId: number;

  @Column({
    type: DataType.ENUM(...Object.values(Payment_method)),
    defaultValue: Payment_method.payme,
  })
  declare payment_method: Payment_method;

  @Column({
    type: DataType.ENUM(...Object.values(PStatus)),
    defaultValue: PStatus.success,
  })
  declare status: PStatus;

  @Column({
    type: DataType.INTEGER,
  })
  declare amount: number;

  @Column({
    type:DataType.DATE
  })
  declare payment_date: Date;
}
