import { Desktop } from "./components/desktop";
import { Taskbar } from "./components/taskbar";

function App() {
    return (
        <main className="relative w-screen">
            <Desktop />
            <Taskbar />
        </main>
    );
}

export default App;
