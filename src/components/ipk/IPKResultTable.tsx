import { type IPKResult } from "@/utils/ipkCalculator";

interface Props {
    data: IPKResult[];
}

export default function IPKResultTable({ data }: Props) {
    if (!data.length) return null;

    return (
        <table className="w-full border border-gray-300 text-sm rounded">
            <thead>
                <tr className="bg-gray-200 text-center">
                    <th>UPH Upstream</th>
                    <th>UPH Downstream</th>
                    <th>Lot Size</th>
                    <th>Boards/Trolley</th>
                    <th>IPK (Units)</th>
                    <th>IPK (Trolleys)</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i} className="border-t text-center">
                        <td>{row.uphUpstream}</td>
                        <td>{row.uphDownstream}</td>
                        <td>{row.lotSize}</td>
                        <td>{row.boardsPerTrolley}</td>
                        <td>{row.ipkUnits}</td>
                        <td>{row.ipkTrolley}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
