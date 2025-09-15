"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("symptoms", [
      { symptom_name: "Cough" },
      { symptom_name: "Smell/Taste Impairment" },
      { symptom_name: "Fever" },
      { symptom_name: "Breathing Difficulties" },
      { symptom_name: "Body Aches" },
      { symptom_name: "Headaches" },
      { symptom_name: "Fatigue" },
      { symptom_name: "Sore Throat" },
      { symptom_name: "Diarrhea" },
      { symptom_name: "Runny Nose" },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("symptoms", null, {});
  },
};
