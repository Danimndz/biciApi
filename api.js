var db = require('./dboperations')
var bicis = require('./bicis')

var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const { request, response } = require('express')
var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use('/api',router)

router.use((request,response,next)=>{
    console.log('middleware')
    next()
})

router.route('/getBicis').get((request,response)=>{

    db.getBicis().then(result=>{
        response.json(result[0][0])    
    })
})

router.route('/deleteBici/:biciId').delete((request,response)=>{
    db.deleteBici(request.params.biciId).then(result=>{
        if (result == ""){ 
            return response.json({message:"elemento no encontrado"})
        }
        else{
            return response.json(result)
        }
    })
})

router.route('/insertBici').post((request,response)=>{
    let newBici = {... request.body}
    db.insertBici(newBici).then(result=>{
        return response.status(201).json({message:"elemento insertado"})

    })  
})

router.route('/updateBici/:biciId').post((request,response)=>{

    let biciInfo = {... request.body}
    db.updateBici(request.params.biciId,biciInfo).then(result=>{
        if(result == ""){
            return response.json({message:"elemento no encontrado"})
        }else{
            return response.json(result)
        }
    })
})





var port = process.env.port || 8090
app.listen(port)
console.log('Bicis API is running at '+port)

