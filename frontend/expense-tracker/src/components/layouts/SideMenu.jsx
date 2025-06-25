import { React, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext"; 
import { SIDE_MENU_DATA } from '../../utils/data'; 
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle menu item click
  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  // Debugging - Log user data to check if profileImageUrl exists
  console.log('User data:', user);

  return (
    <div className="w-64 p-6 z-20 min-h-screen">
      <div className="flex flex-col items-center justify-center gap-6 mt-4 mb-8 p-6 rounded-3xl glass bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20">
        {user?.profileImageUrl ? (
          <div className="relative">
            <img
              src={user?.profileImageUrl || ""}  // Ensure this is the correct URL
              alt="Profile Image"
              className="w-24 h-24 bg-slate-400 rounded-full border-4 border-white/30 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
          </div>
        ) :( 
          <div className="relative">
            <CharAvatar
             fullName={ user?.fullName}
             width="w-24"
             height="h-24"
             style="text-2xl"
             />
             <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
          </div>
         )}
        <div className="text-center">
          <h5 className="text-xl font-bold gradient-text leading-6">
            {user?.fullName || "Guest User"}
          </h5>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] font-medium transition-all duration-300 ${
              activeMenu == item.label 
                ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25" 
                : "text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/30 dark:hover:bg-white/10"
            } py-3 px-4 rounded-xl mb-2 hover:scale-[1.02] active:scale-[0.98]`}
            onClick={() => { handleClick(item.path) }}
          >
            <item.icon className={`text-xl ${activeMenu == item.label ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
