import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        console.log("Menu toggled, isOpen:", !isOpen); // Debug log
    };

    // Add/remove body class when menu opens/closes to prevent background scrolling
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
        
        // Cleanup function to ensure we remove the class when component unmounts
        return () => {
            document.body.classList.remove('menu-open');
        };
    }, [isOpen]);

    return (
        <nav className='flex justify-between items-center h-16 bg-black text-white relative shadow-sm font-mono w-screen' role='navigation'>
            <div className="container mx-auto px-4 flex justify-between items-center w-full">
                {/* Logo - always visible */}
                <Link to='/navbar' className='w-30'><h1 className='text-2xl font-bold w-30'>Logo</h1></Link>
                
                {/* Burger menu icon - only visible on small screens */}
                <div className="lg:hidden">
                    <button 
                        onClick={toggleMenu} 
                        className="burger-button text-white focus:outline-none p-2"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="text-2xl" />
                    </button>
                </div>
                
                {/* Desktop menu - hidden on small screens */}
                <div className="hidden lg:flex lg:items-center lg:w-auto lg:justify-between lg:flex-1">
                    <div className="flex items-center ml-100">
                        <input type='text' placeholder='Search' className='p-2 mr-2' />
                        <Link><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
                    </div>
                    
                    <ul className='flex justify-end space-x-4 ml-60'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                    </ul>
                    
                    <div className="flex items-center ml-20">
                        <ul className="flex space-x-10">
                            <li><Link to='/login'><FontAwesomeIcon icon={faUser} /></Link></li>
                            <li><Link to='/cart'><FontAwesomeIcon icon={faCartShopping} /></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Mobile menu - only visible when burger is clicked */}
            {isOpen && (
                <div className="mobile-menu lg:hidden fixed top-16 left-0 right-0 bg-black z-50 shadow-md h-auto">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-center mb-4">
                            <input type='text' placeholder='Search' className='p-2 w-full' />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="ml-2" />
                        </div>
                        
                        <ul className='space-y-3 mb-4'>
                            <li className="border-b border-gray-700 pb-2"><Link to='/' onClick={toggleMenu}>Home</Link></li>
                            <li className="border-b border-gray-700 pb-2"><Link to='/about' onClick={toggleMenu}>About</Link></li>
                            <li className="border-b border-gray-700 pb-2"><Link to='/contact' onClick={toggleMenu}>Contact</Link></li>
                        </ul>
                        
                        <div className="flex justify-around pt-2">
                            <Link to='/login' onClick={toggleMenu} className="flex items-center">
                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                <span>Login</span>
                            </Link>
                            <Link to='/cart' onClick={toggleMenu} className="flex items-center">
                                <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                                <span>Cart</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
