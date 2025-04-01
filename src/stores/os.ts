import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import clone from "clone";

export type AppState = {
    pid: number;
    id: string;
    title: string;
    position: [number, number];
    size: [number, number];
};

export type OsState = {
    apps: AppState[];
};

export type OsActions = {
    reset: () => void;
    openApp: (app: Partial<AppState> & Pick<AppState, "id" | "size">) => void;
    closeApp: (pid: number) => void;
};

const initialState: OsState = {
    apps: [],
};

export const useOsStore = create<OsState & OsActions>()(
    immer((set, get) => ({
        ...initialState,

        reset: () => {
            set(initialState);
        },
        openApp: (app) =>
            set((state) => {
                const otherApps = get().apps;
                const topmostApp = otherApps[otherApps.length - 1];

                state.apps.push({
                    pid: Math.max(...otherApps.map((a) => a.pid), -1) + 1,
                    id: app.id,
                    title: app.title ?? app.id,
                    size: clone(app.size),
                    position: topmostApp
                        ? [topmostApp.position[0] + 32, topmostApp.position[1] + 32]
                        : [(window.innerWidth - app.size[0]) / 2, (window.innerHeight - app.size[1]) / 2],
                });
            }),
        closeApp: (pid) =>
            set((state) => {
                const index = state.apps.findIndex((a) => a.pid === pid);
                state.apps.splice(index, 1);
            }),
    })),
);

export const useAppState = (pid: number) => useOsStore((s) => s.apps.find((a) => a.pid === pid));
