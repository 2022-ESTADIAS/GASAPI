const {arregloFiltradoPorPrecioAcapulco,arregloFiltradoPorLugarAcapulco}  = require("../helpers/filter_place_and_price")
const { reporteXML } = require("../helpers/writeFileXML")
const { response } = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const {XMLParser} = require("fast-xml-parser");
const cron = require("node-cron");

const options = {
    ignoreAttributes: false,
    attributeNamePrefix : "@_",
    parseAttributeValue: true
};
const parser = new XMLParser(options);


reporteXML('prices')

cron.schedule('0 */4 * * *', () => {
    reporteXML('prices')

})



const Precios = (req,res = response) =>{ 
    try{
        const data = fs.readFileSync(path.join(__dirname, "../data/prices.xml"),{encoding: "utf8"}); //100
        const preciosXML  = parser.parse(data)
        const precio = arregloFiltradoPorPrecioAcapulco(preciosXML)
    
        return res.status(200).send({status:'success',precio,cantidad:precio.length})
    }catch(e){
        return res.status(404).send({status:'error',msg: 'No se pudo leer el archivo'})
    }
};


const preciosPorId = (req,res) => {
    const {id} = req.params;
    const data = fs.readFileSync(path.join(__dirname, "../data/places.xml"),{encoding: "utf8"});
    const data2 = fs.readFileSync(path.join(__dirname, "../data/prices.xml"),{encoding: "utf8"});
    const lugaresXML  = parser.parse(data);
    const preciosXML  = parser.parse(data2);

    const lugar = arregloFiltradoPorLugarAcapulco(lugaresXML);
    const precio = arregloFiltradoPorLugarAcapulco(preciosXML)


    let precioId  = precio.filter(precio =>  precio["@_place_id"] == id );
    const  nombre = lugar.find(lugar  => lugar['@_place_id'] == id )
    precioId.name = nombre   
    return res.status(200).send({
        status: "success",
        precio:precioId,
        nombre
        // precioyLugar
        
        
    })
}

module.exports = {
    Precios,
    preciosPorId
}


    