export class Utilities {
    static select = (instance, filters) => Object.fromEntries(Object.entries(instance).filter((entry) => filters.every((filter) => filter(entry))));
    static isConstructor = (key) => key === "constructor";
    /** Checks if the key is a getter or setter */
    static isGetterOrSetter = (instance, key) => ((descriptor) => descriptor?.get !== undefined || descriptor?.set !== undefined)(Object.getOwnPropertyDescriptor(instance, key));
    static isMethod = (value) => typeof value === "function";
}
