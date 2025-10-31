export interface IPKInput {
    loadingQty: number;
    uphProcess1: number;
    uphProcess2: number;
}

export interface IPKRow {
    hour: number;
    process1: number;
    process2: number;
    pending: number;
}

export interface IPKResult {
    rows: IPKRow[];
    ipk: number;
}

export function calculateIPKTable(input: IPKInput): IPKResult {
    const { loadingQty, uphProcess1, uphProcess2 } = input;
    const hours = Math.ceil(loadingQty / uphProcess1);

    const rows: IPKRow[] = Array.from({ length: hours }, (_, i) => {
        const hour = i + 1;
        const process1 = uphProcess1 * hour;
        const process2 = uphProcess2 * hour;
        const pending = process1 - process2;
        return { hour, process1, process2, pending };
    });

    const ipk = (uphProcess1 - uphProcess2) * (loadingQty / uphProcess1);

    return { rows, ipk };
}
