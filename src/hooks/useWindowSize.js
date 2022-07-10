import { useState, useEffect } from "react"

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        handleResize(); //added to call once at load time - see [], but also addition of the eventlistener, every time the event fires

        window.addEventListener("resize", handleResize);

        // to avoid memory leak see below
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return windowSize;
}

export default useWindowSize;