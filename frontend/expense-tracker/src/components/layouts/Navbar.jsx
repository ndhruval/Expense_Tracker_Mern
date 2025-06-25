import React from 'react'
import SideMenu from './SideMenu';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"; 
import { LuSun, LuMoon } from "react-icons/lu";
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({activeMenu}) => {
    const [openSideMenu,setOpenSideMenu] = useState(false);
    const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex gap-5 glass border-b border-white/20 backdrop-blur-md py-4 px-7 sticky top-0 z-30">
        <button
            className="block lg:hidden text-gray-700 hover:text-indigo-600 transition-colors duration-200 p-2 rounded-lg hover:bg-white/20"
            onClick={() => {
                setOpenSideMenu(!openSideMenu);
            }}
        >
            {openSideMenu ? (
                <HiOutlineX className="text-2xl" />
            ) : (
                <HiOutlineMenu className="text-2xl" />
            )}
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ET</span>
          </div>
          <h2 className="text-xl font-bold gradient-text">Expense Tracker</h2>
        </div>

        {/* Theme Toggle Button */}
        <div className="ml-auto">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-200 text-gray-700 hover:text-indigo-600"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <LuSun className="text-xl" />
            ) : (
              <LuMoon className="text-xl" />
            )}
          </button>
        </div>

        {openSideMenu && (
            <div className="fixed top-[61px] -ml-4 glass-dark backdrop-blur-md border border-white/20 rounded-b-2xl shadow-2xl">
                <SideMenu activeMenu={activeMenu} />
            </div>
        )}
    </div>

    
  )
}

export default Navbar;