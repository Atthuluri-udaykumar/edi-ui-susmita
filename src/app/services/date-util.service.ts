import { Injectable } from '@angular/core';
@Injectable()
export class DateUtilService {

  constructor() {
  }

  static getDate(month: number, day: number, year: number): Date {
    return new Date(year, month - 1, day);
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static getNextWeekday(): Date {
    let currentDate = new Date();

    if (currentDate.getDay() === 5) {  // Sunday - Saturday : 0 - 6
      currentDate = this.addDays(currentDate, 3);
    } else if (currentDate.getDay() === 6) {
      currentDate = this.addDays(currentDate, 2);
    } else {
      currentDate = this.addDays(currentDate, 1);
    }
    return currentDate;
  }

  static checkDate(year: number, month: number, day: number): boolean {
    // console.log('year: ' + year + ' month: ' + (month - 1) + ' day: ' + day);

    let d = new Date(year, (month - 1), day);

    // console.log('year: ' + d.getFullYear() + ' month: ' + d.getMonth() + ' day: ' + d.getDate());

    if (d.getFullYear() == year && d.getMonth() == (month - 1) && d.getDate() == day) {
      return true;
    } else {
      return false;
    }

  }

  static checkLessThanTomorrow(year: number, month: number, day: number): boolean {

    const date = new Date(year, (month - 1), day);

    if (date > new Date()) {
      return false;
    } else {
      return true;
    }
  }

  static checkAgeMoreThan16(year: number, month: number, day: number): boolean {

    const age = DateUtilService.getAge(day, month, year);

    if (age >= 16) {
      return true;
    } else {
      return false;
    }
  }

  static getAgeFromString(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  static getAge(day: number, month: number, year: number) {
    let today = new Date();
    let birthDate = new Date(year, (month - 1), day);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

}
