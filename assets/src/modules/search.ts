import SearchCache from './search-cache';

export default class<T> {
    private cache = new SearchCache<T>(10);
    private request: XMLHttpRequest | null = null;

    constructor(public route: string) {
    }

    doSearch(query: string): Promise<T> {
        return new Promise(async (resolve, reject) => {
            if (this.request) {
                this.request.abort();
            }

            try {
                resolve(await this.fetchData(query));
            } catch (e) {
                reject(e);
            }
        });
    }

    private fetchData(query: string): Promise<T> {
        return new Promise((resolve, reject) => {
            if (this.cache.has(query)) {
                return resolve(this.cache.get(query));
            }

            const request = this.request = new XMLHttpRequest;
            const formData = new FormData;
            formData.append('s', query);

            request.open('POST', this.route);

            request.onload = () => {
                this.request = null;
                const data = JSON.parse(request.responseText);
                this.cache.hasSpace() && this.cache.add(query, data);
                resolve(data);
            };

            request.onabort = (e) => {
                this.request = null;
                reject(e);
            };

            request.send(formData);
        });
    }
}