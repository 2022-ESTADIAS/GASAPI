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
                [precio['gas_price'][0]['@_type']]:{
                    name: precio['gas_price'][0]['@_type'],
                    price:precio['gas_price'][0]['#text']
                },
                [precio['gas_price'][1]['@_type']]:{
                    name: precio['gas_price'][1]['@_type'],
                    price:precio['gas_price'][1]['#text']
                },
                [precio['gas_price'][2]['@_type']]:{
                    name: precio['gas_price'][2]['@_type'],
                    price:precio['gas_price'][2]['#text']
                },
            }
        }else if(precio['gas_price'][0] && precio['gas_price'][1]){
            precio.type = {
                [precio['gas_price'][0]['@_type']]:{
                    name: precio['gas_price'][0]['@_type'],
                    price:precio['gas_price'][0]['#text']
                },
                [precio['gas_price'][1]['@_type']]:{
                    name: precio['gas_price'][1]['@_type'],
                    price:precio['gas_price'][1]['#text']
                },
            }
        }else if(precio['gas_price'][0]){
            precio.type = {
              
                [ precio['gas_price'][0]['@_type']]:{
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


const ubicacionLugaresUnSoloRegistro = (req,res) =>{
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
                [precio['gas_price'][0]['@_type']]:{
                    name: precio['gas_price'][0]['@_type'],
                    price:precio['gas_price'][0]['#text']
                },
                [precio['gas_price'][1]['@_type']]:{
                    name: precio['gas_price'][1]['@_type'],
                    price:precio['gas_price'][1]['#text']
                },
                [precio['gas_price'][2]['@_type']]:{
                    name: precio['gas_price'][2]['@_type'],
                    price:precio['gas_price'][2]['#text']
                },
            }
        }else if(precio['gas_price'][0] && precio['gas_price'][1]){
            precio.type = {
                [precio['gas_price'][0]['@_type']]:{
                    name: precio['gas_price'][0]['@_type'],
                    price:precio['gas_price'][0]['#text']
                },
                [precio['gas_price'][1]['@_type']]:{
                    name: precio['gas_price'][1]['@_type'],
                    price:precio['gas_price'][1]['#text']
                },
            }
        }else if(precio['gas_price'][0]){
            precio.type = {
              
                [ precio['gas_price'][0]['@_type']]:{
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

    const arregloDefinitivoUnSoloRegistro =arregloDefinitivo.map((registro,i,arreglo)=>{
        let regular = {};
                             
        // console.log(registro.type)
        if(registro.lugar.cre_id.split("/")[1] == 9019 || registro.lugar.cre_id.split("/")[1] ==9016 ||
        registro.lugar.cre_id.split("/")[1] == 9012 || registro.lugar.cre_id.split("/")[1] ==8229 ||
        registro.lugar.cre_id.split("/")[1] == 7793 || registro.lugar.cre_id.split("/")[1] ==6832 ||
        registro.lugar.cre_id.split("/")[1] == 4770 || registro.lugar.cre_id.split("/")[1] ==4765 ||
        registro.lugar.cre_id.split("/")[1] == 4352 || registro.lugar.cre_id.split("/")[1] ==1087 ||
        registro.lugar.cre_id.split("/")[1] == 4339 || registro.lugar.cre_id.split("/")[1] ==4332 ||
        registro.lugar.cre_id.split("/")[1] == 4317 || registro.lugar.cre_id.split("/")[1] ==4289||
        registro.lugar.cre_id.split("/")[1] == 4263 || registro.lugar.cre_id.split("/")[1] ==23041||
        registro.lugar.cre_id.split("/")[1] == 20920 || registro.lugar.cre_id.split("/")[1] ==1206||
        registro.lugar.cre_id.split("/")[1] == 1192 || registro.lugar.cre_id.split("/")[1] ==1190 ||
        registro.lugar.cre_id.split("/")[1] == 1162 || registro.lugar.cre_id.split("/")[1] ==10951 ||
        registro.lugar.cre_id.split("/")[1] == 10950 
        ){
            // console.log(registro['@_place_id'] == arreglo[i+1]['@_place_id'])
            if(registro['@_place_id'] == arreglo[i+1]['@_place_id']){
                if(registro.type.regular){
                    // console.log(registro)
                    // console.log(arreglo[i+1].type.premium)
                     if(arreglo[i+1].type.premium && arreglo[i+1].type.diesel){
                         registro.type.premium ={
                            ...arreglo[i+1].type.premium,
                           }
                           registro.type.diesel = {
                            ...arreglo[i+1].type.diesel,
                           }
                     }else if(arreglo[i+1].type.diesel){
                        registro.type.diesel = {
                            ...arreglo[i+1].type.diesel,
                           }
                     }else{
                        registro.type.premium ={
                            ...arreglo[i+1].type.premium,
                           }
                     }
                    //  console.log(registro.type)
                     console.log(registro)
                }
                // return registro
            }

            return registro
        }else {
            // return registro
        }
        // return registro

    })


    // console.log(arregloDefinitivoUnSoloRegistro[2])
    


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
    ubicacionLugares,
    ubicacionLugaresUnSoloRegistro
}


//TODO: refactor de variables. [LISTO]
//TODO: Excepciones.[LISTO]
//TODO: Limpiar codigo duplicado. [LISTO]
//TODO: Console.log innecesarios. [LISTO]
//TODO: Comentarios innecesarios. [LISTO]
//TODO: Documentar código. [LISTO]
//TODO: Arreglar Cron. [LISTO]