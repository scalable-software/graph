/**
 * Example: "c4076ede-bddf-47f3-8237-5712b4d3eda6"
 */
export class Utilities {
    static get uuid() {
        return crypto.randomUUID();
    }
    static isUUID = (uuid) => /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
    static getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
}
