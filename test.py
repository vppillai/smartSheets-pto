#!/usr/bin/python

#AccessToken :  1pqifa4phr6rou9w3fey7cx4ru


# Import modules for CGI handling 
import cgi, cgitb 
import smartsheet
smartsheet = smartsheet.Smartsheet('1pqifa4phr6rou9w3fey7cx4ru');

# Create instance of FieldStorage 
form = cgi.FieldStorage() 

# Get data from fields
fromDate = form.getvalue('fromDate')
toDate  = form.getvalue('toDate')
sheetId  = form.getvalue('team_sheetID')
empID  = form.getvalue('employeeID')

print "Content-type:application/json\r\n\r\n"

sheetId= 5802696138614660;
fromDate= "06-03-2017"
toDate= "08-03-2017"
sheet = smartsheet.Sheets.get_sheet(sheetId)

startRow=0;
endRow=0;

#assuming all dates are available in the sheet, find the start and end row
for i in range(0,len(sheet.rows)):
  if ( fromDate ==  sheet.rows[i].cells[0].value):
    startRow=i+1;
  elif ( toDate ==  sheet.rows[i].cells[0].value):
    endRow=i+1;


if((startRow==0) or (endRow==0)):
  print("{\"status\":false,\"err\":\"dateNotFound\"}");
  quit(); 

#print('Start row , End row',(startRow,endRow));

for i in range(startRow-1,endRow):
  count=0;
  for j in range(1,len(sheet.rows[i].cells)):
    if("P" == sheet.rows[i].cells[j].value):
      count=count+1;
  if(count>=2):
    print("{\"status\":false,\"err\":\"leaveQuotaExceeds\"}");
    quit();

print("{\"status\":true}");




