import React from 'react'
import { getInitials } from '../../utils/helper';

const CharAvatar = ({ fullName, width , height, style}) => {
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'}${style || ''} flex items-center justify-center rounded-full text-gray-800 font-semibold bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300`}>
        {getInitials(fullName || "")}
    </div>
  );
  
};

export default CharAvatar;