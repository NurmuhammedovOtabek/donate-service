import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { SocialMedia } from "../../social_media/models/social_media.model";
import { Recipient } from "../../recipient/models/recipient.model";

interface IResipientSocialCreationAttr{
    socialId:number
    pricipentId:number
    social_url:string
}

@Table({ tableName: "resipientSocial" })
export class ResipientSocial extends Model<
  ResipientSocial,
  IResipientSocialCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(()=>SocialMedia)
  @Column({
    type: DataType.INTEGER
  })
  declare socialId: number;

  @ForeignKey(()=>Recipient)
  @Column({
    type:DataType.INTEGER
  })
  declare pricipentId: number;
  
  @Column({
    type:DataType.STRING()
  })
  declare social_url: string;

  @BelongsTo(()=>SocialMedia)
  socialMedias:SocialMedia

  @BelongsTo(()=>Recipient)
  recipient:Recipient
}
