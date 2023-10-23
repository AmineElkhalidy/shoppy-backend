import multiparty from "multiparty";

// S3
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// fs
import fs from "fs";

// mimeTypes
import mime from "mime-types";
import { mongooseConnection } from "@/lib/mongoose";

const bucketName = "shoppy-ecommerce";

export default async function handler(request, response) {
  await mongooseConnection();

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(request, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const links = [];
  for (const file of files.file) {
    const extension = file.originalFilename.split(".").pop();
    const newFilename = Date.now() + "." + extension;
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: mime.lookup(file.path),
      })
    );

    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    links.push(link);
  }

  return response.json({ links });
}

// Don't parse the request
export const config = {
  api: { bodyParser: false },
};
