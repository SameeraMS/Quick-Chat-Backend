import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table
export class Channel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV1)
  @Column(DataType.UUID)
  public id: string;

  // Use JSON instead of ARRAY for MySQL compatibility
  @Column(DataType.JSON)
  public participants: string[];

  @Column(DataType.JSON)
  public admins: string[];

  @Column(DataType.STRING)
  public description: string;

  @Column(DataType.JSON)
  public messages: string[];

  @Column(DataType.STRING(50))
  public name: string;

  @Column(DataType.STRING)
  public image: string;
}
