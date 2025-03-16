import { Taskbar } from "./components/taskbar";

function App() {
    return (
        <main className="relative w-screen h-screen">
            <div className="fixed -z-10 top-0 left-0 w-full h-full">
                <img src="/background.jpg" className="w-full h-full" />
            </div>

            <Taskbar />
        </main>
    );
}

export default App;
