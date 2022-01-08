const { response } = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const {XMLParser} = require("fast-xml-parser");
const cron = require("node-cron");

const options = {
    ignoreAttributes: false,
    attributeNamePrefix : "@_"
};
const parser = new XMLParser(options);

let precios;

//descargar archivo xml y almacenarlo en el server
/**
 * El proceso de descarga y almacenamiento de archivo XML a servidor, se debe de ejecutar cada 4Hrs
 */
const file = fs.createWriteStream(path.join(__dirname, "../data/prices.xml"));

 const request = https.get('https://publicacionexterna.azurewebsites.net/publicaciones/prices',(response)=>{    
     response.pipe(file)
 })


/**
 * La impresión de los datos se debe de ejecutar/actualizar de igual manera cada 4 horas.
 */
const prices = (req,res = response) =>{ 
     const data = fs.readFileSync(path.join(__dirname, "../data/prices.xml"),{encoding: "utf8"});
    precios  = parser.parse(data)
    console.log(precios.places.place)

    //  const precio = precios.places.place.filter(precio => places.place["@_place_id"] == '11703' )

    //  console.log(precios)
    return res.status(200).send({status:'success'})
};

// cron.schedule('* * * * * *', () => {
//     prices()
//   })



module.exports = {
    prices
}