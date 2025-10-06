import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { User } from "../../user/models/user.model"
import { Recipient } from "../../recipient/models/recipient.model"

interface IDonateCreationAttr{
    recipientId:number
    userId:number
    notifcation:string
    is_AnonimPay:boolean
}

@Table({ tableName: "donate" })
export class Donate extends Model<Donate, IDonateCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(()=>Recipient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare recipientId: number;

  @ForeignKey(()=>User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  declare notifcation: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue:false
  })
  declare is_AnonimPay: boolean;

  @BelongsTo(()=>User)
  users:User

  @BelongsTo(()=>Recipient)
  recipients:Recipient
}

