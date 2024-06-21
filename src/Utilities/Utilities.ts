export type UUID = string;

/**
 * Example: "c4076ede-bddf-47f3-8237-5712b4d3eda6"
 */
export class Utilities {
  public static get uuid() {
    return crypto.randomUUID();
  }
  public static isUUID = (uuid: string): uuid is UUID =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      uuid
    );

  public static getRandomElement = <T>(array: readonly T[]): T =>
    array[Math.floor(Math.random() * array.length)] as T;
}
