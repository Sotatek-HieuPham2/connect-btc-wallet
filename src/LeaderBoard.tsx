"use client";

import React, { useEffect, useState } from "react";

type LeaderboardUser = {
    rank: number;
    sigil: string;
    id: string;
    karma: number;
    referrals: number;
    streakDays: number;
    streakMultiplier: number;
    tier: string;
    rankChange?: "up" | "down" | "same";
};

const defaultData: LeaderboardUser[] = [
    {
        rank: 1,
        sigil: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
        id: "monkmode.eth",
        karma: 3120,
        referrals: 50,
        streakDays: 30,
        streakMultiplier: 3.0,
        tier: "Monk Mode 🧘",
        rankChange: "up",
    },
    {
        rank: 2,
        sigil: "https://images.unsplash.com/photo-1494790108755-2616c64c27d0?w=100&h=100&fit=crop&crop=face",
        id: "user123",
        karma: 2790,
        referrals: 44,
        streakDays: 25,
        streakMultiplier: 2.5,
        tier: "Architect 🏯",
        rankChange: "down",
    },
    {
        rank: 3,
        sigil: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        id: "scribble",
        karma: 2315,
        referrals: 37,
        streakDays: 18,
        streakMultiplier: 2.0,
        tier: "Scribe 📜",
    },
    {
        rank: 4,
        sigil: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        id: "onchainTerrorist",
        karma: 1800,
        referrals: 24,
        streakDays: 12,
        streakMultiplier: 1.5,
        tier: "Initiate 🎴",
        rankChange: "up",
    },
    {
        rank: 5,
        sigil: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        id: "0x8F3b5f9A21C74bA69420....",
        karma: 1122,
        referrals: 11,
        streakDays: 5,
        streakMultiplier: 0.95,
        tier: "Plebble 🪨",
        rankChange: "down",
    },
    {
        rank: 385,
        sigil: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=100&h=100&fit=crop&crop=face",
        id: "you.eth",
        karma: 385,
        referrals: 3,
        streakDays: 1,
        streakMultiplier: 0.2,
        tier: "Seeker 🔍",
    },
];

const currentUserId = "you.eth";

