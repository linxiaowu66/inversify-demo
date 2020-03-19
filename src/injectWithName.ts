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
@inject("Weapon") @named("strong")
    public katana: Weapon;
    @inject("Weapon") @named("weak")
    public shuriken: Weapon;
    public constructor(
    ) {
      
    }
}

const container = new Container()

container.bind<Ninja>("Ninja").to(Ninja);
container.bind<Weapon>("Weapon").to(Katana).whenTargetNamed("strong");
container.bind<Weapon>("Weapon").to(Shuriken).whenTargetNamed("weak");

const ninja: Ninja = container.get('Ninja')

console.log(ninja.katana)
