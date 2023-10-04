import {SystemInterface} from "../interfaces/SystemInterface";

export const System = {
    BASIC: {
        id : 1,
        name: "Potência de 2",
        intValues: [1, 2, 4, 8, 16]
    },
    FIBONACCI: {
        id : 2,
        name: "FIBONACCI",
        intValues: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55]
    }
}
export const Basic : SystemInterface = {
    id : 1,
    name: "Potência de 2",
    intValues: [1, 2, 4, 8, 16]
}

export const Fibonacci : SystemInterface = {
    id : 2,
    name: "FIBONACCI",
    intValues: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55],
}

export const Systems : SystemInterface[] = [
    Basic,
    Fibonacci
]