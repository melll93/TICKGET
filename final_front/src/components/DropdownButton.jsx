import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { CSSTransition } from 'react-transition-group';
import '../styles/festivaldetails.css';

/* 
쓸 곳에서 프롭스 options로 넘기면 됩니당
const options = [
  { label: '가나다1', value: '1' },
  { label: '가나다2', value: '2' },
  { label: '가나다3', value: '3' },
  { label: '가나다4', value: '4' },
  { label: '가나다5', value: '5' },
]; */



function DropdownButton({ options }) {
  console.log(options);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
    <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
      {selectedOption ? selectedOption.label : '선택하세요'}
      <FiChevronDown className="dropdown-icon" />
    </button>
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames="dropdown__menu"
      unmountOnExit
      >
      <ul className="dropdown__menu">
        {options.map((option) => (
          <li key={option.value} onClick={() => handleOptionClick(option)}>
            {option.label}
          </li>
        ))}
      </ul>
    </CSSTransition>
  </div>
  );
}

export default DropdownButton;