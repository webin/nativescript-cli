import * as yok from "../lib/common/yok";

export abstract class BaseServiceTest {
    protected injector: IInjector;
    constructor() {
        this.injector = new yok.Yok();

        this.initInjector();
    }

    abstract initInjector(): void;
}