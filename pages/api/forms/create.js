/*
  API endpoint to handle create operation on submitted applications
*/

import dbConnect from "../../../lib/dbConnect";
import Application from "../../../models/Application";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        // Creates a mongoDB document that satisfies the schema "Application"
        const application = await Application.create(req.body);

        res.status(201).json({ success: true, data: application });
      } catch (error) {
        res.status(400).json({ success: false, message: "Error while posting the form" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}