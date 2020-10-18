import React, { useEffect, useState } from 'react';
import {FiArrowRight, FiTarget} from 'react-icons/fi';
import {Link} from 'react-router-dom';

import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg';

function Landing() {
    const [checkbox, setCheckbox] = useState(false);

    useEffect(() => {
        if (checkbox) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        
    }, [checkbox]);
    

    return (
        <div id="page-landing">
            <div className="dark-switch">
                <input 
                    type="checkbox" 
                    id="switch" 
                    onClick={() => {setCheckbox(true ? !checkbox : false)}} 
                /><label htmlFor="switch">Toggle</label>
            </div>
            <div className="content-wrapper">
                <img src={logoImg} alt="Happy"/>

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>

                <div className="location">
                    <strong>Colatina</strong>
                    <span>Espírito Santo</span>
                </div>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </div>
        </div>
    );
}

export default Landing;