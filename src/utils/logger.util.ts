import { inspect } from 'util';
import { logger } from './winston.config';

/**
 * loggable Decorator: logs the call to a decorated method
 * @param withArgs boolean default value true. If false it won't log the method arguments
 * @param withResult boolean default value true. If false it won't log the method result
 */
export function loggable(withArgs: boolean = true, withResult: boolean = true) {
    return (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) => {
        const className = target.constructor.name;
        // get original method
        const originalMethod = propertyDescriptor.value;

        // redefine descriptor value within own function block
        propertyDescriptor.value = function(...args: any[]) {
            // log arguments before original function
            if (withArgs) {
                logger.info(`${className}.${propertyKey} method called with args: ${inspect(args)}`);
            } else {
                logger.info(`${className}.${propertyKey} method called`);
            }
            // attach original method implementation
            const result = originalMethod.apply(this, args);
            // log result of method
            if (withResult) {
                logger.info(`${className}.${propertyKey} method return value: ${inspect(args)}`);
            }
            return result;
        };
        return propertyDescriptor;
    };
}
