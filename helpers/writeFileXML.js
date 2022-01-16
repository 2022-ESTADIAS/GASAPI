const path = require("path");
const fs = require("fs");
const https = require("https");
/**
 * 
 * @param resource recurso a utilizar, solo puede haber 2, places y prices.
 * @description Helper encargado de generar el XML para su correcta lectura.
 */
const reporteXML = (resource)=>{

    const file = fs.createWriteStream(path.join(__dirname,`../data/${resource}.xml`));

    const request = https.get(`https://publicacionexterna.azurewebsites.net/publicaciones/${resource}`,(response)=>{    
     response.pipe(file)
    })

}

module.exports ={
    reporteXML
}