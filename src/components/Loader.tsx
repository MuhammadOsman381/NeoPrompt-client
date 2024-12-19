const Loader = () => (
    <div className="loader flex gap-1 ml-5 mt-5">
        <span className="dot bg-gray-500 w-3 h-3 rounded-full animate-pulse"></span>
        <span className="dot bg-gray-500 w-3 h-3 rounded-full animate-pulse delay-100"></span>
        <span className="dot bg-gray-500 w-3 h-3 rounded-full animate-pulse delay-200"></span>
    </div>
);

export default Loader