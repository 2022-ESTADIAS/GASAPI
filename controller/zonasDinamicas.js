const path = require("path");
const fs = require("fs");
const {XMLParser} = require("fast-xml-parser");
const {arregloFiltradoPorLugarAcapulco} = require("../helpers/filter_place_and_price")
const {registroEnUnaSolaDFila} = require("../helpers/registrosEnUnaFila")
const {registroEnUnaSolaFilaDinamico} = require("../helpers/registroEnUnaFilaDinamico")
const options = {
    ignoreAttributes: false,
    attributeNamePrefix : "@_",
    parseAttributeValue: true
};
const parser = new XMLParser(options);

const gasolinerasPorZonaDinamica = (req,res)=>{
    const {zona} = req.params;
    let arregloFiltradoPorZona = [];
    let arregloMapeadoConValoresNulos = [];
    let registrosEnUnaSolaFila = [];
    let eliminandoDuplicados = [];

    

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
  

        switch (zona){
            //registro repetido original 6
            case 'magallanes':

                registrosEnUnaSolaFila = arregloDefinitivo.filter((gasolinera)=> 
                gasolinera.lugar.cre_id.split('/')[1] == 4337  || gasolinera.lugar.cre_id.split('/')[1] == 3081  ||
                gasolinera.lugar.cre_id.split('/')[1] == 1162  || gasolinera.lugar.cre_id.split('/')[1] == 3901  ||
                gasolinera.lugar.cre_id.split('/')[1] == 9356  || gasolinera.lugar.cre_id.split('/')[1] == 23041 
                )

                          //logica de un solo registro cuando se repite 2 veces
                          arregloMapeadoConValoresNulos = registrosEnUnaSolaFila.map((gasolinera,i,arreglo) =>{
                            if(   i < registrosEnUnaSolaFila.length -1){
                                    
                                const registro = registroEnUnaSolaFilaDinamico(gasolinera,i,arreglo)
                                return registro
                                
                            }
                   
                    else{
                                 return gasolinera
                    }
    
                    })
                
                arregloFiltradoPorZona = arregloMapeadoConValoresNulos.filter(gasolinera => gasolinera !==undefined )
                eliminandoDuplicados = arregloMapeadoConValoresNulos.filter(gasolinera => gasolinera !==undefined ).filter( (gasolinera,i,arreglo)=>{
                    if(i < arreglo.length -1){
                        if(gasolinera.lugar.cre_id.split('/')[1] == arreglo[i+1].lugar.cre_id.split('/')[1] ){
                          return gasolinera
                        }
                      
                  }
              })

                     arregloFiltradoPorZona =  eliminandoDuplicados;


                break;
                
                //registro repetido original 5
                case 'coyuca':
                   registrosEnUnaSolaFila = arregloDefinitivo.filter((gasolinera)=> 
                    gasolinera.lugar.cre_id.split('/')[1] == 4263  || gasolinera.lugar.cre_id.split('/')[1] == 12908  ||
                    gasolinera.lugar.cre_id.split('/')[1] == 6980  || gasolinera.lugar.cre_id.split('/')[1] == 1180  ||
                    gasolinera.lugar.cre_id.split('/')[1] == 13644 
                    )
                                        //logica de un solo registro cuando se repite 2 veces
                          arregloMapeadoConValoresNulos = registrosEnUnaSolaFila.map((gasolinera,i,arreglo) =>{
                            if(   i < registrosEnUnaSolaFila.length -1){
                                    
                                const registro = registroEnUnaSolaFilaDinamico(gasolinera,i,arreglo)
                                return registro
                                
                            }
                   
                    else{
                                 return gasolinera
                             }
    
                    })
                
                arregloFiltradoPorZona = arregloMapeadoConValoresNulos.filter(gasolinera => gasolinera !==undefined )



                    break;
                    
                    //registro repetido  original 7
               case 'diamante':
                registrosEnUnaSolaFila = arregloDefinitivo.filter((gasolinera)=> 
                gasolinera.lugar.cre_id.split('/')[1] == 9012  || gasolinera.lugar.cre_id.split('/')[1] == 8699  ||
                gasolinera.lugar.cre_id.split('/')[1] == 12837 || gasolinera.lugar.cre_id.split('/')[1] == 8664  ||
                gasolinera.lugar.cre_id.split('/')[1] == 9016  || gasolinera.lugar.cre_id.split('/')[1] == 4328  ||
                gasolinera.lugar.cre_id.split('/')[1] == 4352  
                )

                          //logica de un solo registro cuando se repite 2 veces
                          arregloMapeadoConValoresNulos = registrosEnUnaSolaFila.map((gasolinera,i,arreglo) =>{
                            if(   i < registrosEnUnaSolaFila.length -1){
                                    
                                const registro = registroEnUnaSolaFilaDinamico(gasolinera,i,arreglo)
                                return registro
                                
                            }
                   
                    else{
                                 return gasolinera
                             }
    
                    })
                //quitando los valores nulos del arreglo
                arregloFiltradoPorZona = arregloMapeadoConValoresNulos.filter(gasolinera => gasolinera !==undefined )

               break;

                            //registro repetido  original 6
               case 'llano':
                registrosEnUnaSolaFila = arregloDefinitivo.filter((gasolinera)=> 
                gasolinera.lugar.cre_id.split('/')[1] == 4289  || gasolinera.lugar.cre_id.split('/')[1] == 5985  ||
                gasolinera.lugar.cre_id.split('/')[1] == 6888 || gasolinera.lugar.cre_id.split('/')[1] == 4765  ||
                gasolinera.lugar.cre_id.split('/')[1] == 20920  || gasolinera.lugar.cre_id.split('/')[1] == 22162 
                )

                    //logica de un solo registro cuando se repite 2 veces
                     arregloMapeadoConValoresNulos = registrosEnUnaSolaFila.map((gasolinera,i,arreglo) =>{
                        if(   i < registrosEnUnaSolaFila.length -1){
                                
                            const registro = registroEnUnaSolaFilaDinamico(gasolinera,i,arreglo)
                            return registro
                            
                        }
               
                else{
                             return gasolinera
                         }

                })
                //quitando los valores nulos del arreglo
                arregloFiltradoPorZona = arregloMapeadoConValoresNulos.filter(gasolinera => gasolinera !==undefined )

               break;

                //registro repetido  original 10
               case 'chilpo':
               registrosEnUnaSolaFila = arregloDefinitivo.filter((gasolinera)=> 
                gasolinera.lugar.cre_id.split('/')[1] == 19736  || gasolinera.lugar.cre_id.split('/')[1] == 1633  ||
                gasolinera.lugar.cre_id.split('/')[1] == 1638  || gasolinera.lugar.cre_id.split('/')[1] == 8229  ||
                gasolinera.lugar.cre_id.split('/')[1] == 10726  || gasolinera.lugar.cre_id.split('/')[1] == 6887 ||
                gasolinera.lugar.cre_id.split('/')[1] == 20003  || gasolinera.lugar.cre_id.split('/')[1] == 22049 ||
                gasolinera.lugar.cre_id.split('/')[1] == 8327  || gasolinera.lugar.cre_id.split('/')[1] == 6059 
                )
      //logica de un solo registro cuando se repite 2 veces
      arregloMapeadoConValoresNulos = registrosEnUnaSolaFila.map((gasolinera,i,arreglo) =>{
        if(   i < registrosEnUnaSolaFila.length -1){
                
            const registro = registroEnUnaSolaFilaDinamico(gasolinera,i,arreglo)
            return registro
            
        }

else{
             return gasolinera
         }

})
            //quitando los valores nulos del arreglo
            arregloFiltradoPorZona = arregloMapeadoConValoresNulos.filter(gasolinera => gasolinera !==undefined )

            

               break;

                      //registro repetido  original 5
               case 'rena':
                registrosEnUnaSolaFila = arregloDefinitivo.filter((gasolinera)=> 
                gasolinera.lugar.cre_id.split('/')[1] == 4332  || gasolinera.lugar.cre_id.split('/')[1] == 2942  ||
                gasolinera.lugar.cre_id.split('/')[1] == 9588  || gasolinera.lugar.cre_id.split('/')[1] == 1192  ||
                gasolinera.lugar.cre_id.split('/')[1] == 1190   
                )

                   //logica de un solo registro cuando se repite 2 veces
            arregloMapeadoConValoresNulos = registrosEnUnaSolaFila.map((gasolinera,i,arreglo) =>{
                if(   i < registrosEnUnaSolaFila.length -1){
                        
                    const registro = registroEnUnaSolaFilaDinamico(gasolinera,i,arreglo)
                    return registro
                    
                }
       
        else{
                     return gasolinera
                 }

        })
                //quitando los valores nulos del arreglo
                arregloFiltradoPorZona = arregloMapeadoConValoresNulos.filter(gasolinera => gasolinera !==undefined )


               break;   

               case 'muller':
                registrosEnUnaSolaFila= arregloDefinitivo.filter((gasolinera)=> 
                gasolinera.lugar.cre_id.split('/')[1] == 6409  || gasolinera.lugar.cre_id.split('/')[1] == 13058  
                )
         //logica de un solo registro cuando se repite 2 veces
         arregloMapeadoConValoresNulos = registrosEnUnaSolaFila.map((gasolinera,i,arreglo) =>{
            if(   i < registrosEnUnaSolaFila.length -1){
                    
                const registro = registroEnUnaSolaFilaDinamico(gasolinera,i,arreglo)
                return registro
                
            }
   
    else{
                 return gasolinera
             }

    })
                //quitando los valores nulos del arreglo
                arregloFiltradoPorZona = arregloMapeadoConValoresNulos.filter(gasolinera => gasolinera !==undefined )

                
               break;
                 //registro repetido  original 6
               case 'servifer':
                registrosEnUnaSolaFila= arregloDefinitivo.filter((gasolinera)=> 
                gasolinera.lugar.cre_id.split('/')[1] == 4317  || gasolinera.lugar.cre_id.split('/')[1] == 4770  ||
                gasolinera.lugar.cre_id.split('/')[1] == 3644  || gasolinera.lugar.cre_id.split('/')[1] == 7528  ||
                gasolinera.lugar.cre_id.split('/')[1] == 6832  || gasolinera.lugar.cre_id.split('/')[1] == 7793
                )
                
                
                    //logica de un solo registro cuando se repite 2 veces
         arregloMapeadoConValoresNulos = registrosEnUnaSolaFila.map((gasolinera,i,arreglo) =>{
            if(   i < registrosEnUnaSolaFila.length -1){
                    
                const registro = registroEnUnaSolaFilaDinamico(gasolinera,i,arreglo)
                return registro
                
            }
   
    else{
                 return gasolinera
             }

    })
                //quitando los valores nulos del arreglo
                arregloFiltradoPorZona = arregloMapeadoConValoresNulos.filter(gasolinera => gasolinera !==undefined )

               break;  

               //registro repetido  original 9
               case 'cruz-grande':
                registrosEnUnaSolaFila= arregloDefinitivo.filter((gasolinera)=> 
                gasolinera.lugar.cre_id.split('/')[1] == 22575  || gasolinera.lugar.cre_id.split('/')[1] == 4341  ||
                gasolinera.lugar.cre_id.split('/')[1] == 21109  || gasolinera.lugar.cre_id.split('/')[1] == 8438  ||
                gasolinera.lugar.cre_id.split('/')[1] == 8441  || gasolinera.lugar.cre_id.split('/')[1] == 8424 ||
                gasolinera.lugar.cre_id.split('/')[1] == 4577  || gasolinera.lugar.cre_id.split('/')[1] == 4574 ||
                gasolinera.lugar.cre_id.split('/')[1] == 8420
                )

              //logica de un solo registro cuando se repite 2 veces
         arregloMapeadoConValoresNulos = registrosEnUnaSolaFila.map((gasolinera,i,arreglo) =>{
            if(   i < registrosEnUnaSolaFila.length -1){
                    
                const registro = registroEnUnaSolaFilaDinamico(gasolinera,i,arreglo)
                return registro
                
            }
   
    else{
                 return gasolinera
             }

    })
                
                arregloFiltradoPorZona = arregloMapeadoConValoresNulos.filter(gasolinera => gasolinera !==undefined )

               break;  
            //registro repetido  original 10
               case 'ejido-modelo':
                registrosEnUnaSolaFila = arregloDefinitivo.filter((gasolinera)=> 
                gasolinera.lugar.cre_id.split('/')[1] == 11270  || gasolinera.lugar.cre_id.split('/')[1] == 1206  ||
                gasolinera.lugar.cre_id.split('/')[1] == 1535  || gasolinera.lugar.cre_id.split('/')[1] == 10951  ||
                gasolinera.lugar.cre_id.split('/')[1] == 22646  || gasolinera.lugar.cre_id.split('/')[1] == 5537 ||
                gasolinera.lugar.cre_id.split('/')[1] == 1453  || gasolinera.lugar.cre_id.split('/')[1] == 1087 ||
                gasolinera.lugar.cre_id.split('/')[1] == 4334  || gasolinera.lugar.cre_id.split('/')[1] == 6355
                )
                
              //logica de un solo registro cuando se repite 2 veces
              arregloMapeadoConValoresNulos = registrosEnUnaSolaFila.map((gasolinera,i,arreglo) =>{
                if(   i < registrosEnUnaSolaFila.length -1){
                        
                    // const registro = registroEnUnaSolaFilaDinamico(gasolinera,i,arreglo)
                    const registro = registroEnUnaSolaFilaDinamico(gasolinera,i,arreglo)
                    return registro
                    
                }
       
           
    
        })
                    
                    arregloFiltradoPorZona = arregloMapeadoConValoresNulos.filter(gasolinera => gasolinera !==undefined )
               break; 

               case 'costera-diana':
                registrosEnUnaSolaFila = arregloDefinitivo.filter((gasolinera)=> 
                gasolinera.lugar.cre_id.split('/')[1] == 4339  || gasolinera.lugar.cre_id.split('/')[1] == 1151  ||
                gasolinera.lugar.cre_id.split('/')[1] == 10950  || gasolinera.lugar.cre_id.split('/')[1] == 9019  ||
                gasolinera.lugar.cre_id.split('/')[1] == 19967  
                )

                                           //logica de un solo registro cuando se repite 2 veces
                     arregloMapeadoConValoresNulos = registrosEnUnaSolaFila.map((gasolinera,i,arreglo) =>{
                         console.log( gasolinera.lugar.cre_id.split('/')[1]);
                        if( gasolinera.lugar.cre_id.split('/')[1] == 4339  ||  gasolinera.lugar.cre_id.split('/')[1] == 9019 
                        || gasolinera.lugar.cre_id.split('/')[1] == 10950 
                        ){
                            if(   i < registrosEnUnaSolaFila.length -1){
                                
                                const registro = registroEnUnaSolaFilaDinamico(gasolinera,i,arreglo)
                                return registro
                                
                            }
                    }
               
                else{
                             return gasolinera
                         }

                })
                //quitando los valores nulos del arreglo
                arregloFiltradoPorZona = arregloMapeadoConValoresNulos.filter(gasolinera => gasolinera !==undefined )

               break; 


               default:
                return res.status(404).send({
                    status: 'error',
                    msg:"La zona no existe"
                }) 


        }
    


         return res.status(200).send({
             status: 'success',
             precios:arregloFiltradoPorZona,
             cantidad:arregloFiltradoPorZona.length,
         }) 
        }catch(e){
            console.log(e)
            return res.status(404).send({status:'error',msg: 'No se pudo leer el archivo'})
    
        }



}



module.exports ={
    gasolinerasPorZonaDinamica
}