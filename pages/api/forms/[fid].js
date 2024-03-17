export default function handler(req, res) {
  const { fid } = req.query;
  res.end(`Form: ${fid}`);
}
