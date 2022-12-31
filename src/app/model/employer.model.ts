import { Address } from "./address.model";

export class Employer {
  ein: string = '';
  name: string = '';
  phoneNumber: string = '';
  email: string = '';
  address: Address = new Address();


  /** from WCAccessForm.java
	 * @return Returns the left-padded emp_ein.
	public String getPadded_emp_ein(){
		if(emp_ein != null && !emp_ein.isEmpty()){
			return StringUtils.leftPad(emp_ein, 9, "0");
		}else{
			return emp_ein;
		}
	}
  */
}
