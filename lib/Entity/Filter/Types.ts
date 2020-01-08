export type Operator = "==" | "!=" | "<" | "<=" | "<>" | "=" | ">" | ">=" | "equals" | "not";
export type Subject = "other" | "parent" | "player" | "self" | "target" | "baby";

export interface IFilter {
    test?: string;
    domain?: string;
    value?: number | boolean;
    operator?: Operator;
    subject?: Subject;
    all_of?: IFilter[];
    any_of?: IFilter[];
    none_of?: IFilter[];
}