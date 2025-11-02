import { calculateIPK, type IPKInput,type IPKResult } from "@/utils/ipkCalculator";
import { create } from "zustand";

interface IpkState {
    data: IPKResult[];
    addCalculation: (input: IPKInput) => void;
    reset: () => void;
}

export const useIpkStore = create<IpkState>((set) => ({
    data: [],
    addCalculation: (input) =>
        set((state) => ({
            data: [...state.data, calculateIPK(input)],
        })),
    reset: () => set({ data: [] }),
}));
