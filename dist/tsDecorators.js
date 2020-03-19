"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const defaultMetadataKey = Symbol("default");
const isNumberMetadataKey = Symbol("isNumber");
function defaultValue(defaultString) {
    return Reflect.metadata(defaultMetadataKey, defaultString);
}
function getDefault(target, propertyKey) {
    return Reflect.getMetadata(defaultMetadataKey, target, propertyKey);
}
function isNumber(target, propertyKey, parameterIndex) {
    const allIsNumberParameters = Reflect.getOwnMetadata(isNumberMetadataKey, target, propertyKey) || []; // 这里的propertyKey就是constructor
    allIsNumberParameters.push(parameterIndex);
    Reflect.defineMetadata(isNumberMetadataKey, allIsNumberParameters, target, propertyKey);
}
function validate(target, propertyName, descriptor) {
    let method = descriptor.value;
    descriptor.value = function () {
        let allIsNumberParameters = Reflect.getOwnMetadata(isNumberMetadataKey, target, propertyName);
        if (allIsNumberParameters) {
            for (let parameterIndex of allIsNumberParameters) {
                if (parameterIndex >= arguments.length || typeof arguments[parameterIndex] !== 'number') {
                    throw new Error("argument is not number.");
                }
            }
        }
        return method.apply(this, arguments);
    };
}
class Greeter {
    hello(number) {
        return `${this.greeting || getDefault(this, 'greeting')} ${number}`;
    }
}
__decorate([
    defaultValue('greeting'),
    __metadata("design:type", String)
], Greeter.prototype, "greeting", void 0);
__decorate([
    validate,
    __param(0, isNumber),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], Greeter.prototype, "hello", null);
const ins = new Greeter();
console.log(ins.hello(11));
//# sourceMappingURL=tsDecorators.js.map