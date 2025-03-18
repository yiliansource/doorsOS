import { Desktop } from "./components/desktop";
import { Taskbar } from "./components/taskbar";
import { BlueScreen } from "./components/blue-screen";
import { ErrorBoundary } from "react-error-boundary";

function App() {
    return (
        <main className="relative w-screen h-screen">
            <ErrorBoundary FallbackComponent={BlueScreen}>
                <Desktop />
                <Taskbar />
            </ErrorBoundary>
        </main>
    );
}

export default App;
