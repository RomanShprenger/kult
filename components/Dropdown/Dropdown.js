import { useState, useEffect, useRef } from 'react';

const Dropdown = ({ list = [], classList, title }) => {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return <div className="dropdown" ref={dropdownRef}>
    <button className={`dropdown__link ${classList}`} onClick={(e) => setOpen(!open)}>{title}</button>
    {
      list.length > 0 && open && (<ul className="dropdown__list">
        {list.map((item, i) => <li className="dropdown__list-item" key={`${title}-dropdown-item-${i}`}>{item}</li>)}
      </ul>)
    }
  </div>
}

export default Dropdown;
