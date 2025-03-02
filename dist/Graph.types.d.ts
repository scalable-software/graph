/**
 * @module Types
 */
export type UUID = string & {
    __uuid?: never;
};
export type Name = string & {
    __name?: never;
};
