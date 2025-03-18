import { FaAmazon, FaGoogle, FaNode, FaReact, FaTwitch } from "react-icons/fa";
import { DesktopWindow } from "./window";

export function Desktop() {
    return (
        <div
            className="fixed -z-10 top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: "url(/background.jpg)" }}
        >
            <div id="desktop-icons" className="w-full h-full px-5 py-5 flex-col flex-wrap items-start flex">
                <DesktopItem text={"Goggle"}>
                    <FaGoogle style={{ height: "32px", width: "32px" }} />
                </DesktopItem>
                <DesktopItem text={"Goggle1"}>
                    <FaAmazon style={{ height: "32px", width: "32px" }} />
                </DesktopItem>
                <DesktopItem text={"Goggle2"}>
                    <FaNode style={{ height: "32px", width: "32px" }} />
                </DesktopItem>
                <DesktopItem text={"Goggle3"}>
                    <FaReact style={{ height: "32px", width: "32px" }} />
                </DesktopItem>
                <DesktopItem text={"Goggle4"}>
                    <FaTwitch style={{ height: "32px", width: "32px" }} />
                </DesktopItem>
            </div>
            <DesktopWindow />
        </div>
    );
}

function DesktopItem({ children, text = "Icon Text" }: { children: React.ReactNode; text?: string }) {
    return (
        <div className="desktop-item w-20 flex flex-col items-center mb-[3px] mt-[3px] pt-[12px] pb-[8px] -outline-offset-3 hover:bg-[#bfbfbf70] hover:outline-[#a2cef4] hover:outline focus:bg-[#b3b3b370] active:bg-[#b3b3b370]">
            <span className="w-8 h-8 flex items-center justify-center">{children}</span>
            <span className="text-ellipsis w-full text-center whitespace-pre overflow-hidden select-none">{text}</span>
        </div>
    );
}
