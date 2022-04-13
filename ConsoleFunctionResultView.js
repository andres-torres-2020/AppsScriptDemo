class ConsoleFunctionResultView
{
  constructor(purpose){
    this.results = [['', `${purpose} on: ${getRunDate()}`]];
  }
  addSummary(summaryData){
    this.results[0][1] += '\n\n' + summaryData;
  }
  addRow(rowData){
    this.results.push(['', rowData]);
  }
  getView(){
    return this.results;
  }
}
