import { mongooseConnection } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(request, response) {
  const { method } = request;
  await mongooseConnection();

  // Check if the user is logged in
  await isAdminRequest(request, response);

  if (method === "POST") {
    const { name, parentCategory, properties } = request.body;

    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });

    response.status(200).send(categoryDoc);
  }

  if (method === "GET") {
    response.json(await Category.find().populate("parent"));
  }

  if (method === "PUT") {
    const { name, parentCategory, properties, _id } = request.body;

    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory || undefined,
        properties,
      }
    );
    response.status(200).send(categoryDoc);
  }

  if (method === "DELETE") {
    if (request.query?.id) await Category.deleteOne({ _id: request.query.id });
    response.json("Successfully deleted");
  }
}
