export default function handler(req, res) {
  // console.log("YOO", req)
  // throw new Error("Yo")
  res.status(200).json({ name: 'John Doe' })
}
