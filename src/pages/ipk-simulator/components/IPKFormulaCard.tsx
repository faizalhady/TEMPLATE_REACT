import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IPKFormulaCardProps {
    loadingQty: number;
    uphProcess1: number;
    uphProcess2: number;
}

export default function IPKFormulaCard({
    loadingQty,
    uphProcess1,
    uphProcess2,
}: IPKFormulaCardProps) {
    const diff = uphProcess1 - uphProcess2;
    const ratio = loadingQty / uphProcess1;
    const ipk = diff * ratio;

    return (
        <Card className="mt-6 border border-gray-300">
            <CardHeader>
                <CardTitle>IPK Formula Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="text-lg space-y-2">
                <p className="text-gray-800">
                    Formula:&nbsp;
                    <span className="font-semibold text-blue-700">
                        (UPH Process 1 − UPH Process 2) × (Loading Qty ÷ UPH Process 1)
                    </span>
                </p>

                <p>
                    <span className="text-blue-700">(</span>
                    <span className="text-yellow-700">{uphProcess1}</span> −
                    <span className="text-orange-700">{uphProcess2}</span>
                    <span className="text-blue-700">)</span>
                    &nbsp;×&nbsp;
                    <span className="text-green-700">
                        ({loadingQty} ÷ {uphProcess1})
                    </span>
                </p>

                <p>
                    ={" "}
                    <span className="font-semibold text-pink-700">
                        {diff.toFixed(2)} × {ratio.toFixed(2)}
                    </span>
                </p>

                <p className="text-xl font-bold text-pink-700">
                    = {ipk.toFixed(2)} IPK Units
                </p>
            </CardContent>
        </Card>
    );
}
