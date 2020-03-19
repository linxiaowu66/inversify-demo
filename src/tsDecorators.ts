import "reflect-metadata";

const defaultMetadataKey = Symbol("default");
const isNumberMetadataKey = Symbol("isNumber");

function defaultValue(defaultString: string) {
    return Reflect.metadata(defaultMetadataKey, defaultString);
}
function getDefault(target: any, propertyKey: string) {
    return Reflect.getMetadata(defaultMetadataKey, target, propertyKey);
}

function isNumber(target: Object, propertyKey: string | symbol, parameterIndex: number) {
	const allIsNumberParameters: number[] = Reflect.getOwnMetadata(isNumberMetadataKey, target, propertyKey) || [] // 这里的propertyKey就是constructor
  allIsNumberParameters.push(parameterIndex)
  Reflect.defineMetadata(isNumberMetadataKey, allIsNumberParameters, target, propertyKey);
}
function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    descriptor.value = function () {
        let allIsNumberParameters: number[] = Reflect.getOwnMetadata(isNumberMetadataKey, target, propertyName);
        if (allIsNumberParameters) {
            for (let parameterIndex of allIsNumberParameters) {
                if (parameterIndex >= arguments.length || typeof arguments[parameterIndex] !== 'number') {
                    throw new Error("argument is not number.");
                }
            }
        }

        return method.apply(this, arguments);
    }
}

class Greeter {
    @defaultValue('greeting')
    greeting: string;

	  @validate
    hello(@isNumber number: number) {
        return `${this.greeting || getDefault(this, 'greeting')} ${number}`;
    }
}

const ins = new Greeter()

console.log(ins.hello(11))
