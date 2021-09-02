import { useState, useEffect, useRef } from 'react';

const SelectDropdown = ({ list, cb, wrapperClasses }) => {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(list[0]);

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

  const onClick = (ev, item) => {
    ev.preventDefault();
    setValue(item);
    setOpen(false);
    console.log(item);
  };

  return <div className={`select-dropdown ${wrapperClasses}`} ref={dropdownRef}>
    <button className="select-dropdown__field" onClick={(e) => setOpen(!open)}>{value.title} <i className="icon icon-arrow-down"></i></button>
    {
      list.length > 0 && open && (<ul className="select-dropdown__list">
        {
          list.map((item, i) => <li className="select-dropdown__list-item" key={item.title}>
            <a href="#" className="select-dropdown__list-link" target="_blank" onClick={(e) => onClick(e, item)}>
              {item.title}
            </a>
          </li>)
        }
      </ul>)
    }
  </div>
}

export default SelectDropdown;
