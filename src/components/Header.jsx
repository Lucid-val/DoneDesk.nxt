import React from 'react'; 
import headerIcon from './header_icon.png';

function Header() {
  return (
    <div className="absolute top-0 mt-2 left-0 w-full z-10 flex items-center px-4 py-2">
      <img
        src={headerIcon}
        alt="Header Icon"
        className="h-full w-16 object-contain lg:ml-10 sm:ml-2"
      />
      <h1 className="lg:text-3xl md:text-2xl">DoneDesk.nxt</h1>
    </div>
  );
}

export default Header;
