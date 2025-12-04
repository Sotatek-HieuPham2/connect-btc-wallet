// import React, { useState } from "react";
// import * as XLSX from "xlsx";

// // Функция для гибкого поиска кода по массиву шаблонов
// const getCodeFlexible = (str: string, patterns: string[]) => {
//     for (const p of patterns) {
//         try {
//             const regex = new RegExp(p);
//             const match = str.match(regex);
//             if (match && match[1]) return match[1];
//         } catch (e) {
//             console.warn("Invalid regex:", p);
//         }
//     }
//     return "";
// };

// const Parser = () => {
//     const [result, setResult] = useState("");
//     const [stats, setStats] = useState<{
//         total: number;
//         extracted: number;
//         missed: number;
//         extractedPercent: string;
//         missedPercent: string;
//     } | null>(null);

//     // Начальные шаблоны
//     const [patterns, setPatterns] = useState([
//         "HAI DUONG RURAL WATER SUPPLY AND SANITATION JOINT STOCK COMPANY\\.([A-Za-z0-9]+)",
//         "WATER HAIDUONG CTW WATER HAIDUONG2 WATER (\\S+)",
//         "Ma KH-([^\\s]+)",
//     ]);

//     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const f = e.target.files?.[0];
//         if (!f) return;

//         const data = await f.arrayBuffer();
//         const workbook = XLSX.read(data);
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const json = XLSX.utils.sheet_to_json(sheet, { defval: "" }) as any[];

//         if (!json.length) return;

//         const keys = Object.keys(json[0]);
//         const colKey = keys.find((k) => k.includes("Nội dung giao dịch"));
//         if (!colKey) {
//             setResult('Колонка с "Nội dung" не найдена');
//             return;
//         }

//         const columnData: string[] = json.map((r) => String(r[colKey]));
//         const codes = columnData.map((text) => getCodeFlexible(text, patterns));
//         const extractedCodes = codes.filter(Boolean);
//         const missed = codes.filter((c) => !c);

//         setResult(extractedCodes.join(" "));
//         setStats({
//             total: columnData.length,
//             extracted: extractedCodes.length,
//             missed: missed.length,
//             extractedPercent: ((extractedCodes.length / columnData.length) * 100).toFixed(2),
//             missedPercent: ((missed.length / columnData.length) * 100).toFixed(2),
//         });

//         // ✅ Создаем новый Excel: 2 колонки
//         const newData = columnData.map((original, idx) => ({
//             "Mã giao dịch": original,
//             "Mã khách hàng": codes[idx],
//         }));

//         const newSheet = XLSX.utils.json_to_sheet(newData);

//         // ✅ Подсветка: зелёный если найден код, красный если нет
//         Object.keys(newSheet).forEach((cell) => {
//             if (cell[0] === "!") return;

//             if (cell.startsWith("B")) {
//                 const value = newSheet[cell].v;
//                 newSheet[cell].s = {
//                     fill: {
//                         fgColor: { rgb: value ? "C6EFCE" : "FFC7CE" },
//                     },
//                     font: {
//                         color: { rgb: value ? "006100" : "9C0006" },
//                         bold: !value,
//                     },
//                 };
//             }
//         });

//         // ✅ Автоширина колонок
//         const maxLengths = ["Mã giao dịch", "Mã khách hàng"].map((col) =>
//             Math.max(col.length, ...newData.map((row) => String(row[col] || "").length))
//         );
//         newSheet["!cols"] = maxLengths.map((w) => ({ wch: w + 2 }));

//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, newSheet, "Parsed");
//         XLSX.writeFile(wb, "parsed_result.xlsx");
//     };

//     return (
//         <div className="p-20">
//             {/* ✅ Input для Excel */}
//             <label className="block w-full max-w-md cursor-pointer">
//                 <div className="flex items-center gap-3 px-5 py-4 bg-white rounded-xl shadow-md border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all">
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="22"
//                         height="22"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="text-blue-600">
//                         <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                         <polyline points="17 8 12 3 7 8" />
//                         <line x1="12" y1="3" x2="12" y2="15" />
//                     </svg>

//                     <span className="text-gray-700 text-sm font-medium">Upload Excel (.xlsx)</span>
//                 </div>
//                 <input type="file" accept=".xlsx" className="hidden" onChange={handleFileChange} />
//             </label>

//             {/* ✅ Textarea для гибких шаблонов */}
//             <div className="mt-6 max-w-md">
//                 <label className="block text-sm font-medium text-gray-700">Mẫu tìm kiếm</label>
//                 <textarea
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
//                     rows={4}
//                     value={patterns.join("\n")}
//                     onChange={(e) => setPatterns(e.target.value.split("\n"))}
//                 />
//             </div>

//             {/* ✅ Статистика */}
//             {stats && (
//                 <div className="mt-4 text-sm">
//                     Tất cả: {stats.total} <br />
//                     Lấy đc mã: {stats.extracted} ({stats.extractedPercent}%) <br />
//                     Chưa lấy đc: {stats.missed} ({stats.missedPercent}%)
//                 </div>
//             )}

//             {/* ✅ Результат */}
//             {result && <div className="mt-6 p-4 bg-gray-100 rounded text-sm whitespace-pre-wrap">{result}</div>}
//         </div>
//     );
// };

// export default Parser;
