import { ErrorBoundary } from "react-error-boundary";
import { Taskbar } from "./components/taskbar";
import { BlueScreen } from "./components/blue-screen";

function App() {
    return (
        <main className="relative w-screen h-screen">
            <ErrorBoundary FallbackComponent={BlueScreen}>
                <div className="fixed -z-10 top-0 left-0 w-full h-full">
                    <img src="/background.jpg" className="w-full h-full" />
                </div>

                <Taskbar />
            </ErrorBoundary>
        </main>
    );
}

export default App;
