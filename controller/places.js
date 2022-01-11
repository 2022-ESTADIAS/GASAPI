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
const lugaresPlaces = (req,res) =>{
    const data = fs.readFileSync(path.join(__dirname, "../data/places.xml"),{encoding: "utf8"});
    const data2 = fs.readFileSync(path.join(__dirname, "../data/prices.xml"),{encoding: "utf8"});
    places  = parser.parse(data);
    const precios  = parser.parse(data2);

    //acapulco
    const place = places.places.place.filter(place => place["@_place_id"] == 11415 || place["@_place_id"] == 12914 || place["@_place_id"] == 2798 || place["@_place_id"] == 13089 || place["@_place_id"] ==13090 || place["@_place_id"] ==13350 || place["@_place_id"] ==13411 || place["@_place_id"] == 3157 || place["@_place_id"] ==2869 ||place["@_place_id"] ==3014 || place["@_place_id"] ==2972 || place["@_place_id"] ==2773 ||place["@_place_id"]==2753 ||place["@_place_id"]==2876 ||place["@_place_id"]== 14079 ||place["@_place_id"]==14432 ||place["@_place_id"]==15659 ||place["@_place_id"]==15684 ||place["@_place_id"]== 16211 || place["@_place_id"]==20864 ||place["@_place_id"]==2669  || place["@_place_id"]==3305 || place["@_place_id"]== 21138 ||place["@_place_id"]==21639||place["@_place_id"]==21644 || place["@_place_id"]==21774|| place["@_place_id"]==22451|| place["@_place_id"]==24079|| place["@_place_id"]==25805|| place["@_place_id"]==26416|| place["@_place_id"]==26774|| place["@_place_id"]==3989|| place["@_place_id"]==10843|| place["@_place_id"]==11028|| place["@_place_id"]==6718|| place["@_place_id"]==7347|| place["@_place_id"]==6787|| place["@_place_id"]==6797|| place["@_place_id"]==6260|| place["@_place_id"]==6739|| place["@_place_id"]==6490|| place["@_place_id"]==7357|| place["@_place_id"]==6757|| place["@_place_id"]==6788|| place["@_place_id"]==6594|| place["@_place_id"]==6820|| place["@_place_id"]==6564|| place["@_place_id"]==6438|| place["@_place_id"]==6241|| place["@_place_id"]==6847|| place["@_place_id"]==6559|| place["@_place_id"]==7179|| place["@_place_id"]==6690|| place["@_place_id"]==6972|| place["@_place_id"]==5358|| place["@_place_id"]==5543|| place["@_place_id"]==5460|| place["@_place_id"]==7888|| place["@_place_id"]==8504|| place["@_place_id"]==8197|| place["@_place_id"]==8438|| place["@_place_id"]==8396|| place["@_place_id"]==8740|| place["@_place_id"]==8831|| place["@_place_id"]==9476|| place["@_place_id"]==9317|| place["@_place_id"]==9991|| place["@_place_id"]==9936|| place["@_place_id"]==10145|| place["@_place_id"]==10500|| place["@_place_id"]==10704)
     const precio = precios.places.place.filter(precio => precio["@_place_id"] == 11415 || precio["@_place_id"] == 12914 || precio["@_place_id"] == 2798 || precio["@_place_id"] == 13089 || precio["@_place_id"] ==13090 || precio["@_place_id"] ==13350 || precio["@_place_id"] ==13411 || precio["@_place_id"] == 3157 || precio["@_place_id"] ==2869 ||precio["@_place_id"] ==3014 || precio["@_place_id"] ==2972 || precio["@_place_id"] ==2773 ||precio["@_place_id"]==2753 ||precio["@_place_id"]==2876 ||precio["@_place_id"]== 14079 ||precio["@_place_id"]==14432 ||precio["@_place_id"]==15659 ||precio["@_place_id"]==15684 ||precio["@_place_id"]== 16211 || precio["@_place_id"]==20864 ||precio["@_place_id"]==2669  || precio["@_place_id"]==3305 || precio["@_place_id"]== 21138 ||precio["@_place_id"]==21639||precio["@_place_id"]==21644 || precio["@_place_id"]==21774|| precio["@_place_id"]==22451|| precio["@_place_id"]==24079|| precio["@_place_id"]==25805|| precio["@_place_id"]==26416|| precio["@_place_id"]==26774|| precio["@_place_id"]==3989|| precio["@_place_id"]==10843|| precio["@_place_id"]==11028|| precio["@_place_id"]==6718|| precio["@_place_id"]==7347|| precio["@_place_id"]==6787|| precio["@_place_id"]==6797|| precio["@_place_id"]==6260|| precio["@_place_id"]==6739|| precio["@_place_id"]==6490|| precio["@_place_id"]==7357|| precio["@_place_id"]==6757|| precio["@_place_id"]==6788|| precio["@_place_id"]==6594|| precio["@_place_id"]==6820|| precio["@_place_id"]==6564|| precio["@_place_id"]==6438|| precio["@_place_id"]==6241|| precio["@_place_id"]==6847|| precio["@_place_id"]==6559|| precio["@_place_id"]==7179|| precio["@_place_id"]==6690|| precio["@_place_id"]==6972|| precio["@_place_id"]==5358|| precio["@_place_id"]==5543|| precio["@_place_id"]==5460|| precio["@_place_id"]==7888|| precio["@_place_id"]==8504|| precio["@_place_id"]==8197|| precio["@_place_id"]==8438|| precio["@_place_id"]==8396|| precio["@_place_id"]==8740|| precio["@_place_id"]==8831|| precio["@_place_id"]==9476|| precio["@_place_id"]==9317|| precio["@_place_id"]==9991|| precio["@_place_id"]==9936|| precio["@_place_id"]==10145|| precio["@_place_id"]==10500|| precio["@_place_id"]==10704)
    
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
    console.log(arregloDefinitivo);

     return res.status(200).send({
         status: 'success',
         precios:arregloDefinitivo
     }) 
}

module.exports = {
    lugares,
    lugaresPlaces
}