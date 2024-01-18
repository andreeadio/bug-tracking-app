const express = require('express')
const app = express()//aceste 2 linii de cod ne ajuta sa facem request pe api si sa initializam serverul
//import cors
const cors = require('cors')
const db = require('./models')//asa creem conexiunea dintre ORM si baza de date din mysql
app.use(express.json())
app.use(cors())

//routes
//user route
const userRouter = require('./routes/userRouter')
app.use("/users", userRouter)

//account route
const accountRoutes = require('./routes/accountRoutes')
app.use("/auth", accountRoutes)

//team route
// const teamRouter=require('./routes/teamRouter')
// app.use("/teams", teamRouter)

//project route
const projectRouter = require('./routes/projectRouter')
app.use("/projects", projectRouter)

//bug router
const bugsRouter = require('./routes/bugRouter')
app.use("/bugs", bugsRouter)



db.sequelize.sync().then(() => {
    //start api
    const port = process.env.PORT || 8080
    app.listen(port, () => {//atunci cand serverul porneste pe acest port
        console.log(`Server running on port ${port}`) //mesaj de testare
    })
})