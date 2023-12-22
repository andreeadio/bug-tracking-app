//Posts.js reprezinta numele tabelei, puteam spre ex la fel de bine sa punem si "users"
//codul de mai jos ne creeaza tabela in baza de date
module.exports=(sequelize, DataTypes)=>{
    const ProjectStudent=sequelize.define("ProjectStudent",{//definim tabela "Posts" 
    repository:{//tabela posts contine coloana title care este de tip string si nu poate fi nula
        type:DataTypes.STRING,
        allowNull:false,
    },
    team:{
        type:DataTypes.STRING,  
        allowNull:false,
    },
    bugs:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    link:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    //userid este foreign key si trebuie apelat ulterior
    });
    return ProjectStudent
    };