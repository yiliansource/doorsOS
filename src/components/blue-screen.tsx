import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export function BlueScreen({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
    const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        QRCode.toCanvas(qrCanvasRef.current, error.message, {
            color: { dark: "#0079d8" },
            margin: 2,
            width: 116,
        });
    }, [error]);

    useEffect(() => {
        const zero = Date.now();

        const interval = setInterval(() => {
            setTime(Date.now() - zero);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const resetTime = 2000;
    useEffect(() => {
        if (time > resetTime) {
            resetErrorBoundary();
        }
    }, [time, resetErrorBoundary]);

    return (
        <div className="fixed left-0 top-0 w-screen h-screen bg-[#0079d8] px-46 flex flex-col justify-center font-light">
            <h1 className="-mb-3 -mt-16 text-[210px]">:(</h1>
            <div className="text-[42px] max-w-5xl mx-6 leading-snug">
                <p className="mb-9">
                    You upset the website and it needs some time to restart. Use the time to think about what you did.
                </p>
                <p className="mb-9">{Math.floor((time / 2000) * 100).toFixed(0)}% complete</p>
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
