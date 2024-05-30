import React from 'react';
import './styles/styles.css';

function Footer() {
    return (
        <footer className="bg-green-900 text-white py-10 mt-0 overflow-x-hidden">
            <div className="container mx-auto text-center">
                <div className="text-4xl mb-2 mr-3">Contact</div> {/* Added ml-4 for left margin */}
                <div className="text-lg mb-4">ilkivmakeup@gmail.com</div>
                <div className="flex justify-center items-center mb-4"> {/* Flex container for alignment */}
                    <a href="https://www.instagram.com/ilkivmakeup?igsh=emhiMWF2M3d5eXRI" target="_blank" rel="noopener noreferrer" className="text-white text-2xl mr-4"> {/* Added margin to separate Instagram icon */}
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                <span className="text-sm">© 2024 Your Company. All rights reserved.</span> {/* Copyright text */}
            </div>
        </footer>
    );
}

export default Footer;
