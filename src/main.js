const user = { name: "test" }

const getName = () => {
  const { name } = user

  return name
}

console.log(`name: ${getName()}`)
