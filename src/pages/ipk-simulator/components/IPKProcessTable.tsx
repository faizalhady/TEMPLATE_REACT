import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateIPKTable } from "@/utils/ipkLogic"; // ✅ using @ alias

interface IPKProcessTableProps {
    loadingQty: number;
    uphProcess1: number;
    uphProcess2: number;
}

export default function IPKProcessTable({
    loadingQty,
    uphProcess1,
    uphProcess2,
}: IPKProcessTableProps) {
    const { rows, ipk } = calculateIPKTable({
        loadingQty,
        uphProcess1,
        uphProcess2,
    });

    return (
        <Card className="mt-6 border border-gray-300">
            <CardHeader>
                <CardTitle>Process Performance by Hour</CardTitle>
            </CardHeader>
            <CardContent>
                <table className="w-full text-center border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                            <th className="p-2 border">Hour</th>
                            <th className="p-2 border bg-yellow-50">Process 1 Output</th>
                            <th className="p-2 border bg-orange-50">Process 2 Output</th>
                            <th className="p-2 border bg-pink-50">Pending Qty</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.hour}>
                                <td className="p-2 border">{r.hour}</td>
                                <td className="p-2 border">{r.process1}</td>
                                <td className="p-2 border">{r.process2}</td>
                                <td className="p-2 border font-semibold text-pink-700">
                                    {r.pending}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr className="bg-gray-50 font-bold">
                            <td className="p-2 border text-right" colSpan={3}>
                                Total Pending (IPK)
                            </td>
                            <td className="p-2 border text-pink-700">{ipk.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </CardContent>
        </Card>
    );
}
