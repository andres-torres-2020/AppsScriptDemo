/**
 * Creates and inserts an embedded
 * line chart into the active sheet.
 */
function createEmbeddedLineChart() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var chartDataRange = sheet.getRange(
    'POC TESTING!A1:B1000');
  var hAxisOptions = {
    slantedText: true,
    slantedTextAngle: 60,
    gridlines: {
      count: 12
    }
  };
  
  var lineChartBuilder = sheet.newChart().asLineChart();
  var chart = lineChartBuilder
    .addRange(chartDataRange)
    .setPosition(5, 8, 0, 0)
    .setTitle('USD Exchange rates')
    .setNumHeaders(1)
    .setLegendPosition(Charts.Position.RIGHT)
    .setOption('hAxis', hAxisOptions)
    .setOption("useFirstColumnAsDomain", true)
    .build();
 
  sheet.insertChart(chart);
}

