import { Entity } from "../Entity/main";

export interface Constructable<T> {
    new(entity: Entity, data: any): T;
}