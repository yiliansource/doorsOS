import { WindowFrame } from "../components/window-frame";

export function Notepad() {
    return (
        <WindowFrame iconSrc="/app-icons/notepad.png" width={600} height={300} title="Untitled - Notepad">
            <p className="text-sm">This is some window content.</p>
        </WindowFrame>
    );
}
