import app from "./app"

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, err => {
  if (err) console.log(err)

  console.log(`Server running on port: ${PORT}`)
})

export default server
