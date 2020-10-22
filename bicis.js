class Bicis{
    constructor(Nombre,Modelo,tipo,imagen,precio,marca){
        this.Nombre = Nombre
        this.Modelo = Modelo
        this.tipo = tipo
        this.imagen = imagen
        this.precio = precio
        this.marca = marca
    }

    getNombre(){
        return this.Nombre
    }
    
    setNombre(nombre){
        this.Nombre = nombre
    }

    getMarca(){
        return this.marca
    }
    
    setMarca(marca){
        this.marca = marca
    }

    getModelo(){
        return this.Modelo
    }
    
    setModelo(modelo){
        this.Modelo = modelo
    }

    getTipo(){
        return this.tipo
    }
    
    setTipo(tipo){
        this.tipo = tipo
    }

    getImagen(){
        return this.imagen
    }
    
    setImagen(imagen){
        this.imagen = imagen
    }

    getPrecio(){
        return this.precio
    }
    
    setPrecio(precio){
        this.precio = precio
    }
}

module.exports = Bicis;
