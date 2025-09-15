import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../utils/db";

interface SymptomsAttributes {
  id: number;
  symptom_name: string;
}

class Symptoms extends Model<SymptomsAttributes> implements SymptomsAttributes {
  public id!: number;
  public symptom_name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Symptoms.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    symptom_name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "symptoms",
  }
);

export default Symptoms;
