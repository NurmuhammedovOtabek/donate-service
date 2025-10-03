import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Shop } from "../../shop/models/shop.model";

interface ICategoryCreationAttr{
    name: string
}

@Table({tableName:"category"})
export class Category extends Model<Category, ICategoryCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @Column({
        type:DataType.STRING(),
        allowNull:true,
        unique:true
    })
    declare name:string

    @HasMany(()=>Shop)
    shops: Shop[]
}