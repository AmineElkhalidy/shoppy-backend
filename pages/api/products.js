import { Product } from "@/models/product";
import { mongooseConnection } from "@/lib/mongoose";

export default async function handler(request, response) {
  const { method } = request;

  // Connecting to db
  await mongooseConnection();

  if (method === "GET") {
    if (request.query?.id)
      response.json(await Product.findOne({ _id: request.query.id }));
    else response.json(await Product.find());
  }

  if (method === "POST") {
    const { title, category, description, price, images, properties } =
      request.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      properties,
    });

    response.send(productDoc);
  }

  if (method === "PUT") {
    const { title, category, description, price, images, properties, _id } =
      request.body;
    await Product.updateOne(
      { _id },
      { title, description, price, images, category, properties }
    );
    response.json(true);
  }

  if (method === "DELETE") {
    if (request.query?.id) await Product.deleteOne({ _id: request.query.id });
    response.json("Successfully deleted");
  }
}
