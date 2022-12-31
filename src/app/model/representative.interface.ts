import { Address } from "./address.model";

export interface Representative {
  rreId: number;
  firstName?: string;
  lastName?: string;
  rreCompanyName?: string;
  jobTitle?: string;
  phone?: string;
  extn?: string;
  fax?: string;
  email?: string;
  address?: Address;

}
