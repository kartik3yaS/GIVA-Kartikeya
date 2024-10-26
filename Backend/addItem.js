const dotenv = require("dotenv");
const pool = require("./db_config/db.js");

dotenv.config();

// Async function to insert product data
async function insertProduct(name, description, price, quantity) {
  const query = `
        INSERT INTO products (name, description, price, quantity)
        VALUES ($1, $2, $3, $4)`;

  const values = [name, description, price, quantity];

  try {
    const res = await pool.query(query, values);
    console.log("Data inserted successfully:", res);
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}

// Example usage: Inserting multiple products
(async () => {
  const products = [
    {
      name: "Gold Necklace",
      description: "Elegant gold necklace.",
      price: 150.0,
      quantity: 10,
    },
    {
      name: "Diamond Ring",
      description: "Stunning diamond ring.",
      price: 300.0,
      quantity: 5,
    },
    {
      name: "Silver Bracelet",
      description: "Beautiful silver bracelet.",
      price: 80.0,
      quantity: 15,
    },
    {
      name: "Pearl Earrings",
      description: "Charming pearl earrings.",
      price: 50.0,
      quantity: 20,
    },
    {
      name: "Ruby Pendant",
      description: "Gorgeous ruby pendant.",
      price: 200.0,
      quantity: 8,
    },
    {
      name: "Platinum Watch",
      description: "Luxury platinum watch.",
      price: 400.0,
      quantity: 3,
    },
    {
      name: "Sapphire Brooch",
      description: "Elegant sapphire brooch.",
      price: 120.0,
      quantity: 12,
    },
    {
      name: "Opal Ring",
      description: "Unique opal ring.",
      price: 170.0,
      quantity: 6,
    },
    {
      name: "Emerald Necklace",
      description: "Stunning emerald necklace.",
      price: 250.0,
      quantity: 4,
    },
    {
      name: "Titanium Cufflinks",
      description: "Stylish titanium cufflinks.",
      price: 90.0,
      quantity: 11,
    },
    {
      name: "Amethyst Earrings",
      description: "Charming amethyst earrings.",
      price: 60.0,
      quantity: 18,
    },
    {
      name: "Garnet Bracelet",
      description: "Beautiful garnet bracelet.",
      price: 75.0,
      quantity: 14,
    },
    {
      name: "Topaz Pendant",
      description: "Elegant topaz pendant.",
      price: 95.0,
      quantity: 9,
    },
    {
      name: "Quartz Ring",
      description: "Stylish quartz ring.",
      price: 40.0,
      quantity: 16,
    },
    {
      name: "Zircon Necklace",
      description: "Unique zircon necklace.",
      price: 120.0,
      quantity: 7,
    },
    {
      name: "Citrine Earrings",
      description: "Beautiful citrine earrings.",
      price: 55.0,
      quantity: 13,
    },
    {
      name: "Moonstone Bracelet",
      description: "Charming moonstone bracelet.",
      price: 85.0,
      quantity: 19,
    },
    {
      name: "Jade Pendant",
      description: "Stunning jade pendant.",
      price: 110.0,
      quantity: 5,
    },
    {
      name: "Onyx Ring",
      description: "Stylish onyx ring.",
      price: 45.0,
      quantity: 17,
    },
    {
      name: "Lapis Lazuli Brooch",
      description: "Elegant lapis lazuli brooch.",
      price: 130.0,
      quantity: 4,
    },
    {
      name: "Turquoise Necklace",
      description: "Unique turquoise necklace.",
      price: 100.0,
      quantity: 12,
    },
  ];

  for (const product of products) {
    await insertProduct(
      product.name,
      product.description,
      product.price,
      product.quantity
    );
  }

  // Close the pool after all inserts
  await pool.end();
})();
