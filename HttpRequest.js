class HttpRequest
{
  constructor(httpMethod)
  {
    this.options = {"method": httpMethod};
  }
  getOptions(){
    return this.options;
  }
  addBearerToken(authId, authPassword)
  {
    this.options['headers'] = {
      "Authorization" : "Basic " + Utilities.base64Encode(authId + ":" + authPassword),
      "Expires" : "0",
      "Cache-Control" : "no-cache"
    };
  }
  addFormBody(KeyValuePairArray)
  {
    // [{key:value}, {key:value}] = array of (key,value) pairs
    if (KeyValuePairArray == null) return;

    //replace request body if it is already present
    let body = "";
    KeyValuePairArray.forEach((pair) => {
        if (body.length > 0) body += '&';
        body += `${pair[0]}=${pair[1]}`;
      });
    
    this.options['headers']['Content-Type'] = "application/x-www-form-urlencoded";
    this.options['payload'] = body;
    this.options['muteHttpExceptions'] = true;
  }
}
