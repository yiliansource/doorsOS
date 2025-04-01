import { ErrorBoundary } from "react-error-boundary";
import { BlueScreen } from "./components/blue-screen";
import { Desktop } from "./components/desktop";
import { Taskbar } from "./components/taskbar";
import { WindowManager } from "./components/window-manager";

function App() {
    return (
        <main className="relative w-screen h-screen pointer-events-auto select-none">
            <ErrorBoundary FallbackComponent={BlueScreen}>
                <WindowManager />

                <Desktop />
                <Taskbar />
            </ErrorBoundary>
        </main>
    );
}

export default App;
