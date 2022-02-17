const registroEnUnaSolaDFila = (registro,i,arreglo,tres= false)  =>{    


    if(registro['@_place_id'] == arreglo[i+1]['@_place_id']  && !tres ){
        if(registro.type.regular){
       
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
      
        }
        else  if(registro.type.diesel){
             if(arreglo[i+1].type.premium && arreglo[i+1].type.regular){
                 registro.type.premium ={
                    ...arreglo[i+1].type.premium,
                   }
                   registro.type.regular = {
                    ...arreglo[i+1].type.regular,
                   }
             }else if(arreglo[i+1].type.regular){
                registro.type.regular = {
                    ...arreglo[i+1].type.regular,
                   }
             }else{
                registro.type.premium ={
                    ...arreglo[i+1].type.premium,
                   }
             }
        }
      
      
       else if(registro.type.premium){
             if(arreglo[i+1].type.regular && arreglo[i+1].type.diesel){
                 registro.type.regular ={
                    ...arreglo[i+1].type.regular,
                   }
                
             }else if(arreglo[i+1].type.regular){
                registro.type.regular ={
                    ...arreglo[i+1].type.regular,
                   }
             }
        }
     

        return registro
        // console.log(registro)
      }     else if(registro['@_place_id'] == arreglo[i+1]['@_place_id'] &&  arreglo[i+1]['@_place_id'] ==  arreglo[i+2]['@_place_id']  && tres){
        if(registro.type.diesel){
            if(arreglo[i+1].type.regular && arreglo[i+2].type.premium){
                registro.type.premium ={
                   ...arreglo[i+2].type.premium,
                  }
                  registro.type.regular = {
                       ...arreglo[i+1].type.regular,
                      }
                }
                else   if(arreglo[i+1].type.premium && arreglo[i+2].type.regular){
                    registro.type.premium ={
                       ...arreglo[i+1].type.premium,
                      }
                      registro.type.regular = {
                           ...arreglo[i+2].type.regular,
                          }
                    }
            } 
          if(registro.type.regular){
                if(arreglo[i+1].type.diesel && arreglo[i+2].type.premium){
                    registro.type.premium ={
                       ...arreglo[i+2].type.premium,
                      }
                      registro.type.diesel = {
                           ...arreglo[i+1].type.diesel,
                          }
                    }
            }
            return registro
        }

}

module.exports ={
    registroEnUnaSolaDFila
}