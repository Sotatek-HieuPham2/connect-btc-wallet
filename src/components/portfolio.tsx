/* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'
import { useEffect, useRef, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type LegendEntry = {
    value: string;
    color: string;
    payload: {
        name: string;
        value: number;
        color: string;
    };
};

type CustomLegendProps = {
    payload?: LegendEntry[];
};

const Portfolio = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [activeTab, setActiveTab] = useState("Networks");
    const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState<number>(0);
    const itemsPerPage = 5;
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const connectedWallets = [
        { address: "0x742d...8f3a", label: "Main Wallet", balance: "$12.4M" },
        { address: "0x9a3f...2b1c", label: "Trading Wallet", balance: "$3.2M" },
        { address: "0x1e5d...7c4a", label: "Savings Wallet", balance: "$8.1M" },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsWalletDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Sample data for active positions
    const positions = [
        {
            protocol: "Aave",
            network: "Ethereum",
            asset: "ETH",
            position: "Supply",
            amount: "125.4",
            value: "$2,384,320",
            apy: "3.42%",
            change: "+2.3%",
            risk: "Low",
            changePositive: true,
        },
        {
            protocol: "Uniswap",
            network: "Arbitrum",
            asset: "ETH/USDC",
            position: "LP",
            amount: "2.4M",
            value: "$2,400,000",
            apy: "12.8%",
            change: "-0.8%",
            risk: "Medium",
            changePositive: false,
        },
        {
            protocol: "Compound",
            network: "Ethereum",
            asset: "USDC",
            position: "Supply",
            amount: "1.8M",
            value: "$1,800,000",
            apy: "4.2%",
            change: "+0.1%",
            risk: "Low",
            changePositive: true,
        },
        {
            protocol: "Curve",
            network: "Optimism",
            asset: "USDT/USDC",
            position: "LP",
            amount: "1.5M",
            value: "$1,520,000",
            apy: "8.4%",
            change: "+1.2%",
            risk: "Low",
            changePositive: true,
        },
        {
            protocol: "Lido",
            network: "Ethereum",
            asset: "stETH",
            position: "Stake",
            amount: "420.8",
            value: "$1,254,072",
            apy: "3.8%",
            change: "+2.1%",
            risk: "Low",
            changePositive: true,
        },
        {
            protocol: "Aave",
            network: "Polygon",
            asset: "WBTC",
            position: "Supply",
            amount: "18.2",
            value: "$892,000",
            apy: "2.1%",
            change: "-1.4%",
            risk: "Medium",
            changePositive: false,
        },
        {
            protocol: "Uniswap",
            network: "Base",
            asset: "ETH/DAI",
            position: "LP",
            amount: "680K",
            value: "$680,000",
            apy: "15.2%",
            change: "+3.8%",
            risk: "Medium",
            changePositive: true,
        },
        {
            protocol: "MakerDAO",
            network: "Ethereum",
            asset: "DAI",
            position: "Vault",
            amount: "528K",
            value: "$528,000",
            apy: "5.5%",
            change: "+0.3%",
            risk: "Low",
            changePositive: true,
        },
    ];

    // Data for charts
    const networksData = [
        { name: "Ethereum", value: 4.2, color: "#818CF8" },
        { name: "Arbitrum", value: 2.8, color: "#3B82F6" },
        { name: "Optimism", value: 1.9, color: "#EF4444" },
        { name: "Polygon", value: 1.5, color: "#A855F7" },
        { name: "Base", value: 1.2, color: "#6366F1" },
        { name: "Others", value: 0.86, color: "#9CA3AF" },
    ];

    const protocolsData = [
        { name: "Aave", value: 3.28, color: "#818CF8" },
        { name: "Uniswap", value: 3.08, color: "#3B82F6" },
        { name: "Curve", value: 1.52, color: "#EF4444" },
        { name: "Lido", value: 1.25, color: "#A855F7" },
        { name: "Compound", value: 1.8, color: "#6366F1" },
        { name: "MakerDAO", value: 0.53, color: "#9CA3AF" },
    ];

    const tokensData = [
        { name: "ETH", value: 5.46, color: "#818CF8" },
        { name: "USDC", value: 4.2, color: "#3B82F6" },
        { name: "WBTC", value: 0.89, color: "#EF4444" },
        { name: "stETH", value: 1.25, color: "#A855F7" },
        { name: "DAI", value: 1.21, color: "#6366F1" },
        { name: "USDT", value: 0.76, color: "#9CA3AF" },
    ];

    const getChartData = () => {
        switch (activeTab) {
            case "Protocols":
                return protocolsData;
            case "Tokens":
                return tokensData;
            default:
                return networksData;
        }
    };

    const chartData = getChartData();

    const totalPages = Math.ceil(positions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPositions = positions.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const CustomLegend = ({ payload }: CustomLegendProps) => {
        if (!payload) return null;

        return (
            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm text-gray-300">
                            {entry.value} (${entry.payload.value}M)
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-[#1a1a1a] w-full h-screen flex overflow-auto">
            <div className="w-[330px] h-screen"></div>
            <div className="w-full flex-1 flex flex-col md:pl-3 md:pr-6">
                <div className="mt-4 px-4 md:px-0">
                    <div
                        className="rounded-xl p-4 flex items-center justify-between relative"
                        style={{
                            // background: "linear-gradient(180deg, rgb(28, 28, 28) 15%, rgb(62, 32, 19) 131%)",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            background: "linear-gradient(135deg, rgba(15, 15, 15, 0.8) 0%, rgba(53, 53, 59, 0.3) 100%)",
                            borderColor: "rgba(90, 105, 246, 0.2)",
                        }}>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: "rgba(247, 77, 23, 0.15)" }}>
                                <svg className="w-5 h-5" style={{ color: "#F74D17" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">Connected Wallet</div>
                                <div className="text-white font-medium">{connectedWallets[selectedWallet].address}</div>
                                <div className="text-xs text-gray-400 mt-0.5">{connectedWallets[selectedWallet].label}</div>
                            </div>
                        </div>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                                className="px-4 py-2 rounded-lg  text-gray-300  hover:bg-gray-800/50 transition-all text-sm font-medium flex items-center gap-2"
                                style={{
                                    background: "rgba(15, 15, 15, 0.5)",
                                    borderColor: "rgba(247, 77, 23, 0.2)",
                                }}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                    />
                                </svg>
                                Switch Wallet
                                <svg
                                    className={`w-4 h-4 transition-transform ${isWalletDropdownOpen ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isWalletDropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-72 rounded-lg overflow-hidden z-50"
                                    style={{
                                        background: "linear-gradient(180deg, rgb(28, 28, 28) 15%, rgb(62, 32, 19) 131%)",
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                        borderColor: "rgba(112, 69, 54, 0.7)",
                                    }}>
                                    {connectedWallets.map((wallet, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectedWallet(index);
                                                setIsWalletDropdownOpen(false);
                                            }}
                                            className={`w-full p-4 text-left hover:bg-orange-500/10 transition-all border-b border-gray-800/50 last:border-b-0 ${
                                                selectedWallet === index ? "bg-orange-500/10" : ""
                                            }`}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-white font-medium">{wallet.address}</div>
                                                    <div className="text-xs text-gray-400 mt-1">{wallet.label}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-orange-400 font-semibold">{wallet.balance}</div>
                                                    {selectedWallet === index && <div className="text-xs text-green-400 mt-1">Active</div>}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                    <button className="w-full p-4 text-center text-orange-400 hover:bg-orange-500/10 transition-all border-t border-gray-800/50 text-sm font-medium">
                                        + Connect New Wallet
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-0">
                        {[
                            {
                                label: "24h P&L",
                                value: "+$42,891.23",
                                subValue: "+3.42%",
                                iconColor: "text-green-400",
                                valueColor: "text-green-400",
                                icon: (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                ),
                            },
                            {
                                label: "Risk Score",
                                value: "6.8",
                                valueExtra: "/10",
                                subValue: "Moderate",
                                iconColor: "text-yellow-400",
                                valueColor: "text-white",
                                icon: (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                label: "Active Positions",
                                value: "47",
                                subValue: "12 Networks",
                                iconColor: "text-blue-400",
                                valueColor: "text-white",
                                icon: (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                ),
                            },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-xl p-4 transition-all"
                                style={{
                                    background: "linear-gradient(180deg, rgb(28, 28, 28) 15%, rgb(62, 32, 19) 131%)",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderColor: "rgba(112, 69, 54, 0.7)",
                                }}>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-sm font-medium">{stat.label}</span>
                                        <div className={`p-2 rounded-full ${stat.iconColor}`}>{stat.icon}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-2xl font-bold ${stat.valueColor}`}>
                                            {stat.value}
                                            {stat.valueExtra && <span className="text-gray-400">{stat.valueExtra}</span>}
                                        </span>
                                        <span className={`text-sm mt-1 ${stat.valueColor === "text-white" ? "text-gray-400" : stat.valueColor}`}>
                                            {stat.subValue}
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-500/10 to-red-500/10 pointer-events-none" />
                            </div>
                        ))}
                    </div>

                    {/* Exposure Controls and Analysis Section */}
                    <div className="mt-6 px-4 md:px-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Exposure Controls */}
                        <div
                            className="rounded-xl p-6"
                            style={{
                                // background: "linear-gradient(180deg, rgb(28, 28, 28) 15%, rgb(62, 32, 19) 131%)",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "rgba(112, 69, 54, 0.7)",
                            }}>
                            <h2 className="text-xl font-bold text-white mb-6">Exposure Controls</h2>

                            {/* Autopilot Mode */}
                            <div className="flex items-center justify-between p-4 rounded-lg bg-black/20 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-500">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">Autopilot Mode</div>
                                        <div className="text-gray-400 text-sm">AI-driven portfolio management</div>
                                    </div>
                                </div>
                                <label className="relative inline-block w-12 h-6">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-12 h-6 bg-gray-700 rounded-full peer peer-checked:bg-orange-500 transition-all cursor-pointer"></div>
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                                </label>
                            </div>

                            {/* Risk Profile */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-white font-medium">Risk Profile</span>
                                    <span className="text-orange-400 font-medium">Conservative</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    defaultValue="0"
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                />
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-gray-400 text-sm">Conservative</span>
                                    <span className="text-gray-400 text-sm">Aggressive</span>
                                </div>
                            </div>

                            {/* Networks */}
                            <div className="mb-6">
                                <div className="text-white font-medium mb-3">Networks</div>
                                <div className="flex flex-wrap gap-2">
                                    {["Ethereum", "Arbitrum", "Optimism", "Polygon", "Base", "Avalanche"].map((network, index) => (
                                        <button
                                            key={index}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                                index < 3
                                                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                                    : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800"
                                            }`}>
                                            {network}
                                            {index < 3 && <span className="ml-1.5 text-amber-400">×</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="text-white font-medium mb-3">Protocols</div>
                                <div className="flex flex-wrap gap-2">
                                    {["Aave", "Uniswap", "Compound", "Curve", "Lido", "MakerDAO"].map((protocol, index) => (
                                        <button
                                            key={index}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                                index < 3
                                                    ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                                                    : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800"
                                            }`}>
                                            {protocol}
                                            {index < 3 && <span className="ml-1.5 text-yellow-300">×</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="text-white font-medium mb-3">Token Exposure</div>
                                <div className="flex flex-wrap gap-2">
                                    {["ETH", "WBTC", "USDC", "USDT", "DAI", "stETH"].map((token, index) => (
                                        <button
                                            key={index}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                                index < 3
                                                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                                                    : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800"
                                            }`}>
                                            {token}
                                            {index < 3 && <span className="ml-1.5 text-orange-300">×</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button className="flex-1 py-2 rounded-lg bg-orange-500/20 text-orange-400 font-medium hover:bg-orange-500/30 transition-all border border-orange-500/30 text-sm">
                                    Update Portfolio
                                </button>
                                <button className="flex-1 py-2 rounded-lg bg-orange-500/20 text-orange-400 font-medium hover:bg-orange-500/30 transition-all border border-orange-500/30 text-sm">
                                    Rebalance
                                </button>
                            </div>
                            <button className="w-full mt-3 py-2 rounded-lg bg-red-500/20 text-red-400 font-medium hover:bg-red-500/30 transition-all border border-red-500/30 text-sm">
                                Liquidate Positions
                            </button>
                        </div>

                        {/* Exposure Analysis */}
                        <div
                            className="rounded-xl p-6"
                            style={{
                                // background: "linear-gradient(180deg, rgb(28, 28, 28) 15%, rgb(62, 32, 19) 131%)",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "rgba(112, 69, 54, 0.7)",
                            }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-orange-500/20">
                                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-white">Exposure Analysis</h2>
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-2 mb-6">
                                {["Networks", "Protocols", "Tokens"].map((tab, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            activeTab === tab
                                                ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                                                : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800 hover:text-gray-300"
                                        }`}>
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Donut Chart */}
                            <div className="mb-5">
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={2} dataKey="value">
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#1a1a1a",
                                                border: "1px solid rgba(112, 69, 54, 0.7)",
                                                borderRadius: "8px",
                                                color: "#fff",
                                            }}
                                            formatter={(value) => `${value}M`}
                                        />
                                        <Legend content={<CustomLegend payload={chartData as any} />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* List View */}
                            {/* <div className="space-y-3">
                                {chartData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                                            <span className="text-white font-medium">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full"
                                                    style={{
                                                        backgroundColor: item.color,
                                                        width: `${(item.value / Math.max(...chartData.map((d) => d.value))) * 100}%`,
                                                    }}></div>
                                            </div>
                                            <span className="text-white font-semibold w-24 text-right">${item.value}M</span>
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                        </div>
                    </div>

                    {/* Active Positions and Transactions Section */}
                    <div className="mt-6 px-4 md:px-0 mb-6">
                        <div
                            className="rounded-xl p-6 mb-[100px]"
                            style={{
                                background: "linear-gradient(180deg, rgb(28, 28, 28) 15%, rgb(62, 32, 19) 131%)",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "rgba(112, 69, 54, 0.7)",
                            }}>
                            {/* Header with Tabs */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex gap-2">
                                    {["Active Positions", "Transactions"].map((tab, index) => (
                                        <button
                                            key={index}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                index === 0
                                                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                                                    : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800 hover:text-gray-300"
                                            }`}>
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800 hover:text-gray-300 text-sm font-medium transition-all">
                                        Export
                                    </button>
                                    <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800 hover:text-gray-300 text-sm font-medium transition-all">
                                        Filter
                                    </button>
                                </div>
                            </div>

                            {/* Table Content */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-800">
                                            <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Protocol</th>
                                            <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Network</th>
                                            <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Asset</th>
                                            <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Position</th>
                                            <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Amount</th>
                                            <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Value</th>
                                            <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">APY</th>
                                            <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">24h Change</th>
                                            <th className="text-center py-3 px-4 text-gray-400 font-medium text-sm">Risk</th>
                                            <th className="text-center py-3 px-4 text-gray-400 font-medium text-sm"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentPositions.map((pos, index) => (
                                            <tr key={index} className="border-b border-gray-800/50 hover:bg-black/20 transition-all">
                                                <td className="py-4 px-4">
                                                    <span className="text-white font-medium">{pos.protocol}</span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="px-3 py-1 rounded-lg bg-gray-800/50 text-gray-300 text-sm">{pos.network}</span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="text-white">{pos.asset}</span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="text-gray-400">{pos.position}</span>
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <span className="text-white">{pos.amount}</span>
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <span className="text-white font-semibold">{pos.value}</span>
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <span className="text-green-400 font-medium">{pos.apy}</span>
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        {pos.changePositive ? (
                                                            <svg
                                                                className="w-4 h-4 text-green-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                className="w-4 h-4 text-red-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                                                />
                                                            </svg>
                                                        )}
                                                        <span
                                                            className={
                                                                pos.changePositive ? "text-green-400 font-medium" : "text-red-400 font-medium"
                                                            }>
                                                            {pos.change}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    <span
                                                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                                            pos.risk === "Low" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                                                        }`}>
                                                        {pos.risk}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    <button className="text-gray-400 hover:text-white transition-colors">
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
                                <div className="text-sm text-gray-400">
                                    Showing {startIndex + 1} to {Math.min(endIndex, positions.length)} of {positions.length} positions
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                            currentPage === 1
                                                ? "bg-gray-800/30 text-gray-600 cursor-not-allowed"
                                                : "bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }`}>
                                        Previous
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                                currentPage === index + 1
                                                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                                                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white"
                                            }`}>
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                            currentPage === totalPages
                                                ? "bg-gray-800/30 text-gray-600 cursor-not-allowed"
                                                : "bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }`}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
