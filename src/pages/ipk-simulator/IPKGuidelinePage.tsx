"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import IPKFormulaCard from "./components/IPKFormulaCard";
import IPKProcessTable from "./components/IPKProcessTable"; // ✅ import subcomponent


interface IpkForm {
    loadingQty: string;
    uphProcess1: string;
    uphProcess2: string;
}

export default function IPKGuidelinePage() {
    const [form, setForm] = useState<IpkForm>({
        loadingQty: "",
        uphProcess1: "",
        uphProcess2: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleReset = () => {
        setForm({ loadingQty: "", uphProcess1: "", uphProcess2: "" });
        setSubmitted(false);
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">🧮 Basic IPK Calculation</h1>
            <p className="text-gray-600">
                Follow this layout to visualize how IPK is formulated step-by-step.
            </p>

            {/* Step 1 - Input Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Enter Input Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
                        {(["loadingQty", "uphProcess1", "uphProcess2"] as (keyof IpkForm)[]).map(
                            (key) => (
                                <Input
                                    key={key}
                                    name={key}
                                    type="number"
                                    step="any"
                                    placeholder={key.replace(/([A-Z])/g, " $1")}
                                    value={form[key]}
                                    onChange={handleChange}
                                    required
                                />
                            )
                        )}

                        <div className="col-span-3 flex gap-2">
                            <Button type="submit" className="bg-blue-600 text-white">
                                Show Formulation
                            </Button>
                            <Button type="button" variant="secondary" onClick={handleReset}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Step 2 - Data Display + Table */}
            {submitted && (
                <>
                    <Card className="border border-gray-300">
                        <CardHeader>
                            <CardTitle>IPK Formulation :</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="p-2 bg-green-100 border border-green-300 rounded">
                                Loading Quantity = {form.loadingQty}
                            </div>
                            <div className="p-2 bg-yellow-100 border border-yellow-300 rounded">
                                UPH Process 1 = {form.uphProcess1}
                            </div>
                            <div className="p-2 bg-orange-100 border border-orange-300 rounded">
                                UPH Process 2 = {form.uphProcess2}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Step 2: Hourly Process Table */}
                    <IPKProcessTable
                        loadingQty={parseFloat(form.loadingQty)}
                        uphProcess1={parseFloat(form.uphProcess1)}
                        uphProcess2={parseFloat(form.uphProcess2)}
                    />

                    {/* Step 3: Formula Breakdown */}
                    <IPKFormulaCard
                        loadingQty={parseFloat(form.loadingQty)}
                        uphProcess1={parseFloat(form.uphProcess1)}
                        uphProcess2={parseFloat(form.uphProcess2)}
                    />
                </>
            )}

        </div>
    );
}
