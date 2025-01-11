import { useEffect, useState } from "react";
import CodeEditor from './../components/CodeEditor';

export default function PlaygroundPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Track mouse movement
    // useEffect(() => {
    //     const handleMouseMove = (event) => {
    //         setMousePosition({ x: event.clientX, y: event.clientY });
    //     };

    //     window.addEventListener('mousemove', handleMouseMove);

    //     // Cleanup the event listener
    //     return () => {
    //         window.removeEventListener('mousemove', handleMouseMove);
    //     };
    // }, []);
    return (
        <main style={{}} className=""> {/* Hide the default cursor */}
            {/* Custom cursor icon */}
            <div
                style={{
                    position: 'fixed',
                    left: mousePosition.x + 5,
                    top: mousePosition.y + 10,
                    pointerEvents: 'none', // Ensure the custom cursor doesn't interfere with clicks
                    zIndex: 9999, // Ensure the cursor is on top of everything
                }}
                className=''
            >
                {/* <div className='w-2 h-2 bg-blue-500 rounded-full'></div> */}
                {/* <img
            src="/cursor-icon.png" // Replace with your custom cursor icon
            alt="Custom Cursor"
            style={{ width: '24px', height: '24px' }} // Adjust size as needed
          /> */}
            </div>

            {/* Render the CodeEditor */}
            <CodeEditor />
        </main>
    )
}