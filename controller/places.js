const { response } = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const {XMLParser} = require("fast-xml-parser");

const parser = new XMLParser();

let lugares;

//descargar archivo xml y almacenarlo en el server
const file = fs.createWriteStream(path.join(__dirname, "../data/places.xml"));
const request = https.get('https://publicacionexterna.azurewebsites.net/publicaciones/places',(response)=>{    
    response.pipe(file)
    const data = fs.readFileSync(path.join(__dirname, "../data/places.xml"),{encoding: "utf8"});
    lugares  = parser.parse(data)
})


//carga de los lugares  lectura asyncrona
// fs.readFile(path.join(__dirname, "../data/places.xml"),'utf-8',(err,data)=>{
//     if(err) {
//         throw new Error('no se puede leer');
//     }
//     else{
//         // lugares =JSON.stringify(data);
//         lugares  = parser.parse(data); 
//     }
// });

//lectura sincrona
// const data = fs.readFileSync(path.join(__dirname, "../data/places.xml"),{encoding: "utf8"});
// lugares  = parser.parse(data)


const places = (req,res = response) =>{

    const place = lugares.places.place.filter(lugar => lugar.cre_id == 'PL/23779/EXP/ES/2021' )

    return res.status(200).send({status:'success',place})
};

module.exports = {
    places
}