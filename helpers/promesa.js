const promesa  = (arreglo) =>{
  return  new Promise((resolve,reject)=>{

        const arregloComleto =  arreglo.map((registro,i,arreglo)=>{
              // console.log(registro['@_place_id'])
              //  console.log(arreglo[i+1]['@_place_id'])
              if( registro["@_place_id"] == 6564 || registro["@_place_id"] == 11028 || registro["@_place_id"] == 2869 || registro["@_place_id"] == 7347 || registro["@_place_id"] ==10500 || registro["@_place_id"] ==26774 || registro["@_place_id"] ==5799 || registro["@_place_id"] == 14500 || registro["@_place_id"] ==8241 ||registro["@_place_id"] ==3014 || registro["@_place_id"] ==20864|| registro["@_place_id"]==9991  || registro["@_place_id"]==9317 || registro["@_place_id"]== 14432 ||registro["@_place_id"]==9476||registro["@_place_id"]==9936 || registro["@_place_id"]==6788|| registro["@_place_id"]==6797|| registro["@_place_id"]==5460|| registro["@_place_id"]==8396|| registro["@_place_id"]==7179|| registro["@_place_id"]==24079|| registro["@_place_id"]==6594|| registro["@_place_id"]==10843|| registro["@_place_id"]==10704|| registro["@_place_id"]==2773|| registro["@_place_id"]==2972|| registro["@_place_id"]==8197|| registro["@_place_id"]==15659|| registro["@_place_id"]==6490|| registro["@_place_id"]==6670|| registro["@_place_id"]==6718|| registro["@_place_id"]==8740|| registro["@_place_id"]==8438|| registro["@_place_id"]==8831|| registro["@_place_id"]==6847|| registro["@_place_id"]==26329|| registro["@_place_id"]==5961|| registro["@_place_id"]==24272|| registro["@_place_id"]==9488|| registro["@_place_id"]==9829|| registro["@_place_id"]==9862|| registro["@_place_id"]==7144|| registro["@_place_id"]==6643|| registro["@_place_id"]==9539|| registro["@_place_id"]==13411|| registro["@_place_id"]==2876|| registro["@_place_id"]==3305|| registro["@_place_id"]==13090|| registro["@_place_id"]==26416|| registro["@_place_id"]==5358|| registro["@_place_id"]==2669|| registro["@_place_id"]==2798|| registro["@_place_id"]==22451|| registro["@_place_id"]==6820|| registro["@_place_id"]==8504|| registro["@_place_id"]==25805|| registro["@_place_id"]==6438|| place["@_place_id"]==3157|| registro["@_place_id"]==13089|| registro["@_place_id"]==10145|| registro["@_place_id"]==22150|| registro["@_place_id"]==3447|| registro["@_place_id"]==3494|| registro["@_place_id"]==9763|| registro["@_place_id"]==12972|| registro["@_place_id"]==8499|| registro["@_place_id"]==22482|| registro["@_place_id"]==25679|| registro["@_place_id"]==9367|| registro["@_place_id"]==5020){
                  

                if(registro['@_place_id'] == arreglo[i+1]['@_place_id'] ){
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
                            
                         }
                    }
                    // console.log(registro)
                    return registro
                  }else{
                      return registro
                  }


              }
     
      
 
          })
   
          resolve(arregloComleto)

      })

}



module.exports ={
    promesa
}