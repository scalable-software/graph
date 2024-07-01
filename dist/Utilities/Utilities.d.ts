export type UUID = string;
/**
 * Example: "c4076ede-bddf-47f3-8237-5712b4d3eda6"
 */
export declare class Utilities {
    static get uuid(): `${string}-${string}-${string}-${string}-${string}`;
    static isUUID: (uuid: string) => uuid is string;
    static getRandomElement: <T>(obj: {
        [key: string]: T;
    }) => T;
}
