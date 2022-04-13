class Twilio
{
  constructor()
  {
    let _secrets = new TwilioConnectionSecrets();
    this.TwilioAccountSid = _secrets.getUser();
    this.TwilioAccountToken = _secrets.getPassword();
    this.TwilioFlowSid = _secrets.getFlowSid();
    this.TwilioAccountPhone = _secrets.getTwilioAccountPhone();
    
    this.TwilioFlowUrl = this._makeTwilioFlowUrl_();
    
    this.HttpGetOptions = new HttpRequest("get");
    this.HttpGetOptions.addBearerToken(this.TwilioAccountSid, this.TwilioAccountToken)

    this.HttpPostOptions = new HttpRequest("post");
    this.HttpPostOptions.addBearerToken(this.TwilioAccountSid, this.TwilioAccountToken)
    
    this.HttpDeleteOptions = new HttpRequest("delete");
    this.HttpDeleteOptions.addBearerToken(this.TwilioAccountSid, this.TwilioAccountToken)
  }
    
  _makeTwilioFlowUrl_()
  {
    return `https://studio.twilio.com/v2/Flows/${this.TwilioFlowSid}/Executions`;
  }
  
  _makeTwilioExecutionUrl_(ExecutionSid)
  {
    return `${this.TwilioFlowUrl}/${ExecutionSid}`;
  }
  
  createExecution()
  {
    let url = this.TwilioFlowUrl;
 let requestOptions222 = {
     'method' : 'post',
     'headers': {
         "Authorization" : "Basic " + Utilities.base64Encode(this.TwilioAccountSid + ":" + this.TwilioAccountToken),
         "Content-Type" : "application/x-www-form-urlencoded",
         "Expires" : "0",
         "Cache-Control" : "no-cache"
       },
     'payload' : `To=${this.TwilioAccountPhone}&From=${this.TwilioAccountPhone}`, // HTTP request body
     'muteHttpExceptions' : true
 }

    let requestFormBody = {
      'To' : this.TwilioAccountPhone,
      'From' : this.TwilioAccountPhone
      };
    let requestOptions = new HttpRequest('post');
    requestOptions.addBearerToken(this.TwilioAccountSid, this.TwilioAccountToken);
    requestOptions.addFormBody(requestFormBody);
let opts = requestOptions.getOptions();
    let response = UrlFetchApp.fetch(url, requestOptions.getOptions());
    let result = [];
    if (response != null && response.getResponseCode() == 201)
    {
      result.push(response.getContentText())
    } else {
      result.push('error creating Execution')
      result.push('status code: ' + response.getResponseCode())
      result.push('content: ' + response.getContentText())
    }
    return result;
  }
  
  getExecutions()
  {
    let url = this.TwilioFlowUrl;
    let opts = this.HttpGetOptions.getOptions()
    let response = UrlFetchApp.fetch(url, opts);
    let json = response.getContentText();
    let data = JSON.parse(json);
    
    if (data != null && data.executions != null)
    {
      return data.executions;
    }
    return null;
  }
  
  getExecutionData()
  {
    let executions = this.getExecutions();
    
    if (executions == null) return null;
    
    let results = [];
    for (let i = 0; i < executions.length; i++)
    {
      let execLog = this._getExecutionContext_(executions[i].links.execution_context);
      results.push({'date_created' : executions[i].date_created, 'sid': executions[i].sid, 'log' : execLog});
    }
    return results;
  }
  
  _getExecutionContext_(executionUrl)
  {
    let response = UrlFetchApp.fetch(executionUrl, this.HttpGetOptions.getOptions());
    let json = response.getContentText();
    let data = JSON.parse(json);
    if (data != null
      && data.context != null
      && data.context.widgets != null
      && data.context.widgets.save_report != null
      && data.context.widgets.save_report.report_status != null
      )
    {
      return(data.context.widgets.save_report.report_status);
    }
    return null;
  }

  deleteExecutionBySid(ExecutionSid)
  {
    let executionUrl = this._makeTwilioExecutionUrl_(ExecutionSid);
    return this.deleteExecution(executionUrl);
  }
  
  deleteExecution(executionUrl)
  {
    try
    {
      let response = UrlFetchApp.fetch(executionUrl, this.HttpDeleteOptions.getOptions());
      return ['purged', executionUrl];
    }
    catch (ex)
    {
      return ['purge failed ' + ex, executionUrl];
    }
  }
}
