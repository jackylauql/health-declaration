import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/db";
import Declarations from "./Declarations";
import Symptoms from "./Symptoms";

interface Declarations_Symptoms_RelationsAttributes {
  id: number;
  declaration_id: number;
  symptom_id: number;
}

class Declarations_Symptoms_Relations extends Model<Declarations_Symptoms_RelationsAttributes> {
  public id!: number;
  public declaration_id!: number;
  public symptom_id!: number;
}

Declarations_Symptoms_Relations.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    declaration_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Declarations,
        key: "id",
      },
    },
    symptom_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Symptoms,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "declaration_symptom_relations",
  }
);

export default Declarations_Symptoms_Relations;
