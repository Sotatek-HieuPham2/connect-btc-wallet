// src/providers/AppKitProvider.tsx
import { BitcoinAdapter } from "@reown/appkit-adapter-bitcoin";
import { bitcoin, bitcoinSignet, bitcoinTestnet } from "@reown/appkit/networks";
import { AppKitProvider as ReownAppKitProvider } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const projectId = '2e752110481096d7491c1e25b7863492';

// Set up Bitcoin Adapter
const bitcoinAdapter = new BitcoinAdapter({
  projectId
});

const metadata = {
  name: 'AppKit',
  description: 'AppKit Bitcoin Example',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://localhost',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
};

const queryClient = new QueryClient();

export function AppKitProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ReownAppKitProvider
                adapters={[bitcoinAdapter]}
                networks={[bitcoin, bitcoinTestnet, bitcoinSignet]}
                metadata={metadata}
                projectId={projectId}
                features={{
                    analytics: true
                }}
            >
                {children}
            </ReownAppKitProvider>
        </QueryClientProvider>
    );
}
