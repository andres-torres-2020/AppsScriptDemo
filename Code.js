function onOpen()
{
  SpreadsheetApp.setActiveSheet('000-Console');
}

function SHOW_SECRETS()
{
  let secrets = new TwilioConnectionSecrets();
  let results = new ConsoleFunctionResultView('app secrets');
  let summary = ` acctSid: ${secrets.TwilioAccountSid}\n acctToken: ${secrets.TwilioAccountToken}\n FlowSid: ${secrets.TwilioFlowSid}\n TwilioAccountPhone: ${secrets.TwilioAccountPhone}`;
  results.addSummary(summary);
  return results.getView();
}

function CREATE_TESTING_TWILIO_EXECUTION()
{
  let twilio = new Twilio();
  let i = 0;
  let results = new ConsoleFunctionResultView('Request new Execution');
  let details = "";
  for (i = 0; i < 1; i++)
  {
    details += twilio.createExecution() + '\n';
  }
  
  results.addSummary(`Ran Twilio Studio Flow ${i} time(s)`);
  results.addRow(details);
  return results.getView();
}

function IMPORT_TWILIO_EXECUTIONS()
{
  let results = new ConsoleFunctionResultView('import');
//  let exists = false;
//  let numRows = table.getLastRow();
//  if (numRows <= 1)
//  {
//    results.addSummary("info: nothing in the database (import everything from API")
//  }
//  else
//  {
//    let sids = table.getRange('A2:A' + numRows.toString()).getDataTable(true)
//    results.addRow(`TABLE range: ${'A2:A' + numRows.toString()}\n  # sids : ${sids.length}`)
//  }
//return results.getView();
//*
  let twilio = new Twilio();
  let executions = twilio.getExecutionData();

  if (executions == null || executions.length <= 0)
  {
    results.addRow('No Twilio Executions exist');
  }
  else
  {
    let executionTable = new ExecutionTable()
    let details = '';
    executions.forEach((x, index) => {
      let result = executionTable.executionExists(x.sid)
      details += `[${index}] date_created: ${x.date_created} sid: ${x.sid} log: ${x.log + ' ' + result}\n`;
      executionTable.add(x);
    });
    results.addSummary(`# executions found : ${executions.length}`);
    results.addRow(details);
  }
  return results.getView();
}

function PURGE_TWILIO_EXECUTION_BY_SID(ExecutionSid)
{
  let results = new ConsoleFunctionResultView('purge by sid');
  let twilio = new Twilio();
  let executionResults = twilio.deleteExecutionBySid(ExecutionSid);
  let details = `sid: ${ExecutionSid} result: ${executionResults[0]} ExecutionUrl: ${executionResults[1]}\n`;
  results.addRow(details);
  return results.getView();
}

function PURGE_TWILIO_EXECUTIONS()
{
  let results = new ConsoleFunctionResultView('purge');
  let twilio = new Twilio();
  let executions = twilio.getExecutions();

  if (executions == null || executions.length <= 0) results.addRow('No Executions to purge');
  
  let details = "";
  executions.forEach((x, index) => {
    //details += x.url + '\n';
    let executionResults = twilio.deleteExecution(x.url);
    details += `[${index}] date_created: ${x.date_created} sid: ${x.sid} result: ${executionResults[0]} ExecutionUrl: ${executionResults[1]}\n`;
  });
  results.addSummary(`# executions purged : ${executions.length}`);
  results.addRow(details);
  return results.getView();
}

function SHOW_TWILIO_EXECUTIONS()
{
  let twilio = new Twilio();
  let results = new ConsoleFunctionResultView('show executions');
  let executions = twilio.getExecutionData();

  if (executions == null || executions.length <= 0)
  {
    results.addRow('No Executions exist');
  }
  else
  {
    results.addSummary(`# executions: ${executions.length}`);
    let details = "";
    executions.forEach((x, index) => { details += `[${index}] date_created: ${x.date_created} sid: ${x.sid} log: ${x.log}\n` });
  }
  return results.getView();
}

function SHOW_APPS_SCRIPT_CODE()
{
  let results = new ConsoleFunctionResultView('show Google Spreadsheet scripts');
  //let scripts = ScriptApp.getAuthorizationInfo()
  
  let details = `
  NOTE: use clasp to store files locally and then to github & back! (https://codelabs.developers.google.com/codelabs/clasp/#0)
  -must provide a Script Id to pull/push Apps Script code associated with a stand-alone script or for script bound to a Google Sheet
  
  ScriptApp.getProjectKey : ${ScriptApp.getProjectKey()}
  ScriptApp.getAuthorizationInfo : ${JSON.stringify(ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL))}
  ScriptApp.getScriptId : ${JSON.stringify(ScriptApp.getScriptId())}
  ScriptApp.getOAuthToken : ${JSON.stringify(ScriptApp.getOAuthToken())}
  ScriptApp.getService : ${JSON.stringify(ScriptApp.getService().getUrl())}
  ScriptProperties.getKeys : ${JSON.stringify(ScriptProperties.getKeys())}
  ScriptProperties.getProperties : ${JSON.stringify(ScriptProperties.getProperties())}
  `;
  results.addSummary(details);
  return results.getView();
}

