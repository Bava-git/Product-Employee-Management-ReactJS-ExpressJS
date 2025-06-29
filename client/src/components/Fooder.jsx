import react, { useState, useEffect } from "react";



const Fooder = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 1);

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <div className={`Fooder ${isScrolled ? 'scrolled' : ''}`}>
            <h3>Fooder</h3>
        </div>
    )
}

export default Fooder;