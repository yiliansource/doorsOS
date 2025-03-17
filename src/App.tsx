import { Desktop } from "./components/Desktop";
import { Taskbar } from "./components/taskbar";

function App() {
    return (
        <main className="relative w-screen">
            <Desktop background={'/background.jpg'} />
            <Taskbar />
        </main>
    );
}

export default App;
