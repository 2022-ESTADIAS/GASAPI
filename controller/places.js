const { response } = require("express");
const {keso} = require("../helpers/filter_place_and_price")
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
    const place = keso(places)
    console.log('funcionando places [REFACTORIZADO]')
    return res.status(200).send({status:'success',place,cantidad:place.length})
}
const lugaresPlaces = (req,res) =>{
    const data = fs.readFileSync(path.join(__dirname, "../data/places.xml"),{encoding: "utf8"});
    const data2 = fs.readFileSync(path.join(__dirname, "../data/prices.xml"),{encoding: "utf8"});
    places  = parser.parse(data);
    const precios  = parser.parse(data2);

    //acapulco
    const place = keso(place)



    const precio = keso(place)
    const precioyPlaces  = precio.filter(precio =>{
      const lugargas =  place.find(lugar => lugar['@_place_id']  == precio["@_place_id"] );
      precio.lugar = lugargas;
        
      return precio
    })
    
    const arregloDefinitivo =precioyPlaces.filter(precio =>{
      
        // precio.tipo = {... precio['gas_price']}

        //manejo de llaves del objeto
        if(precio['gas_price'][0] && precio['gas_price'][1] && precio['gas_price'][2] ){
            precio.type = {
                regular:{
                    name: precio['gas_price'][0]['@_type'],
                    price:precio['gas_price'][0]['#text']
                },
                premium:{
                    name: precio['gas_price'][1]['@_type'],
                    price:precio['gas_price'][1]['#text']
                },
                diesel:{
                    name: precio['gas_price'][2]['@_type'],
                    price:precio['gas_price'][2]['#text']
                },
            }
        }else if(precio['gas_price'][0] && precio['gas_price'][1]){
            precio.type = {
                regular:{
                    name: precio['gas_price'][0]['@_type'],
                    price:precio['gas_price'][0]['#text']
                },
                premium:{
                    name: precio['gas_price'][1]['@_type'],
                    price:precio['gas_price'][1]['#text']
                },
            }
        }else if(precio['gas_price'][0]){
            precio.type = {
              
                regular:{
                    name: precio['gas_price'][0]['@_type'],
                    price:precio['gas_price'][0]['#text']
                }

            }  
        }else{
            precio.type ={
                unica:{
                    name: precio['gas_price']['@_type'],
                    price:precio['gas_price']['#text']
                } 
           }
        }

        return precio
    })
    // console.log(arregloDefinitivo);

     return res.status(200).send({
         status: 'success',
         precios:arregloDefinitivo
     }) 
}

module.exports = {
    lugares,
    lugaresPlaces
}