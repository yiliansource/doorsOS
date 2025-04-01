import { motion, useDragControls, useMotionValue } from "motion/react";
import { useAppState, useOsStore } from "../stores/os";
import { useRememberedState } from "../hooks/use-remembered-state";

export interface AppWindowFrameProps {
    pid: number;
    iconSrc?: string;
}

export function AppWindowFrame({ pid, children, iconSrc }: React.PropsWithChildren<AppWindowFrameProps>) {
    const dragControls = useDragControls();

    const appState = useAppState(pid);
    const rememberedState = useRememberedState(appState);
    if (!rememberedState) throw new Error("Xw");

    const { closeApp } = useOsStore();
    const { position, size, title } = rememberedState;

    const handleMinimizeClick = () => {};
    const handleResizeClick = () => {};
    const handleCloseClick = () => {
        closeApp(pid);
    };

    const [left, top] = position;
    const [width, height] = size;

    const dragX = useMotionValue(left);
    const dragY = useMotionValue(top);

    return (
        <motion.div
            className="window bg-[#ffffff] absolute top-0 left-0 text-black outline-1 outline-neutral-800 shadow-2xl"
            drag
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            dragConstraints={{
                left: -width / 2,
                top: 0,
                right: window.innerWidth - width / 2,
                bottom: window.innerHeight - height / 2,
            }}
            // onDrag={(e, i) => dragX.set(i.offset.x, true)}
            _dragX={dragX}
            _dragY={dragY}
            initial={{
                scale: 0.9,
                opacity: 0,
            }}
            animate={{
                scale: 1,
                opacity: 1,
            }}
            exit={{
                scale: 0.9,
                opacity: 0,
            }}
            style={{
                width,
                height,
                left: dragX,
                top: dragY,
            }}
        >
            <div
                className="header h-[30px] w-full flex items-center justify-between text-black pl-[6px]"
                onPointerDown={(e) => dragControls.start(e)}
            >
                <div className="flex flex-row items-center overflow-hidden whitespace-nowrap text-ellipsis text-sm select-none">
                    {iconSrc && (
                        <span className="mr-1">
                            <img className="w-4 h-4" src={iconSrc} alt={title} draggable={false} />
                        </span>
                    )}
                    <span>{title}</span>
                </div>
                <div className="window-buttons flex gap-[5px] items-center justify-center h-full flex-row *:text-sm *:flex *:items-center *:justify-center *:min-w-[37px] *:h-full *:transition-colors">
                    <button
                        className="bg-[#ffffff] active:outline-none before:content-['\2014'] hover:bg-[#E9E9E9] active:bg-[#bbb]"
                        onClick={handleMinimizeClick}
                    ></button>
                    <button
                        className="bg-[#ffffff] active:outline-none before:content-['\2610'] hover:bg-[#E9E9E9] active:bg-[#bbb]"
                        onClick={handleResizeClick}
                    ></button>
                    <button
                        className="bg-[#ffffff] active:outline-none before:content-['\2715'] hover:bg-red-600 hover:text-[#E9E9E9] active:bg-red-400"
                        onClick={handleCloseClick}
                    ></button>
                </div>
            </div>
            <div className="window-content w-full p-[6px] box-border">{children}</div>
        </motion.div>
    );
}
