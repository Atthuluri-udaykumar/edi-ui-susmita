import { validateDateTime } from './datetime.util';
import { logger } from './winston.config';

export class ModelUtil {
    public static describeClass(typeOfClass: any) {
        const a = new typeOfClass();
        const array = Object.getOwnPropertyNames(a);
        return array; // you can apply any filter here
    }
    public static getTypeofProperty(typeOfClass: any, propertyname: string) {
        const a = new typeOfClass();
        return typeof a[propertyname];
    }

    /**
     * Method that validates if an object is a valid instance of a class. Internally it loops
     * through each property of the object and validates if the type matches with the ones in the type Class
     * @param obj object to be validated
     * @param typeOfClass type Class to validate against
     */
    public static isValidInstance(obj: any, typeOfClass: any): string {
        let result: string = '';
        const propertyList = ModelUtil.describeClass(typeOfClass); // get the list of properties from class

        const prototype = typeOfClass.prototype;
        propertyList.forEach((prop) => { // loop through each property name

            if (!prototype['no-validate-properties']?.includes(prop)) { // check if the property should not be validated
                const propertype = ModelUtil.getTypeofProperty(typeOfClass, prop); // get the property type from class
                if ( (typeof obj[prop]) !== propertype) { // compare type against the value in object
                    if (!(propertype === 'undefined' // if type in class is undefined assume it is a timestamp
                        && typeof obj[prop] === 'string')) { // then type in object should be a string
                        if (!(obj[prop] === null // check if current property can be null
                            && prototype['nullable-properties']?.includes(prop))) {
                            result += ('Invalid property type ' + prop + ' ' + propertype + ' ');
                        }
                    } else {
                        if (!validateDateTime(obj[prop])) { // check if string has valid timestamp format
                            result += ('Invalid property format ' + prop + ' ' + propertype + ' ');
                        }
                    }
                }
            }
        });

        return result;
    }

    /**
     * Check if a variable is a Number
     * @param n Any Type of Parameter
     */
    public static isNumber(n: any) {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }
}

/**
 * Nullable Decorator: registers the annotated property in the nullable-properties array metadata
 * @param validate boolean default value true. If false this property will be ignored from validations
 */
export function nullable(validate: boolean = true) {
    return (target: any, key: string) => {
        // check if array of nullable properties exists in the current target
        if (typeof (target['nullable-properties']) === 'undefined') {
            target['nullable-properties'] = []; // create a new array if there is not one yet
        }
        // check if array of no validate properties exists in the current target
        if (typeof (target['no-validate-properties']) === 'undefined') {
            target['no-validate-properties'] = []; // create a new array if there is not one yet
        }
        target['nullable-properties'].push(key); // push the current property name to the array
        if (!validate) { target['no-validate-properties'].push(key); } // if validate false push property name to the array
    };
}
