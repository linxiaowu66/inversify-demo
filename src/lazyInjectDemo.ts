import { inject, injectable, named, Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
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


const container = new Container()

// container.bind<Ninja>("Ninja").to(Ninja);
container.bind<Weapon>("Weapon").to(Katana).whenTargetNamed("strong");
container.bind<Weapon>("Weapon").to(Shuriken).whenTargetNamed("weak");

const { lazyInjectNamed } = getDecorators(container)


// @injectable()
class Ninja implements Ninja {
    @lazyInjectNamed("Weapon", "strong")
    public katana: Weapon;

    @inject("Weapon") @named("weak")
    public shuriken: Weapon;
    public constructor(
    ) {
    }
}

// const ninja: Ninja = container.get('Ninja')
const ninja = new Ninja()

console.log(ninja.katana)
