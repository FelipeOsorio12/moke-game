const express = require("express") // importar express 
const cors = require("cors")// cors es un libreria que permite solucionar los problemas de "Access-Control-Allow-Origin"

const app = express() // se cra una apliacion con express.js

app.use(cors()) //que hace use?
app.use(express.json()) //se habilita la opcion de recibir peteciones post que traigan un formato json

const jugadores = []

class Jugador {
    constructor(id){
        this.id=id
        
    }

    asignarMokepon(mokepon){
        this.mokepon=mokepon
    }

    actualizarMokepon(x,y){
        this.x=x
        this.y=y
    }

    asignarAtaques(ataques){
        this.ataques=ataques
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre=nombre
    }
}

app.get("/unirse", (req, res)=>{         // se le dice a la app que creamos con express.js que cuando
                                         // en la direccion "raiz" reciba una peticcion, responda "hola"
    
const id= `${Math.random()}`
const jugador= new Jugador(id)

jugadores.push(jugador)

//res.setHeader("Access-Control-Allow-Origin", "*") // permite que el servidor reciba solicitudes de paginas que no estan alojadas en el 

res.send(id)

})

app.post("/mokepon/:jugadorId", (req,res)=>{      //Aca se definio una variable que va entrar por la  url y para eso se usan los puntos
    const jugadorId = req.params.jugadorId  || "" //se accede a la variable que se mando por el url
    const nombre= req.body.mokepon || "" //extrae del body de la peticion el nombre del mokepon
    const mokepon = new Mokepon (nombre)
    

    const jugadorIndex=jugadores.findIndex((jugador)=> jugadorId === jugador.id)

    if(jugadorIndex >= 0){
          jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end() // no se va responder nada por parte del servidor

}) 

app.post("/mokepon/:jugadorId/posicion", (req,res)=>{
    const jugadorId = req.params.jugadorId  || ""
    const x = req.body.x || ""
    const y= req.body.y || ""

    const jugadorIndex=jugadores.findIndex((jugador)=> jugadorId === jugador.id)

    if(jugadorIndex >= 0){
          jugadores[jugadorIndex].actualizarMokepon(x,y)
    }


    const enemigos = jugadores.filter((jugador) =>jugadorId !== jugador.id)

    res.send({
        enemigos
    })


})

app.post("/mokepon/:jugadorId/ataques", (req,res) => {
    const jugadorId= req.params.jugadorId || ""
    const ataques= req.body.ataques || ""

    const jugadorIndex=jugadores.findIndex((jugador)=> jugadorId === jugador.id)

    if(jugadorIndex >= 0){
          jugadores[jugadorIndex].asignarAtaques(ataques)
    }

    res.end

})

app.get("/mokepon/:jugadorId/ataques",(req,res)=>{
    const jugadorId= req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })

    

})


app.listen(8080, () => {    // permite escuchar en el puerto 8080 las peticiones de los clientes
    console.log("Servidor funcionando")
})