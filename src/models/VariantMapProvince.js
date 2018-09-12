const EL_SYM = Symbol();

export class VariantMapProvince {
    constructor(el) {
        this[EL_SYM] = el;
        this.name = this[EL_SYM].id;
    }

    get d() { return this[EL_SYM].getAttribute('d'); }
}
