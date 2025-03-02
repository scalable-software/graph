export declare class Utilities {
    static select: <T>(instance: T, filters: ((entry: [string, unknown]) => boolean)[]) => Record<string, unknown>;
    static isConstructor: (key: string) => boolean;
    /** Checks if the key is a getter or setter */
    static isGetterOrSetter: (instance: any, key: string) => boolean;
    static isMethod: (value: any) => boolean;
}
