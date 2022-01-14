const {arregloPrecio}  = require("../helpers/filter_place_and_price")

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

let precios;


const file = fs.createWriteStream(path.join(__dirname, "../data/prices.xml"));

 const request = https.get('https://publicacionexterna.azurewebsites.net/publicaciones/prices',(response)=>{    
     response.pipe(file)
 })



const prices = (req,res = response) =>{ 
     const data = fs.readFileSync(path.join(__dirname, "../data/prices.xml"),{encoding: "utf8"}); //100
    precios  = parser.parse(data)
    
     const precio = arregloPrecio(precios)

    return res.status(200).send({status:'success',precio,cantidad:precio.length})
};


const pricesById = (req,res) => {
    const {id} = req.params;

    const data = fs.readFileSync(path.join(__dirname, "../data/prices.xml"),{encoding: "utf8"});
    precios  = parser.parse(data)

    const precioId  = precios.places.place.filter(precio =>  precio["@_place_id"] == id );

    return res.status(200).send({
        status: "success",
        precio:precioId
    })
}



/*cron.schedule('* * * * *', () => {
    prices()
  })*/

// cron.schedule('* * * * * *', () => {
//     request()
// })






module.exports = {
    prices,
    pricesById
}