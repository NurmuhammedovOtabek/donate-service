import { Model, Table } from "sequelize-typescript";

interface IUserCreationAttr{
    full_name:string
}

@Table({tableName:"user"})
export class User extends Model<User, IUserCreationAttr> {}
