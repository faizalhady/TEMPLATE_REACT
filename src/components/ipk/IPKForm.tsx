import { useIpkStore } from "@/store/useIpkStore";
import { useState } from "react";

export default function IPKForm() {
    const { addCalculation, reset } = useIpkStore();

    const [form, setForm] = useState({
        uphUpstream: "",
        uphDownstream: "",
        lotSize: "",
        boardsPerTrolley: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addCalculation({
            uphUpstream: parseFloat(form.uphUpstream),
            uphDownstream: parseFloat(form.uphDownstream),
            lotSize: parseFloat(form.lotSize),
            boardsPerTrolley: parseFloat(form.boardsPerTrolley),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded"
        >
            {["uphUpstream", "uphDownstream", "lotSize", "boardsPerTrolley"].map(
                (key) => (
                    <input
                        key={key}
                        type="number"
                        step="any"
                        name={key}
                        value={(form as any)[key]}
                        onChange={handleChange}
                        placeholder={key.replace(/([A-Z])/g, " $1")}
                        className="border p-2 rounded"
                        required
                    />
                )
            )}
            <div className="col-span-2 flex gap-3">
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Calculate
                </button>
                <button
                    type="button"
                    onClick={reset}
                    className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                >
                    Reset
                </button>
            </div>
        </form>
    );
}
