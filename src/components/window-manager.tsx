import { AnimatePresence } from "motion/react";
import { appComponentLookup, appIconLookup } from "../lib/app-lookup";
import { useOsStore } from "../stores/os";
import { AppWindowFrame } from "./app-window-frame";

export function WindowManager() {
    const os = useOsStore();

    return (
        <div className="fixed top-0 left-0 w-dvw h-dvh z-20 pointer-events-none *:pointer-events-auto">
            <AnimatePresence mode="sync">
                {os.apps.map((app) => {
                    const iconSrc = appIconLookup[app.id];
                    const Comp = appComponentLookup[app.id];
                    if (!Comp) {
                        throw new Error(`Unrecognized app '${app.id}'.`);
                    }

                    return (
                        <AppWindowFrame key={app.pid} iconSrc={iconSrc} pid={app.pid}>
                            <Comp pid={app.pid} />
                        </AppWindowFrame>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
