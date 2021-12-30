import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "hello",
  timestamps: false,
})
export default class Hello extends Model {
  @Column({ primaryKey: true })
  id!: string;
  @Column
  value!: string;
}
