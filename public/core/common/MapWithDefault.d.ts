export declare class MapWithDefault<K, V> extends Map<K, V> {
    getOrInsert(key: K, defaultValue: V): V;
    getOrInsertComputed(key: K, callbackFunction: (key: K) => V): V;
}
