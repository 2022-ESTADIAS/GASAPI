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

let places

//Crear ruta
const file = fs.createWriteStream(path.join(__dirname, "../data/places.xml"));

//Descargar XML places
const request = https.get('https://publicacionexterna.azurewebsites.net/publicaciones/places',(response)=>{    
    response.pipe(file)
})

const lugares = (req,res = response) =>{ 
    const data = fs.readFileSync(path.join(__dirname, "../data/places.xml"),{encoding: "utf8"});
    places  = parser.parse(data)
    const place = places.places.place.filter(place => place["@_place_id"] == 11415 || place["@_place_id"] == 12914 || place["@_place_id"] == 2798 || place["@_place_id"] == 13089 || place["@_place_id"] ==13090 || place["@_place_id"] ==13350 || place["@_place_id"] ==13411 || place["@_place_id"] == 3157 || place["@_place_id"] ==2869 ||place["@_place_id"] ==3014 || place["@_place_id"] ==2972 || place["@_place_id"] ==2773 ||place["@_place_id"]==2753 ||place["@_place_id"]==2876 ||place["@_place_id"]== 14079 ||place["@_place_id"]==14432 ||place["@_place_id"]==15659 ||place["@_place_id"]==15684 ||place["@_place_id"]== 16211 || place["@_place_id"]==20864 ||place["@_place_id"]==2669  || place["@_place_id"]==3305 || place["@_place_id"]== 21138 ||place["@_place_id"]==21639||place["@_place_id"]==21644 || place["@_place_id"]==21774|| place["@_place_id"]==22451|| place["@_place_id"]==24079|| place["@_place_id"]==25805|| place["@_place_id"]==26416|| place["@_place_id"]==26774|| place["@_place_id"]==3989|| place["@_place_id"]==10843|| place["@_place_id"]==11028|| place["@_place_id"]==6718|| place["@_place_id"]==7347|| place["@_place_id"]==6787|| place["@_place_id"]==6797|| place["@_place_id"]==6260|| place["@_place_id"]==6739|| place["@_place_id"]==6490|| place["@_place_id"]==7357|| place["@_place_id"]==6757|| place["@_place_id"]==6788|| place["@_place_id"]==6594|| place["@_place_id"]==6820|| place["@_place_id"]==6564|| place["@_place_id"]==6438|| place["@_place_id"]==6241|| place["@_place_id"]==6847|| place["@_place_id"]==6559|| place["@_place_id"]==7179|| place["@_place_id"]==6690|| place["@_place_id"]==6972|| place["@_place_id"]==5358|| place["@_place_id"]==5543|| place["@_place_id"]==5460|| place["@_place_id"]==7888|| place["@_place_id"]==8504|| place["@_place_id"]==8197|| place["@_place_id"]==8438|| place["@_place_id"]==8396|| place["@_place_id"]==8740|| place["@_place_id"]==8831|| place["@_place_id"]==9476|| place["@_place_id"]==9317|| place["@_place_id"]==9991|| place["@_place_id"]==9936|| place["@_place_id"]==10145|| place["@_place_id"]==10500|| place["@_place_id"]==10704)
    console.log('funcionando places')
    return res.status(200).send({status:'success',place,cantidad:place.length})
}

module.exports = {
    lugares
}