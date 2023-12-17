//server
const express = require('express')

const app = express()
app.use(express.json())

app.listen(8080, () => {
    console.log('Server is running on 8080')
})