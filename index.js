// Your code here

function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(arrayOfArrays) {
    let records = arrayOfArrays.map((array) => createEmployeeRecord(array))
    return records
  }
  
  // console.log(createEmployeeRecords([["Mbolonzi", "Peter", "Developer", "3000"], ['Alex', 'Maina', 'Store', '2000']]))
  function createTimeInEvent(employeeRecord, dateStamp) {
    const dateArray = dateStamp.split(' ')
    employeeRecord.timeInEvents = [{
      type: "TimeIn",
      hour: parseInt(dateArray[1]),
      date: dateArray[0]
    }]
    return employeeRecord
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const dateArray = dateStamp.split(' ')
    employeeRecord.timeOutEvents = [{
      type: "TimeOut",
      hour: parseInt(dateArray[1]),
      date: dateArray[0]
    }]
    return employeeRecord
  }
  
  function hoursWorkedOnDate(employeeRecords, dateStamp) {
    let timeIn;
    let timeOut;
    employeeRecords.timeInEvents.find((timeInevent) => {
      if(timeInevent.date === dateStamp) {
        timeIn = timeInevent.hour
      }
    })
  
    employeeRecords.timeOutEvents.find((timeOutEvent) => {
      if(timeOutEvent.date === dateStamp) {
        timeOut = timeOutEvent.hour
      }
    })
    
    return (timeOut - timeIn)/100
  }
  
  function wagesEarnedOnDate(employeeRecords, dateStamp) {
    return hoursWorkedOnDate(employeeRecords, dateStamp) * employeeRecords.payPerHour
  }
  
  function allWagesFor(employeeRecords) {
    let datesArray = employeeRecords.timeInEvents.map((timeInEvent) => timeInEvent.date)
    let wagesearned = 0
    datesArray.map((date) => {
      let dailyWage = wagesEarnedOnDate(employeeRecords, date)
      wagesearned+=dailyWage
    })
    return wagesearned
  
    //test passes one date, function does not return 378
  }
  
  function calculatePayroll(employeeRecordsArray) {
    let payroll = 0
    employeeRecordsArray.forEach((employeeRecords) => {
      payroll += allWagesFor(employeeRecords)
    })
    return payroll
  }
