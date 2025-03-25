import { motion, useDragControls } from "motion/react";

export interface WindowFrameProps {
    width: number;
    height: number;
    title: string;
    iconSrc?: string;
}

export function WindowFrame({ children, width, height, title, iconSrc }: React.PropsWithChildren<WindowFrameProps>) {
    const dragControls = useDragControls();

    return (
        <motion.div
            className="window bg-[#ffffff] absolute top-0 left-0 text-black outline-1 outline-neutral-800 shadow-2xl"
            drag
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{
                left: 0,
                right: window.innerWidth - width,
                top: 0,
                bottom: window.innerHeight - height,
            }}
            initial={{
                x: (window.innerWidth - width) / 2,
                y: (window.innerHeight - height) / 2,
            }}
            dragMomentum={false}
            style={{
                width,
                height,
            }}
        >
            <div
                className="header h-[30px] w-full flex items-center justify-between text-black pl-[6px]"
                onPointerDown={(e) => dragControls.start(e)}
            >
                <div className="flex flex-row items-center overflow-hidden whitespace-nowrap text-ellipsis text-sm">
                    {iconSrc && (
                        <span className="mr-1">
                            <img className="w-4 h-4" src={iconSrc} alt={title} />
                        </span>
                    )}
                    <span>{title}</span>
                </div>
                <div className="window-buttons flex gap-[5px] items-center justify-center h-full flex-row *:text-sm *:flex *:items-center *:justify-center *:min-w-[37px] *:h-full">
                    <button className="bg-[#ffffff] active:outline-none before:content-['\2014'] hover:bg-[#E9E9E9]"></button>
                    <button className="bg-[#ffffff] active:outline-none before:content-['\2610'] hover:bg-[#E9E9E9]"></button>
                    <button className="bg-[#ffffff] active:outline-none before:content-['\2715'] hover:bg-red-600 hover:text-[#E9E9E9] transition-colors"></button>
                </div>
            </div>
            <div className="window-content w-full p-[6px] box-border">{children}</div>
        </motion.div>
    );
}
