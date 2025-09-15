import Declarations from "./Declarations";
import Symptoms from "./Symptoms";

Declarations.belongsToMany(Symptoms, {
  through: "declaration_symptom_relations",
  foreignKey: "declaration_id",
});

Symptoms.belongsToMany(Declarations, {
  through: "declaration_symptom_relations",
  foreignKey: "symptom_id",
});

export { Declarations, Symptoms };
