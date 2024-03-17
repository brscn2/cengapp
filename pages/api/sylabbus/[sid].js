export default function handler(req, res) {
  const { sid } = req.query;
  res.end(`Syllabus: ${sid}`);
}
