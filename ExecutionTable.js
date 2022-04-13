class ExecutionTable
{
  constructor()
  {
    this.table = SpreadsheetApp.getActive().getSheetByName('APP_EXECUTION_TABLE')
  }
  executionExists(executionSid)
  {
    let exists = false;
    let numRows = this.table.getLastRow();
    
    if (numRows <= 1) return false;
    
    let sids = this.table.getRange('A2:A' + numRows);
    let sidArray = sids.getValues()
    //exists = JSON.stringify(sidArray);
    exists = (sidArray.length > 0 && sidArray.find(sid => sid[0] === executionSid) != undefined);
    return exists;
  }
  add(execution)
  {
    if (!this.executionExists(execution.sid))
    {
      let newExecution = [{ 'sid': execution.sid, 'date_created': execution.date_created }]
      let result = this.table.appendRow(newExecution)
    }
  }
}
