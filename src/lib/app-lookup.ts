import { Notepad } from "../applications/notepad";
import { AppProps } from "./app-props";

export const appComponentLookup: Record<string, React.ComponentType<AppProps>> = {
    notepad: Notepad,
};

export const appIconLookup: Record<string, string> = {
    notepad: "/app-icons/notepad.png",
};
