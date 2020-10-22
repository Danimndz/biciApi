var config = require('./dbconfig')
const sql = require('mssql')
const Bicis = require('./bicis')

async function getBicis() {
    try{
        let pool = await sql.connect(config)
        let bicis = await pool.request().query("SELECT * from bicis")
        return bicis.recordsets;
    }
    catch(err){
        console.log('error')
    }
}

async function deleteBici(IdBicicleta){
    try{
        let pool = await sql.connect(config)
        let bici = await pool.query`select * from bicis where IdBicicleta = ${IdBicicleta}`
        if(bici == null){
                bici = null
                return bici.recordsets
        }else{
            await pool.request().query("delete from bicis where IdBicicleta ="+IdBicicleta)
            return bici.recordsets  
        }
        
    }
    catch(err){
        console.log(err)
    }
}
async function insertBici(newBici){
    try{

        let pool = await sql.connect(config)
        let insertBici = await pool.request()
        .input('Nombre',sql.NVarChar,newBici.Nombre)
        .input('Modelo',sql.NVarChar,newBici.Modelo)
        .input('Marca',sql.NVarChar,newBici.Marca)
        .input('tipo',sql.NVarChar,newBici.tipo)
        .input('imagen',sql.NVarChar,newBici.imagen)
        .input('precio',sql.Money,newBici.precio)
        .query('insert into bicis values (@Nombre,@Modelo,@Marca,@tipo,@imagen,@precio)')

        console.log("return: "+insertBici.recordsets)
        return insertBici.recordsets

    }catch(err){
        console.log(err) 
    }

}

async function updateBici(IdBicicleta,bicicletaData){
    try{
        
        const bicicleta = new Bicis()
        let newInfo ={
            Nombre:"",
            Modelo:"",
            Marca:"",
            tipo:"",
            imagen:"",
            precio:null
        }
        let pool = await sql.connect(config)
        await pool.query`select * from bicis where IdBicicleta = ${IdBicicleta}`.then(promise=>{
            if(promise.recordsets[0]==""){ 
                console.log("aqui entro"+promise.recordsets[0])
                promise.recordsets[0] = ""
                return promise.recordsets[0]
            }
            else{
                console.log("aqui entro2")
                bicicleta.setNombre(promise.recordsets[0][0].Nombre)
                bicicleta.setModelo(promise.recordsets[0][0].Modelo)
                bicicleta.setMarca(promise.recordsets[0][0].Marca)
                bicicleta.setTipo(promise.recordsets[0][0].tipo)
                bicicleta.setImagen(promise.recordsets[0][0].imagen)
                bicicleta.setPrecio(promise.recordsets[0][0].precio)
                
                if(bicicletaData.Nombre == null) newInfo.Nombre = bicicleta.getNombre()
                else newInfo.Nombre = bicicletaData.Nombre 
    
                if(bicicletaData.Marca == null) newInfo.Marca = bicicleta.getMarca()
                else newInfo.Marca = bicicletaData.Marca 
    
                if(bicicletaData.Modelo == null) newInfo.Modelo = bicicleta.getModelo()
                else newInfo.Modelo = bicicletaData.Modelo 
    
                if(bicicletaData.tipo == null) newInfo.tipo = bicicleta.getTipo()
                else newInfo.tipo = bicicletaData.tipo 
    
                if(bicicletaData.precio == null) newInfo.precio = bicicleta.getPrecio()
                else newInfo.precio = bicicletaData.precio 
    
                if(bicicletaData.imagen == null) newInfo.imagen = bicicleta.getImagen()
                else newInfo.imagen = bicicletaData.imagen 

                let updateInfo = pool.request()
                .input('Nombre',sql.NVarChar,newInfo.Nombre)
                .input('Modelo',sql.NVarChar,newInfo.Modelo)
                .input('Marca',sql.NVarChar,newInfo.Marca)
                .input('tipo',sql.NVarChar,newInfo.tipo)
                .input('imagen',sql.NVarChar,newInfo.imagen)
                .input('precio',sql.Money,newInfo.precio)
                .query(`update bicis set Nombre=@Nombre,Modelo=@Modelo,Marca=@Marca,tipo=@tipo,imagen=@imagen,precio=@precio where IdBicicleta =${IdBicicleta}`)
                
            }
        }).then(promise=>{ 
            return newInfo
        })
        

    }catch(err){
        console.log(err)
    }

}


module.exports = {
    getBicis : getBicis,
    deleteBici : deleteBici,
    insertBici : insertBici,
    updateBici : updateBici
}