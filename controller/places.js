const path = require("path");
const fs = require("fs");
const https = require("https");
const { response } = require("express");
const {arregloFiltradoPorLugarAcapulco} = require("../helpers/filter_place_and_price")
const { reporteXML } = require("../helpers/writeFileXML")
const {XMLParser} = require("fast-xml-parser");
const cron = require("node-cron");
const options = {
    ignoreAttributes: false,
    attributeNamePrefix : "@_",
    parseAttributeValue: true
};
const parser = new XMLParser(options);




reporteXML('places')

cron.schedule('0 */4 * * *', () => {
    reporteXML('places')
})



//norefactor
const cantidadLugares = (req,res = response) =>{ 
    const data = fs.readFileSync(path.join(__dirname, "../data/places.xml"),{encoding: "utf8"});
    const lugaresXML  = parser.parse(data)
    const place = arregloFiltradoPorLugarAcapulco(lugaresXML)
    return res.status(200).send({status:'success',place,cantidad:place.length})
}
//norefactor






const ubicacionLugares = (req,res) =>{
    try{

    const data = fs.readFileSync(path.join(__dirname, "../data/places.xml"),{encoding: "utf8"});
    const data2 = fs.readFileSync(path.join(__dirname, "../data/prices.xml"),{encoding: "utf8"});
    const lugaresXML  = parser.parse(data);
    const preciosXML  = parser.parse(data2);

    const lugar = arregloFiltradoPorLugarAcapulco(lugaresXML);
    const precio = arregloFiltradoPorLugarAcapulco(preciosXML)

    const precioyLugar  = precio.filter(precio =>{
      const Gasolinera =  lugar.find(lugar => lugar['@_place_id']  == precio["@_place_id"] );
      precio.lugar = Gasolinera;
        
      return precio
    })
    
    const arregloDefinitivo =precioyLugar.filter(precio =>{
      
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
                [ precio['gas_price']['@_type']]:{
                    name: precio['gas_price']['@_type'],
                    price:precio['gas_price']['#text']
                } 
           }
        }

        return precio
    })

     return res.status(200).send({
         status: 'success',
         precios:arregloDefinitivo
     }) 
    }catch(e){
        return res.status(404).send({status:'error',msg: 'No se pudo leer el archivo'})

    }

}




module.exports = {
    cantidadLugares,
    ubicacionLugares
}


//TODO: refactor de variables. [LISTO]
//TODO: Excepciones.[LISTO]
//TODO: Limpiar codigo duplicado. [LISTO]
//TODO: Console.log innecesarios. [LISTO]
//TODO: Comentarios innecesarios. [LISTO]
//TODO: Documentar código. [LISTO]
//TODO: Arreglar Cron. [LISTO]