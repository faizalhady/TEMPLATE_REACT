import { IPK_CONSTANTS } from "@/constants/ipkRules";

export interface IPKInput {
    uphUpstream: number;
    uphDownstream: number;
    lotSize: number;
    boardsPerTrolley: number;
}

export interface IPKResult extends IPKInput {
    ipkUnits: number;
    ipkTrolley: number;
}

export function calculateIPK(input: IPKInput): IPKResult {
    const { uphUpstream, uphDownstream, lotSize, boardsPerTrolley } = input;
    const { RUNTIME_GUIDE_HOURS } = IPK_CONSTANTS;

    // Base formula
    let ipkUnits = (uphUpstream - uphDownstream) * (lotSize / uphUpstream);
    if (ipkUnits < 0) ipkUnits = 0;

    // Convert to trolley
    const ipkTrolley = Math.ceil(ipkUnits / boardsPerTrolley);

    return {
        ...input,
        ipkUnits: parseFloat(ipkUnits.toFixed(2)),
        ipkTrolley,
    };
}
