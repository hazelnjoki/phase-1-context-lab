function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }

  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }

  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    this.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10),
    });
  
    return this;
  }  

  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ')
  
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    })
  
    return this
  }  

  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date)
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date)
  
    if (!timeInEvent || !timeOutEvent) {
      return 0
    }
  
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100
    return Math.floor(hoursWorked)
  }
  
  const wagesEarnedOnDate = function(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date)
    return hoursWorked * this.payPerHour
  }  

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(employee) {
      return employee.firstName === firstName;
    });
  }

  const calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce(function(memo, employee) {
      return memo + allWagesFor.call(employee)
    }, 0)
  }
  
