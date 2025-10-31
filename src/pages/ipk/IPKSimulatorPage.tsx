import IPKResultTable from "@/components/ipk/IPKResultTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useIpkStore } from "@/store/useIpkStore";
import React, { useState } from "react";

export default function IPKSimulatorPage() {
    const { data, addCalculation, reset } = useIpkStore();

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
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">📦 IPK Quick Calculation</h1>
            <p className="text-gray-600">
                Calculate In-Process Kanban (IPK) and trolley requirements based on UPH and lot size.
            </p>

            <Card>
                <CardHeader>
                    <CardTitle>IPK Input Form</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        {["uphUpstream", "uphDownstream", "lotSize", "boardsPerTrolley"].map((key) => (
                            <Input
                                key={key}
                                type="number"
                                step="any"
                                name={key}
                                value={(form as any)[key]}
                                onChange={handleChange}
                                placeholder={key.replace(/([A-Z])/g, " $1")}
                                required
                            />
                        ))}
                        <div className="col-span-2 flex gap-2">
                            <Button type="submit" className="bg-blue-600 text-white">
                                Calculate
                            </Button>
                            <Button type="button" variant="secondary" onClick={reset}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <IPKResultTable data={data} />
        </div>
    );
}
