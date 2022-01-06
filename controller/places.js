const { response } = require("express");
const path = require("path");

const fs = require("fs");
const {XMLParser} = require("fast-xml-parser");

const parser = new XMLParser();

let lugares;
fs.readFile(path.join(__dirname, "../data/places.xml"),'utf-8',(err,data)=>{
    if(err) {
        throw new Error('no se puede leer');
    }
    else{
        // lugares =JSON.stringify(data);
        lugares  = parser.parse(data); 
    }



})



const places = (req,res = response) =>{

    const place = lugares.places.place.filter(lugar => lugar.cre_id == 'PL/23779/EXP/ES/2021' )

    return res.status(200).send({status:'success',place})
};

module.exports = {
    places
}