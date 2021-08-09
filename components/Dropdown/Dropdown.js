import { useState } from 'react';

const Dropdown = ({ list = [], classList, title }) => {
  const [open, setOpen] = useState(false);

  return <div className="dropdown">
    <button className={`dropdown__link ${classList}`} onClick={(e) => setOpen(!open)}>{title}</button>
    {
      list.length > 0 && open && (<ul className="dropdown__list">
        {list.map((item, i) => <li className="dropdown__list-item" key={`${title}-dropdown-item-${i}`}>{item}</li>)}
      </ul>)
    }
  </div>
}

export default Dropdown;
