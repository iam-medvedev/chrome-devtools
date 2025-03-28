export interface Values {
    [key: string]: string | boolean | number;
}
export interface SerializedMessage {
    string: string;
    values: Values;
}
