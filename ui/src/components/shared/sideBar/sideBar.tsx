import React, { useState } from 'react';
import './sideBar.scss';

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);
  const sidebarItems: string[] = [
    'Home', 'Information', 'Bhajanas', 'Pooja Items', 'Golden ages', 'Youth and Education',
    'Young Adults', 'Human services', 'Cultural', 'Calender', 'Fund raising', 'Photo Album',
    'Help', 'News letter', 'Feed back', 'Contact Info', 'Donations', 'Temple History'
  ];

  const handleItemClick = (item: string): void => {
    setSelectedItem(item);
    // Add your logic for handling item click
  };

  return (
    <div className="sideBar">
      <ul className="upperList">
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            className={selectedItem === item ? "selected" : "list"}
            onClick={() => { handleItemClick(item); }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
