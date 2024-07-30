import { ConnectButton } from "@/app/thirdweb";
import { amoy } from "@/app/chain";
import { client } from "@/app/client";
import { symbol } from "thirdweb/extensions/common";
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
        theme="dark"
        autoConnect={true}
        
        accountAbstraction={{ chain: amoy, sponsorGas: true }}
      />
    </div>
  );
}
