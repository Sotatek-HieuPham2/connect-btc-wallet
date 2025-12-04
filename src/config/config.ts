// src/appkit.ts
import { BitcoinAdapter } from "@reown/appkit-adapter-bitcoin";
import { bitcoin, bitcoinSignet, bitcoinTestnet } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";

export const projectId = "2e752110481096d7491c1e25b7863492";

const bitcoinAdapter = new BitcoinAdapter({
    projectId,
});

const metadata = {
    name: "Haiku",
    description: "Haiku Bitcoin Connect",
    url: "https://alpha.haiku.trade/",
    icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

export const modal = createAppKit({
    adapters: [bitcoinAdapter],
    networks: [bitcoin, bitcoinTestnet, bitcoinSignet],
    metadata,
    projectId,
});
