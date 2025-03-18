export function DesktopWindow() {
    return (
        <div className="window w-[500px] h-[300px] bg-[#ffffff] absolute top-0 left-0 text-black shadow-lg">
            <Header />
            <div className="window-content w-full p-[6px] box-border"></div>
        </div>
    );
}

function Header({ title = "Window" }: { title?: string }) {
    return (
        <div className="header h-[30px] w-full flex items-center justify-between select-none text-black pl-[6px]">
            <div className="title overflow-hidden whitespace-nowrap text-ellipsis text-[14px]">{title}</div>
            <div className="window-buttons flex gap-[5px] items-center justify-center h-full flex-row">
                <button className="text-[0.875rem] flex items-center justify-center min-w-[37px] h-full bg-[#ffffff] active:outline-none before:content-['\2014'] hover:bg-[#E9E9E9] active:bg-[#bbb]"></button>
                <button className="text-[0.875rem] flex items-center justify-center min-w-[37px] h-full bg-[#ffffff] active:outline-none before:content-['\2610'] hover:bg-[#E9E9E9] active:bg-[#bbb]"></button>
                <button className="text-[0.875rem] flex items-center justify-center min-w-[37px] h-full bg-[#ffffff] active:outline-none before:content-['\2715'] hover:bg-red-600 hover:color-[#fff] active:bg-red-400"></button>
            </div>
        </div>
    );
}
