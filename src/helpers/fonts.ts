import { Inter, Lora, Source_Sans_3, Poppins, Aleo } from "next/font/google";
import localFont from "next/font/local";

// define your variable fonts
const lora = Lora({ subsets: ["latin"] });

const poppins = Poppins({ weight: "300", subsets: ["latin"] });
const aleo = Aleo({ subsets: ["latin"] });
// // define 2 weights of a non-variable font
// const sourceCodePro400 = Source_Sans_3({ weight: "400" });
// const sourceCodePro700 = Source_Sans_3({ weight: "700" });

// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
// const greatVibes = localFont({ src: "./GreatVibes-Regular.ttf" });

export { poppins, lora, aleo };
