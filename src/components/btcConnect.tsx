import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

export function WalletOptions() {
    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();

    const formatAddress = (addr: string | undefined) => {
        if (!addr) return "";
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    if (isConnected && address) {
        return (
            <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                        <div className="text-sm text-gray-400">Connected Wallet</div>
                        <div className="text-white font-medium">{formatAddress(address)}</div>
                    </div>
                </div>
                <button
                    onClick={() => open({ view: "Account" })}
                    className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-all text-sm font-medium border border-orange-500/30">
                    Account
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] p-8">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Connect Bitcoin Wallet</h1>
                    <p className="text-gray-400">Connect your Bitcoin wallet to get started</p>
                </div>

                <button
                    onClick={() => open()}
                    className="w-full px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    Connect Wallet
                </button>
            </div>
        </div>
    );
}
