import { autoUpdate, flip, useDismiss, useFloating, useInteractions } from "@floating-ui/react";
import clsx from "clsx";
import { format } from "date-fns";
import { AnimatePresence, HTMLMotionProps, motion } from "motion/react";
import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { BsDoorOpenFill } from "react-icons/bs";
import { useDate } from "../hooks/use-date";
import { appIconLookup } from "../lib/app-lookup";
import { useOsStore } from "../stores/os";
import { ContextMenu, ContextMenuItem, ContextMenuSeperator } from "./context-menu";

export function Taskbar() {
    const os = useOsStore();
    const [isContextMenuOpen, setContextMenuOpen] = useState(false);

    const { refs, floatingStyles, context, update } = useFloating({
        placement: "right-end",
        open: isContextMenuOpen,
        onOpenChange: setContextMenuOpen,
        whileElementsMounted: autoUpdate,
        middleware: [flip()],
    });

    const dismiss = useDismiss(context);

    const { getFloatingProps } = useInteractions([dismiss]);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();

        setContextMenuOpen(true);

        refs.setPositionReference({
            getBoundingClientRect: () => ({
                width: 0,
                height: 0,
                x: event.clientX,
                y: event.clientY,
                top: event.clientY,
                left: event.clientX,
                right: event.clientX,
                bottom: event.clientY,
            }),
        });

        requestAnimationFrame(update);
    };

    const { showBoundary } = useErrorBoundary();

    return (
        <div
            className="fixed z-10 bottom-0 bg-[#222225]/95 backdrop-blur-sm w-full h-10 flex flex-row justify-between items-stretch"
            onContextMenu={handleContextMenu}
        >
            <div className="flex flex-row gap-0.5">
                <TaskbarItem
                    onClick={() => {
                        showBoundary(new Error("NOT_IMPLEMENTED"));
                    }}
                    className="hover:text-neutral-500"
                >
                    <BsDoorOpenFill />
                </TaskbarItem>

                <AnimatePresence mode="sync">
                    {os.apps.map((app) => {
                        const iconSrc = appIconLookup[app.id];
                        return (
                            <TaskbarItem key={app.pid} active>
                                {iconSrc ? (
                                    <img className="w-5 h-5" draggable={false} src={iconSrc} alt={app.id} />
                                ) : (
                                    <span>?</span>
                                )}
                            </TaskbarItem>
                        );
                    })}
                </AnimatePresence>
            </div>
            <div className="flex flex-row">
                <DateTimeWidget />
            </div>

            {isContextMenuOpen && (
                <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                    <ContextMenu>
                        <ContextMenuItem>Show desktop</ContextMenuItem>
                        <ContextMenuItem>Close all windows</ContextMenuItem>
                        <ContextMenuSeperator />
                        <ContextMenuItem>Taskbar settings</ContextMenuItem>
                    </ContextMenu>
                </div>
            )}
        </div>
    );
}

function TaskbarItem({
    children,
    active,
    className,
    ...props
}: React.PropsWithChildren<{
    active?: boolean;
}> &
    HTMLMotionProps<"div">) {
    return (
        <motion.div
            className={clsx(
                "group relative flex items-center justify-center w-12 hover:bg-white/10 transition-colors",
                className,
                active && "",
            )}
            variants={{
                open: {
                    opacity: 1,
                    scale: 1,
                },
                closed: {
                    opacity: 0,
                    scale: 0.8,
                },
            }}
            initial="closed"
            animate="open"
            exit="closed"
            whileHover="hover"
            {...props}
            layout
        >
            {children}
            {active && (
                <motion.div
                    className="absolute bottom-0 bg-neutral-400 h-[2px] w-full"
                    variants={{
                        idle: { scaleX: 0.85 },
                        hover: { scaleX: 1 },
                    }}
                    transition={{ duration: 0.1 }}
                    layout
                ></motion.div>
            )}
        </motion.div>
    );
}

function DateTimeWidget() {
    const date = useDate();

    return (
        <div className="flex flex-col justify-center text-[12px] text-center px-1 leading-4 hover:bg-white/10 transition-colors">
            <p>{format(date, "HH:mm")}</p>
            <p>{format(date, "dd/MM/yyyy")}</p>
        </div>
    );
}
