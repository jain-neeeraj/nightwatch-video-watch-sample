
/* To be uncommented in case API requests are needed
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let response, responsedata;

module.exports = {

    apiRequest:  function (URL,END_POINT,REQUEST_TYPE,PARAMS,dataToGet,callbackFunction){
        if(PARAMS){
            if(REQUEST_TYPE=="GET"){
                END_POINT=END_POINT+"?"+PARAMS
            }
            
        }
        var xhr = new XMLHttpRequest();
        xhr.open(REQUEST_TYPE,URL+"/"+END_POINT, true,);
        xhr.send()
        xhr.onreadystatechange = processRequest;
       // Promise.all(
         function processRequest(e) {
            console.log(xhr.status)
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.status)
                // time to sleep!!!
                 response = xhr.responseText;
                
                console.log(response);
                if(dataToGet){
                    JSON.stringify(response)
                    responsedata=response.split(dataToGet+"\":\"")[1].split("\"")[0]
                    console.log("data is:"+responsedata);
                }
                if(callbackFunction){
                    callbackFunction();
                    
                
                    
                }
                return responsedata
            }
        }
       
       
    },

    getResponseData: function(URL,END_POINT,REQUEST_TYPE,PARAMS,dataToGet){
        
       var responseData=this.apiRequest(URL,END_POINT,REQUEST_TYPE,PARAMS,dataToGet,function(){
        console.log("from revious function:"+responseData)
        })
        

    }
}

*/