const LeaderBoard = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedRows, setAnimatedRows] = useState<boolean[]>([]);

    useEffect(() => {
        // Запускаем анимацию заголовка
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        // Запускаем анимацию строк поочередно
        const rowTimers = defaultData.map((_, index) => {
            return setTimeout(() => {
                setAnimatedRows((prev) => {
                    const newState = [...prev];
                    newState[index] = true;
                    return newState;
                });
            }, 300 + index * 100);
        });

        return () => {
            clearTimeout(timer);
            rowTimers.forEach(clearTimeout);
        };
    }, []);

    const getRankWithMedal = (rank: number) => {
        const medals: { [key: number]: string } = {
            1: "🥇",
            2: "🥈",
            3: "🥉",
        };
        return medals[rank] ? `${rank} ${medals[rank]}` : `${rank}`;
    };

    return (
        <div className="min-h-screen bg-[hsl(0_0%_10%)] p-4">
            <div className="p-6 rounded-2xl text-white w-full overflow-x-auto">
                {/* Анимированный заголовок */}
                <div
                    className={`transition-all duration-1000 ease-out ${
                        isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-8"
                    }`}>
                    <h2 className="text-3xl font-bold text-center mb-6 tracking-wide text-orange-500 font-mono">KARMABOARD</h2>
                </div>

                <div className="w-full">
                    {/* Анимированная шапка таблицы */}
                    <div
                        className={`transition-all duration-800 ease-out delay-200 ${
                            isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"
                        }`}>
                        {/* <div className="grid grid-cols-7 gap-4 bg-white/5 backdrop-blur-sm  p-4 rounded-t-xl text-orange-500 text-sm uppercase tracking-wider font-bold"> */}
                        <div className="grid grid-cols-7 gap-4 bg-gradient-to-b from-orange-500/20 to-transparent  p-4 rounded-t-xl text-orange-500 text-sm uppercase tracking-wider font-bold">
                            <div className="text-center">Rank ▼</div>
                            <div className="text-center">User</div>
                            <div className="text-center">Karma</div>
                            <div className="text-center">Referrals</div>
                            <div className="text-center">Multiplier</div>
                            <div className="text-center">Streak</div>
                            <div className="text-center">Tier</div>
                        </div>
                    </div>

                    {/* Анимированные строки */}
                    <div className="space-y-3 mt-3">
                        {defaultData.map((user, index) => {
                            const isAfterTop = user.rank > 5;
                            const isAnimated = animatedRows[index];

                            return (
                                <React.Fragment key={user.id}>
                                    {isAfterTop && user.id === currentUserId && (
                                        <div
                                            className={`relative flex items-center justify-center py-4 transition-all duration-500 ease-out ${
                                                isAnimated ? "opacity-100 transform translate-x-0" : "opacity-0 transform translate-x-8"
                                            }`}>
                                            <div className="w-full h-px bg-zinc-700" />
                                            <div className="absolute px-4 py-1 bg-zinc-800 text-zinc-400 text-sm rounded-full border border-zinc-700 shadow-md">
                                                ...
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className={`grid grid-cols-7 gap-4 p-4 rounded-xl text-white hover:bg-zinc-700 transition-all duration-500 ease-out ${
                                            user.id === currentUserId ? "bg-orange-950 border border-orange-400" : "bg-zinc-800"
                                        } ${
                                            isAnimated
                                                ? "opacity-100 transform translate-x-0 scale-100"
                                                : "opacity-0 transform translate-x-8 scale-95"
                                        }`}
                                        style={{
                                            background:
                                                user.id === currentUserId
                                                    ? "linear-gradient(90deg, rgba(255,115,0,0.15) 0%, rgba(39,39,42,1) 100%)"
                                                    : "linear-gradient(90deg, rgba(234,88,12,0.1) 0%, rgba(39,39,42,1) 100%)",
                                        }}>
                                        {/* Rank с анимацией */}
                                        <div className="flex items-center justify-center text-left text-orange-500 font-medium text-lg">
                                            <div
                                                className={`w-[60px] flex items-center justify-start text-left text-orange-500 font-medium text-lg transition-all duration-300 delay-200 ${
                                                    isAnimated ? "transform scale-100" : "transform scale-75"
                                                }`}>
                                                {getRankWithMedal(user.rank)}
                                            </div>
                                        </div>

                                        {/* User с анимацией аватара */}
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`transition-all duration-500 delay-300 ${
                                                    isAnimated ? "transform scale-100 rotate-0" : "transform scale-0 rotate-180"
                                                }`}>
                                                <img
                                                    src={user.sigil}
                                                    alt={user.id}
                                                    className="w-10 h-10 rounded-full border-2 border-orange-500 transition-all duration-300 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-500/20"
                                                />
                                            </div>
                                            <span
                                                className={`font-medium text-white truncate transition-all duration-300 delay-400 ${
                                                    isAnimated ? "opacity-100 transform translate-x-0" : "opacity-0 transform translate-x-4"
                                                }`}>
                                                {user.id}
                                            </span>
                                        </div>

                                        {/* Karma с анимацией счетчика */}
                                        <div
                                            className={`flex items-center justify-center text-center text-orange-500 font-medium transition-all duration-500 delay-300 ${
                                                isAnimated ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
                                            }`}>
                                            <div className="relative">
                                                <span className="relative z-10">{user.karma.toLocaleString()}</span>
                                                <div
                                                    className={`absolute inset-0 bg-orange-500/20 rounded-md transition-all duration-700 delay-600 ${
                                                        isAnimated ? "opacity-100 scale-100" : "opacity-0 scale-75"
                                                    }`}
                                                />
                                            </div>
                                        </div>

                                        {/* Referrals */}
                                        <div
                                            className={`flex items-center justify-center text-center text-orange-500 font-medium transition-all duration-500 delay-400 ${
                                                isAnimated ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
                                            }`}>
                                            {user.referrals}
                                        </div>

                                        {/* Multiplier с пульсацией */}
                                        <div
                                            className={`flex items-center justify-center text-center font-medium transition-all duration-500 delay-500 ${
                                                isAnimated ? "opacity-100 transform scale-100" : "opacity-0 transform scale-75"
                                            }`}>
                                            <span
                                                className={`bg-orange-500 text-black px-2 py-1 rounded-md text-sm transition-all duration-300 ${
                                                    isAnimated ? "hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/30" : ""
                                                }`}>
                                                {user.streakMultiplier}x
                                            </span>
                                        </div>

                                        {/* Streak с анимацией прогресс-бара */}
                                        <div
                                            className={`flex items-center justify-center gap-3 cursor-pointer transition-all duration-500 delay-600 ${
                                                isAnimated ? "opacity-100 transform translate-x-0" : "opacity-0 transform translate-x-4"
                                            }`}>
                                            <div className="relative mt-auto h-6 w-full max-w-[100px]">
                                                <div className="absolute left-0 top-0 w-full h-3 bg-zinc-700 rounded-full overflow-hidden border border-zinc-600">
                                                    <div
                                                        className={`h-full bg-gradient-to-r from-orange-500 to-yellow-400 transition-all duration-1000 delay-700 ${
                                                            isAnimated ? "opacity-100" : "opacity-0"
                                                        }`}
                                                        style={{
                                                            width: isAnimated ? `${Math.min((user.streakDays / 30) * 100, 100)}%` : "0%",
                                                        }}
                                                    />
                                                </div>

                                                {user.streakDays > 0 && (
                                                    <div
                                                        className={`absolute top-[-0.6rem] text-base transition-all duration-1000 delay-800 ${
                                                            isAnimated ? "opacity-100 transform scale-100" : "opacity-0 transform scale-75"
                                                        }`}
                                                        style={{
                                                            left: `calc(${Math.min((user.streakDays / 30) * 100, 100)}% - 0.5em)`,
                                                        }}>
                                                        🔥
                                                    </div>
                                                )}
                                            </div>

                                            <span
                                                className={`text-orange-400 font-medium whitespace-nowrap transition-all duration-300 delay-900 ${
                                                    isAnimated ? "opacity-100 transform translate-x-0" : "opacity-0 transform translate-x-2"
                                                }`}>
                                                {user.streakDays}d
                                            </span>
                                        </div>

                                        {/* Tier с анимацией эмодзи */}
                                        <div
                                            className={`flex items-center justify-center gap-2 font-medium text-orange-400 transition-all duration-500 delay-700 ${
                                                isAnimated ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
                                            }`}>
                                            <span className="whitespace-nowrap">
                                                {user.tier.replace(/[\u231A-\u27BF\uD83C-\uDBFF\uDC00-\uDFFF]/g, "").trim()}
                                            </span>
                                            <span
                                                className={`text-2xl transition-all duration-500 delay-800 ${
                                                    isAnimated ? "transform scale-100 rotate-0" : "transform scale-75 rotate-180"
                                                }`}>
                                                {user.tier.trim().split(" ").slice(-1)[0]}
                                            </span>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderBoard;
