import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../utils/db";
import Symptoms from "./Symptoms";

interface DeclarationsAttributes {
  id: number;
  full_name: string;
  temperature: number;
  close_contact_with_covid: boolean;
}

interface DeclarationsCreationAttributes
  extends Optional<DeclarationsAttributes, "id"> {}

class Declarations
  extends Model<DeclarationsAttributes, DeclarationsCreationAttributes>
  implements DeclarationsAttributes
{
  public id!: number;
  public full_name!: string;
  public temperature!: number;
  public close_contact_with_covid!: boolean;
  public Symptoms?: Symptoms[];

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Declarations.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    full_name: { type: DataTypes.STRING, allowNull: false },
    temperature: { type: DataTypes.FLOAT, allowNull: false },
    close_contact_with_covid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "declarations",
  }
);

export default Declarations;
