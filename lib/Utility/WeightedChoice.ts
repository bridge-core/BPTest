interface WeightedElement {
    weight?: number;
}

export function weightedChoice<T extends WeightedElement>(weighted_array: T[]): T {
    let weight: number[] = [];
    weighted_array.forEach((e, index) => {
        for(let i = 0; i < (e.weight || 1); i++) weight.push(index);
    });

    let i = weight[Math.floor(Math.random() * weight.length)];
    return weighted_array[i];
}