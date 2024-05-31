import React from 'react';
import './styles/styles.css';

function Footer() {
    return (
        <footer className="bg-green-900 text-white py-7 mt-0 overflow-x-hidden">
            <div className="container mx-auto text-center">
                <div className="text-4xl mb-2 ml-4 mr-6">Contact</div>
                <div className="text-lg mb-4">ilkivmakeup@gmail.com</div>
                <div className="flex justify-center items-center mb-4">
                    <a href="https://www.instagram.com/ilkivmakeup?igsh=emhiMWF2M3d5eXRI" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram text-pink-500 text-2xl mr-4"></i> {/* Adjusted color to pink */}
                    </a>
                </div>
                <span className="text-sm">© 2024 Your Company. All rights reserved.</span>
            </div>
        </footer>
    );
}

export default Footer;
