import { motion } from "motion/react";

export function ContextMenu({ children }: React.PropsWithChildren) {
    return (
        <motion.div
            className="flex flex-col bg-[#2b2b2b] border border-neutral-400 text-[12px] px-1 py-3 w-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {children}
        </motion.div>
    );
}

export function ContextMenuItem({ children }: React.PropsWithChildren) {
    return (
        <div className="group hover:bg-white/10 px-2 flex flex-row items-center py-1.5">
            <span className="basis-[28px]"></span>
            <span>{children}</span>
        </div>
    );
}

export function ContextMenuSeperator() {
    return <div className="border-t mx-2 my-1 border-neutral-500"></div>;
}
