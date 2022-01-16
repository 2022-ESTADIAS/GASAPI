const {arregloFiltradoPorPrecioAcapulco}  = require("../helpers/filter_place_and_price")
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

    const data = fs.readFileSync(path.join(__dirname, "../data/prices.xml"),{encoding: "utf8"});
    const precios  = parser.parse(data)

    const precioId  = precios.places.place.filter(precio =>  precio["@_place_id"] == id );

    return res.status(200).send({
        status: "success",
        precio:precioId
    })
}

module.exports = {
    Precios,
    preciosPorId
}