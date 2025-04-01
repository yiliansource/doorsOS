import { useEffect, useRef, useState } from "react";
import { useOsStore } from "../stores/os";

type Point = { x: number; y: number };
type Rect = { left: number; top: number; width: number; height: number };

type DesktopItemAction = {
    type: "openApp";
    appId: string;
};
type DesktopItemData = {
    label: string;
    icon: React.ReactNode;
    action: DesktopItemAction;
};

const desktopItems: DesktopItemData[] = [
    {
        label: "Notepad",
        icon: <img src="app-icons/notepad.png" />,
        action: {
            type: "openApp",
            appId: "notepad",
        },
    },
    {
        label: "Notepad++",
        icon: <img src="app-icons/notepad.png" />,
        action: {
            type: "openApp",
            appId: "notepad++",
        },
    },
];

export function Desktop() {
    const backgroundRef = useRef<HTMLDivElement>(null!);

    const [dragStart, setDragStart] = useState<Point | null>(null);
    const [dragRect, setDragRect] = useState<Rect | null>(null);

    const { openApp } = useOsStore();

    const handleItemAction = (a: DesktopItemAction) => {
        if (a.type === "openApp") {
            openApp({
                id: a.appId,
                size: [600, 300],
            });
        }
    };

    useEffect(() => {
        const handlePointerDown = (e: PointerEvent) => {
            if (e.target !== backgroundRef.current) return;

            setDragStart({ x: e.clientX, y: e.clientY });
        };

        const handlePointerMove = (e: PointerEvent) => {
            if (!dragStart) return;

            const a: Point = dragStart!;
            const b: Point = { x: e.clientX, y: e.clientY };
            setDragRect({
                left: Math.min(a.x, b.x),
                top: Math.min(a.y, b.y),
                width: Math.abs(a.x - b.x),
                height: Math.abs(a.y - b.y),
            });
        };

        const handlePointerUp = () => {
            setDragStart(null);
            setDragRect(null);
        };

        document.body.addEventListener("pointerdown", handlePointerDown);
        document.body.addEventListener("pointerup", handlePointerUp);
        document.body.addEventListener("pointermove", handlePointerMove);

        return () => {
            document.body.removeEventListener("pointerdown", handlePointerDown);
            document.body.removeEventListener("pointerup", handlePointerUp);
            document.body.removeEventListener("pointermove", handlePointerMove);
        };
    }, [dragStart]);

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: "url(/background.jpg)" }}
            ref={backgroundRef}
        >
            <div
                id="desktop-icons"
                className="w-full h-full px-5 py-5 flex-col flex-wrap items-start flex pointer-events-none"
            >
                {desktopItems.map((di, i) => (
                    <DesktopItem key={i} text={di.label} onOpen={() => handleItemAction(di.action)}>
                        {di.icon}
                    </DesktopItem>
                ))}
            </div>

            {dragRect && (
                <div
                    className="absolute outline-blue-500 bg-blue-500/50 outline-1"
                    style={{
                        ...dragRect,
                    }}
                ></div>
            )}
        </div>
    );
}

function DesktopItem({ children, text, onOpen }: { children: React.ReactNode; text: string; onOpen?: () => void }) {
    return (
        <div
            className="desktop-item pointer-events-auto w-20 flex flex-col items-center mb-[3px] mt-[3px] pt-[12px] pb-[8px] -outline-offset-3 hover:bg-[#bfbfbf70] hover:outline-[#a2cef4] hover:outline focus:bg-[#b3b3b370] active:bg-[#b3b3b370]"
            onDoubleClick={() => onOpen?.()}
        >
            <span className="mb-1 w-8 h-8 flex items-center justify-center">{children}</span>
            <span className="text-ellipsis w-full text-center whitespace-pre overflow-hidden [text-shadow:_0_1px_2px_rgb(0,0,0.5)] text-sm">
                {text}
            </span>
        </div>
    );
}
