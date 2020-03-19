import { inject, injectable, named, Container } from 'inversify'
import 'reflect-metadata'

interface Weapon {}

@injectable()
class Katana implements Weapon {}

@injectable()
class Shuriken implements Weapon {}

interface Ninja {
    katana: Weapon;
    shuriken: Weapon;
}

@injectable()
class Ninja implements Ninja {
    public katana: Weapon;
    public shuriken: Weapon;
    public constructor(
        @inject("Weapon") @named("strong") katana: Weapon,
        @inject("Weapon") @named("weak") shuriken: Weapon
    ) {
        this.katana = katana;
        this.shuriken = shuriken;
    }
}

const container = new Container()

container.bind<Ninja>("Ninja").to(Ninja);
container.bind<Weapon>("Weapon").to(Katana).whenTargetNamed("strong");
container.bind<Weapon>("Weapon").to(Shuriken).whenTargetNamed("weak");

const ninja: Ninja = container.get('Ninja')

console.log(ninja.katana)
