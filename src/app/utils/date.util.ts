function checkEmptyDate(date: string): string {
  if (date === '1970-01-01T00:00:00.000+0000') {
    return '';
  }
  return date;
}

function hasDatePassed(someDate: number): boolean {
  const today: Date = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  const testDate: Date = new Date(someDate);
  testDate.setHours(0);
  testDate.setMinutes(0);
  testDate.setSeconds(0);
  testDate.setMilliseconds(0);

  if (testDate < today) {
    return true;
  } else {
    return false;
  }
}

function isAfterTodate(someDate: string): boolean {
  if(!someDate) {
    console.error("Date is undefined.");
    return true;
  }
  const today: Date = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  const testDate: Date = new Date(someDate);
  testDate.setHours(0);
  testDate.setMinutes(0);
  testDate.setSeconds(0);
  testDate.setMilliseconds(0);

  if (testDate > today) {
    return true;
  } else {
    return false;
  }
}

function clientTimeZone(): string {
  let time = new Date().toTimeString();  // GMT-0500 (Eastern Standard Time)
  let timeZone = time.replace(/.*[(](.*)[)].*/, '$1');  // Eastern Standard Time
  let matches = timeZone.match(/\b(\w)/g); // [E, S, T]
  return matches.join(''); // EST
}

export {checkEmptyDate, hasDatePassed, clientTimeZone, isAfterTodate};
