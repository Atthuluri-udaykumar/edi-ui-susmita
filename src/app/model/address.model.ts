import { ZipCode } from "./zipcode.model";

export class Address {
  streetLine1: string = '';
  streetLine2: string = '';
  streetLine3: string = '';
  streetLine4: string = '';
  city: string = '';
  state: string = '';
  zipcode: ZipCode = new ZipCode();
}
