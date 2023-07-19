import DB from './_networks-db';

const DEFAULT_KEY = 'sharethis';

export const KEYS = Object.keys(DB);

const KEYS_REGEX = new RegExp('(?:https?:\\/\\/(?:[a-z0-9]*.)?)?(' + KEYS.join('|') + ').*');

export function iconFor(key: string) {
    return DB[key] ? DB[key].icon : '';
}

export function maskFor(key: string) {
    return DB[key] ? DB[key].mask : '';
}

export function colorFor(key: string) {
    return DB[key] ? DB[key].color : '';
}

export function keyFor(url: string) {
    if (!url) {
        return DEFAULT_KEY;
    }

    const key = url.replace(KEYS_REGEX, '$1');
    return key === url ? DEFAULT_KEY : key;
}
