import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Recipient } from "../../recipient/models/recipient.model"

export enum CardType{
    humo = "humo",
    uzcard = "uzcard",
    visa = "visa"
}

interface ICardsCreationAttr{
    card_type: CardType
    card_number: string,
    expiry_date: string,
    recipientId:number
}

@Table({tableName:"card"})
export class Card extends Model<Card, ICardsCreationAttr> {
    @Column({
        type:DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    declare id:number

    @Column({
        type:DataType.ENUM(...Object.values(CardType)),
        defaultValue: CardType.humo
    })
    declare card_type: CardType

    @Column({
        type:DataType.STRING(),
    })
    declare card_number: string

    @Column({
        type: DataType.STRING()
    })
    declare expiry_date: string

    @ForeignKey(()=>Recipient)
    @Column({
        type:DataType.INTEGER
    })
    recipientId:number

    @BelongsTo(()=>Recipient)
    recipients:Recipient
}
