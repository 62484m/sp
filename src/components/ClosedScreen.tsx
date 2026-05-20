export default function ClosedScreen() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black px-6 text-center">
            <p className="text-xl text-zinc-500 tracking-widest uppercase mb-4">Access Denied</p>
            <h1 className="text-3xl font-light text-zinc-300">您未满18岁，网站已关闭。</h1>
            <p className="mt-8 text-sm text-zinc-600">请关闭此页面或浏览器选项卡。</p>
        </div>
    )
}
