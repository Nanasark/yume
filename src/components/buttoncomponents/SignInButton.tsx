import { ConnectButton } from "@/app/thirdweb";
import { amoy } from "@/app/chain";
import { client } from "@/app/client";
export default function SignInButton() {
  const ForAmoyNetWork = {
    80002: [
      {
        address: "0x636Cedd18D763E4DCa3C5714756B752cC2Af5cb5",
        name: "ArtYume Token",
        symbol: "ARYM",
        icon: "",
      },
    ],
  };

  return (
    <div>
      <ConnectButton
        client={client}
        chain={amoy}
        supportedTokens={ForAmoyNetWork}
        detailsModal={{
          showTestnetFaucet: true,
          payOptions: {
            buyWithFiat: {
              testMode: true,
            },

            prefillBuy: {
              // token: {
              //   address: "0x636Cedd18D763E4DCa3C5714756B752cC2Af5cb5",
              //   name: "ArtYume Token",
              //   symbol: "ARYM",
              //   icon: "",
              // },
              chain: amoy,
              allowEdits: {
                amount: true, // allow editing buy amount
                token: false, // disable selecting buy token
                chain: false, // disable selecting buy chain
              },
            },
          },
        }}
        theme="dark"
        autoConnect={true}
        accountAbstraction={{ chain: amoy, sponsorGas: true }}
      />
    </div>
  );
}
