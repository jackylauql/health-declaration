import express from "express";
import { Symptoms, Declarations } from "../models";
import { z } from "zod";
import sequelize from "../utils/db";
import Declarations_Symptoms_Relations from "../models/Declarations_Symptoms_Relations";

const router = express.Router();

interface DeclarationsDTO {
  full_name: string;
  symptom_ids: number[];
  temperature: number;
  close_contact_with_covid: boolean;
}

const transformToDeclarationDTO = (
  declarations: Declarations[]
): DeclarationsDTO[] => {
  return declarations.map((d) => ({
    full_name: d.full_name,
    temperature: d.temperature,
    close_contact_with_covid: d.close_contact_with_covid,
    symptom_ids: d.Symptoms.map((s) => s.id),
  }));
};

router.get("/symptoms", async (req: any, res: any) => {
  try {
    const results = await Symptoms.findAll();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req: any, res: any) => {
  try {
    const limit = req.query.pageSize || 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const results = await Declarations.findAndCountAll({
      limit,
      offset,
      distinct: true,
      order: [["id", "DESC"]],
      include: Symptoms,
    });
    const meta = {
      total_count: results.count,
      total_pages: Math.ceil(results.count / limit),
    };
    res
      .status(200)
      .json({ results: transformToDeclarationDTO(results.rows), meta });
  } catch (err) {
    console.error("Error fetching declarations: ", err);
    res.status(500).json(err);
  }
});

const createDeclarationSchema = z.object({
  full_name: z.string().min(1, { error: "full_name is required" }),
  temperature: z
    .number()
    .min(35, { error: "temperature needs to be at least 35" })
    .max(42, { error: "temperature needs to be below 42" }),

  symptoms: z.array(z.string()).optional(),
  close_contact_with_covid: z.boolean({
    error: "close_contact_with_covid is required",
  }),
});

router.post("/", async (req, res) => {
  const result = createDeclarationSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request body",
      path: z.treeifyError(result.error),
    });
  }
  try {
    await sequelize.transaction(async (t) => {
      const result = await Declarations.create(
        {
          full_name: req.body.full_name,
          temperature: req.body.temperature,
          close_contact_with_covid: req.body.close_contact_with_covid,
        },
        { transaction: t }
      );

      const symptom_ids = req.body.symptoms;
      for (let i = 0; i < symptom_ids.length; i++) {
        await Declarations_Symptoms_Relations.create(
          {
            symptom_id: symptom_ids[i],
            declaration_id: result.id,
          },
          { transaction: t }
        );
      }
      return result;
    });
  } catch (err) {
    console.error("Error creating declaration: ", err);
    return res.status(500).json({
      message: "Something went wrong! :(",
    });
  }
  return res
    .status(200)
    .json({ message: "successfully created new declaration" });
});

export default router;
