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
const inversify_1 = require("inversify");
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
let Ninja = class Ninja {
    constructor(katana, shuriken) {
        this.katana = katana;
        this.shuriken = shuriken;
    }
};
Ninja = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("Weapon")), __param(0, inversify_1.named("strong")),
    __param(1, inversify_1.inject("Weapon")), __param(1, inversify_1.named("weak")),
    __metadata("design:paramtypes", [Object, Object])
], Ninja);
const container = new inversify_1.Container();
container.bind("Ninja").to(Ninja);
container.bind("Weapon").to(Katana).whenTargetNamed("strong");
container.bind("Weapon").to(Shuriken).whenTargetNamed("weak");
const ninja = container.get('Ninja');
console.log(ninja.katana);
//# sourceMappingURL=injectWithName.js.map