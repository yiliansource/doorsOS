import { Desktop } from "./components/desktop";
import { Taskbar } from "./components/taskbar";
import { BlueScreen } from "./components/blue-screen";
import { ErrorBoundary } from "react-error-boundary";
import { Notepad } from "./applications/notepad";

function App() {
    return (
        <main className="relative w-screen h-screen pointer-events-auto select-none">
            <ErrorBoundary FallbackComponent={BlueScreen}>
                <Desktop />
                <Taskbar />

                <Notepad />
            </ErrorBoundary>
        </main>
    );
}

export default App;
