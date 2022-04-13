# Twilio Execution Import to Google Sheet
Import Twilio Executions to Google Sheet using Apps Script

This project library provides Sheet functions as Google Apps Script to

- Create an Execution of a Twilio Flow
    =CREATE_TESTING_TWILIO_EXECUTION()
- Get the secrets to verify their success of their retrieval
    =SHOW_SECRETS()
- Get the Executions from the API
    =SHOW_TWILIO_EXECUTIONS()
- Import Twilio Executions to a local sheet called "APP_EXECUTION_TABLE"
    =IMPORT_TWILIO_EXECUTIONS()
- Delete one or more Twilio Executions
    =PURGE_TWILIO_EXECUTION_BY_SID('execution-sid')
    =PURGE_TWILIO_EXECUTIONS()

Notes:
- Secrets are retrieved from a Google Sheet and are expected to be stored in key and value stored in respective cells, one pair per row. The expected (key, value) pairs are:
    - TwilioAccountSid
    - TwilioAccountToken
    - TwilioFlowSid
    - TwilioAccountPhone

- Twilio Executions retrieved from its API using the Twilio class are saved to a local sheet called "APP_EXECUTION_TABLE".