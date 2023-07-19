export default class<T> {
    private store: Store = {};
    public length: number = 0;

    constructor(public maxLength: number) {
    }

    add(name: string, value: any, overwrite = false): Promise<undefined> {
        return new Promise(resolve => {
            if (!this.hasSpace()) {
                resolve();
            }


            if (!overwrite && this.store.hasOwnProperty(name)) {
                resolve();
            }

            this.store[name] = value;
            resolve();
        });
    }

    has(name: string): boolean {
        return this.store.hasOwnProperty(name);
    }

    get(name: string): Promise<T> {
        return new Promise(resolve => resolve(this.store[name]));
    }

    hasSpace(): boolean {
        return this.length < this.maxLength;
    }
}

interface Store {
    [index: string]: any
}