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
    
     const precio = precios.places.place.filter(precio => precio["@_place_id"] == 11415 || precio["@_place_id"] == 12914 || precio["@_place_id"] == 2798 || precio["@_place_id"] == 13089 || precio["@_place_id"] ==13090 || precio["@_place_id"] ==13350 || precio["@_place_id"] ==13411 || precio["@_place_id"] == 3157 || precio["@_place_id"] ==2869 ||precio["@_place_id"] ==3014 || precio["@_place_id"] ==2972 || precio["@_place_id"] ==2773 ||precio["@_place_id"]==2753 ||precio["@_place_id"]==2876 ||precio["@_place_id"]== 14079 ||precio["@_place_id"]==14432 ||precio["@_place_id"]==15659 ||precio["@_place_id"]==15684 ||precio["@_place_id"]== 16211 || precio["@_place_id"]==20864 ||precio["@_place_id"]==2669  || precio["@_place_id"]==3305 || precio["@_place_id"]== 21138 ||precio["@_place_id"]==21639||precio["@_place_id"]==21644 || precio["@_place_id"]==21774|| precio["@_place_id"]==22451|| precio["@_place_id"]==24079|| precio["@_place_id"]==25805|| precio["@_place_id"]==26416|| precio["@_place_id"]==26774|| precio["@_place_id"]==3989|| precio["@_place_id"]==10843|| precio["@_place_id"]==11028|| precio["@_place_id"]==6718|| precio["@_place_id"]==7347|| precio["@_place_id"]==6787|| precio["@_place_id"]==6797|| precio["@_place_id"]==6260|| precio["@_place_id"]==6739|| precio["@_place_id"]==6490|| precio["@_place_id"]==7357|| precio["@_place_id"]==6757|| precio["@_place_id"]==6788|| precio["@_place_id"]==6594|| precio["@_place_id"]==6820|| precio["@_place_id"]==6564|| precio["@_place_id"]==6438|| precio["@_place_id"]==6241|| precio["@_place_id"]==6847|| precio["@_place_id"]==6559|| precio["@_place_id"]==7179|| precio["@_place_id"]==6690|| precio["@_place_id"]==6972|| precio["@_place_id"]==5358|| precio["@_place_id"]==5543|| precio["@_place_id"]==5460|| precio["@_place_id"]==7888|| precio["@_place_id"]==8504|| precio["@_place_id"]==8197|| precio["@_place_id"]==8438|| precio["@_place_id"]==8396|| precio["@_place_id"]==8740|| precio["@_place_id"]==8831|| precio["@_place_id"]==9476|| precio["@_place_id"]==9317|| precio["@_place_id"]==9991|| precio["@_place_id"]==9936|| precio["@_place_id"]==10145|| precio["@_place_id"]==10500|| precio["@_place_id"]==10704)

    //  console.log(precio)
    return res.status(200).send({status:'success',precio,cantidad:precio.length})
};

// cron.schedule('* * * * * *', () => {
//     prices()
//   })



module.exports = {
    prices
}