const pool = require("../config/db");
const safeParse = (value) => {
  try {
    return JSON.parse(value || "[]");
  } catch {
    return [];
  }
};
const createPuja = async (data) => {
  const {
    slug,
    name,
    sanskrit,
    category,
    popular,
    image,
    tagline,
    intro,
    benefits,
    importance,
    procedure_steps,
    samagri,
    muhurat,
    faqs,
  } = data;

  const [result] = await pool.query(
    `INSERT INTO pujas
    (
      slug,
      name,
      sanskrit,
      category,
      popular,
      image,
      tagline,
      intro,
      benefits,
      importance,
      procedure_steps,
      samagri,
      muhurat,
      faqs
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      slug,
      name,
      sanskrit,
      category,
      popular,
      image,
      tagline,
      intro,
      JSON.stringify(benefits),
      importance,
      JSON.stringify(procedure_steps),
      JSON.stringify(samagri),
      muhurat,
      JSON.stringify(faqs),
    ]
  );

  return result;
};

const getAllPujas = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM pujas ORDER BY created_at DESC"
  );

  return rows.map((puja) => ({
    ...puja,
    benefits: safeParse(puja.benefits),
    procedure_steps: safeParse(puja.procedure_steps),
    samagri: safeParse(puja.samagri),
    faqs: safeParse(puja.faqs),
  }));
};
const getPujaById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM pujas WHERE id=?",
    [id]
  );

  if (!rows.length) return null;

  const puja = rows[0];

puja.benefits = safeParse(puja.benefits);
puja.procedure_steps = safeParse(puja.procedure_steps);
puja.samagri = safeParse(puja.samagri);
puja.faqs = safeParse(puja.faqs);

  return puja;
};

const updatePuja = async (id, data) => {
  const {
    slug,
    name,
    sanskrit,
    category,
    popular,
    image,
    tagline,
    intro,
    benefits,
    importance,
    procedure_steps,
    samagri,
    muhurat,
    faqs,
  } = data;

  const [result] = await pool.query(
    `UPDATE pujas
     SET
      slug=?,
      name=?,
      sanskrit=?,
      category=?,
      popular=?,
      image=?,
      tagline=?,
      intro=?,
      benefits=?,
      importance=?,
      procedure_steps=?,
      samagri=?,
      muhurat=?,
      faqs=?
     WHERE id=?`,
[
  slug,
  name,
  sanskrit,
  category,
  popular,
  image,
  tagline,
  intro,
  JSON.stringify(benefits),
  importance,
  JSON.stringify(procedure_steps),
  JSON.stringify(samagri),
  muhurat,
  JSON.stringify(faqs),
  id,
]
  );

  return result;
};

const deletePuja = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM pujas WHERE id=?",
    [id]
  );

  return result;
};

module.exports = {
  createPuja,
  getAllPujas,
  getPujaById,
  updatePuja,
  deletePuja,
};