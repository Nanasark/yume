import { createThirdwebClient } from "thirdweb";

import { Thirdwebconfig } from "@/Strings/string";

const clientId = Thirdwebconfig.clientId;

if (!clientId) {
  console.log("clientId missing");
}

export const client = createThirdwebClient({
  clientId: "b6dd93abf3d0bba0dd32ed833b77fac3",
});
