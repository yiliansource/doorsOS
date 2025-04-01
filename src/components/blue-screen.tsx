import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { useOsStore } from "../stores/os";

export function BlueScreen({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
    const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [percentage, setPercentage] = useState(0);
    const { reset } = useOsStore();

    useEffect(() => {
        QRCode.toCanvas(qrCanvasRef.current, error.message, {
            color: { dark: "#0079d8" },
            margin: 2,
            width: 116,
        });
    }, [error]);

    useEffect(() => {
        let p = 0;
        let timeout: NodeJS.Timeout;

        const incrementPercentageAndScheduleIncrement = () => {
            p += 0.04 + Math.random() * 0.2;
            p = Math.min(1, p);

            setPercentage(p);

            if (p >= 1) {
                timeout = setTimeout(() => {
                    reset();
                    resetErrorBoundary();
                }, 3000);
            } else {
                timeout = setTimeout(incrementPercentageAndScheduleIncrement, Math.random() * 2000);
            }
        };

        timeout = setTimeout(incrementPercentageAndScheduleIncrement, Math.random() * 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [reset, resetErrorBoundary]);

    return (
        <div className="fixed left-0 top-0 w-screen h-screen bg-[#0079d8] px-46 flex flex-col justify-center font-light">
            <h1 className="-mb-3 -mt-16 text-[210px]">:(</h1>
            <div className="text-[42px] max-w-5xl mx-6 leading-snug">
                <p className="mb-9">
                    You upset the website and it needs some time to restart. Use the time to think about what you did.
                </p>
                <p className="mb-9">
                    {Math.floor(percentage * 100).toFixed(0)}% complete{" "}
                    {percentage >= 1 && <span>&ndash; restarting ...</span>}
                </p>
            </div>
            <div className="flex flex-row mx-4 gap-4 items-stretch">
                <div className="p-2">
                    <div className="bg-white aspect-square w-28 flex">
                        <canvas className="w-full h-full" ref={qrCanvasRef}></canvas>
                    </div>
                </div>
                <div className="flex flex-col justify-between pb-1">
                    <p className="text-xl">For more information about this issue and possible fixes, think more.</p>
                    <div className="text-base">
                        <p className="mb-3">If you call a support person, give them this info:</p>
                        <p>Error message: {error.message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
