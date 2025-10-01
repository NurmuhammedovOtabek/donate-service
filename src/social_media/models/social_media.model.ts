import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { ResipientSocial } from "../../resipient_social/models/resipient_social.model";
import { Recipient } from "../../recipient/models/recipient.model";

interface IsocialMediaCreationAttr{
    social_media:string
    iconic_url:string
}

@Table({ tableName: "socialMedia" })
export class SocialMedia extends Model<SocialMedia, IsocialMediaCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
    unique: true,
  })
  declare social_media: string;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
    unique: true,
  })
  declare iconic_url: string;

  @HasMany(() => ResipientSocial)
  resipientSocials: ResipientSocial[];

  @BelongsToMany(()=>Recipient,()=>ResipientSocial)
  recipients:Recipient[]
}
