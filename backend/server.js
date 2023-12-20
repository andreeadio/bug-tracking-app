const express=require('express')
const app=express()//aceste 2 linii de cod ne ajuta sa facem request pe api si sa initializam serverul
const db=require('./models')//asa creem conexiunea dintre ORM si baza de date din mysql
app.use(express.json());

//Routers
const projectstudent=require('./routes/projectStudentRouter')
app.use("/projectstudent",projectstudent)

db.sequelize.sync().then(()=>{
//start api
const port = process.env.PORT || 8080;
app.listen(port,()=>{//atunci cand serverul porneste pe acest port
    console.log(`Server running on port ${port}`);//mesaj de testare
    });
});
