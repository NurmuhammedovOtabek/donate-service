import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Card } from "../../cards/models/card.model"
import { ResipientSocial } from "../../resipient_social/models/resipient_social.model"
import { SocialMedia } from "../../social_media/models/social_media.model"

interface IRecipientCreationAttr{
    name:string
    full_name: string
    email:string
    password:string
    addres:string
    token:string
}

@Table({ tableName: "recipient" })
export class Recipient extends Model<Recipient, IRecipientCreationAttr> {
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
  declare name: string;

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
    type: DataType.STRING(),
    allowNull: false,
  })
  declare addres: string;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  declare token: string;

  @HasMany(()=>Card)
  cards:Card[]

  @HasMany(()=>ResipientSocial)
  resipientSocial:ResipientSocial[]

  @BelongsToMany(()=>SocialMedia, ()=>ResipientSocial)
  socialMedias:SocialMedia[]
}
