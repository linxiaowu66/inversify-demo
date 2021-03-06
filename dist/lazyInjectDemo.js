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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const inversify_inject_decorators_1 = require("inversify-inject-decorators");
require("reflect-metadata");
let Katana = class Katana {
};
Katana = __decorate([
    inversify_1.injectable()
], Katana);
let Shuriken = class Shuriken {
};
Shuriken = __decorate([
    inversify_1.injectable()
], Shuriken);
const container = new inversify_1.Container();
// container.bind<Ninja>("Ninja").to(Ninja);
container.bind("Weapon").to(Katana).whenTargetNamed("strong");
container.bind("Weapon").to(Shuriken).whenTargetNamed("weak");
const { lazyInjectNamed } = inversify_inject_decorators_1.default(container);
// @injectable()
class Ninja {
    constructor() {
    }
}
__decorate([
    lazyInjectNamed("Weapon", "strong"),
    __metadata("design:type", Object)
], Ninja.prototype, "katana", void 0);
__decorate([
    inversify_1.inject("Weapon"), inversify_1.named("weak"),
    __metadata("design:type", Object)
], Ninja.prototype, "shuriken", void 0);
// const ninja: Ninja = container.get('Ninja')
const ninja = new Ninja();
console.log(ninja.katana);
//# sourceMappingURL=lazyInjectDemo.js.map