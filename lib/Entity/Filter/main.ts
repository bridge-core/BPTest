import { IFilter, Operator, Subject } from "./Types";
import { Entity } from "../main";

export interface IFlatFilter {
    test?: string;
    domain?: string;
    value?: number | boolean;
    operator?: Operator;
    entity: Entity;
}

export default class Filter {
    constructor(private filter?: IFilter) {}

    eval(entity: Entity) {
        if(this.filter === undefined) return true;

        if(this.filter.any_of !== undefined) {
            for(let f of this.filter.any_of) {
                if(new Filter(f).eval(entity)) return true;
            }
            return false;
        } else if(this.filter.all_of !== undefined) {
            for(let f of this.filter.all_of) {
                if(!new Filter(f).eval(entity)) return false;
            }
            return true;
        } else {
            let subj = this.resolveEntity(entity, this.filter.subject);
            if(subj === undefined)
                return false;
            return this.testFilter({ entity: subj, ...this.filter })
        }
    }

    resolveEntity(entity: Entity, subj?: Subject) {
        if(subj === undefined) return;
        return entity.getSubj(subj);
    }

    testFilter({ test, domain, value, operator, entity }: IFlatFilter & { entity: Entity }) {
        if(test === undefined) return false;

        let curr_value: boolean | number;
        let filter = entity.FILTERS.get(test.toUpperCase());
        if(typeof filter === "function") {
            curr_value = filter({ test, domain, value, operator, entity });
        } else {
            curr_value = entity.FLAGS.get(test.toUpperCase()) || false;
        }
    
        return this.test(value || true, curr_value, operator || "==");
    }
    test(val1: number | boolean, val2: number | boolean, op: string) {
        switch(op) {
            case "!=": case "<>": case "not": return val1 !== val2;
            case "==": case "=": case "equals": return val1 === val2;
            case "<": return val1 < val2;
            case "<=": return val1 <= val2;
            case ">": return val1 > val2;
            case ">=": return val1 >= val2;
        }
    }
}