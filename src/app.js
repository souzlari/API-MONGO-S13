const express = require("express")
const app = express()
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/pet", {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

let db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"));
db.once("open", function(){
    console.log("conexão feita com sucesso.")
});

//rotas
const index = require("./routes/index")
const pets = require("./routes/pets")

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use("/", index)
app.use("/pets", pets)

module.exports = app