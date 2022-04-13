class TwilioConnectionSecrets
{
  _initialize_()
  {
    //get secrets from a Google Sheet
    let obj = null;
    let secretsSheetName = "ADMIN-SECRETS";
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(secretsSheetName);
    if (sheet != null)
    {
      this.TwilioAccountSid = sheet.getRange('B1').getValue();
      this.TwilioAccountToken = sheet.getRange('B2').getValue();
      this.TwilioFlowSid = sheet.getRange('B3').getValue();
      this.TwilioAccountPhone = sheet.getRange('B4').getValue();
    }
  }
  constructor()
  {
    this.TwilioAccountSid = null;
    this.TwilioAccountToken = null;
    this.TwilioFlowSid = null;
    this.TwilioAccountPhone = null;
    this._initialize_();
  }
  getUser()
  {
    return this.TwilioAccountSid;
  }
  getPassword()
  {
    return this.TwilioAccountToken;
  }
  getFlowSid()
  {
    return this.TwilioFlowSid;
  }
  getTwilioAccountPhone()
  {
    return this.TwilioAccountPhone;
  }
}