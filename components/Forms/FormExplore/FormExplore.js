import {useCallback, useRef, useState} from 'react';
import Link from 'next/link';
import SelectDropdown from 'components/SelectDropdown';
import data from "data/creativeFields.json";

const FormExplore = ({ action }) => {
  const {fields} = data;
  const creativeFields = [
    {
      title: 'Creative fields',
      value: ''
    }
  ].concat(fields);

  const filters = [
    {
      title: 'Popularity',
      value: 'popularity'
    }, {
      title: 'Price',
      value: 'price'
    }, {
      title: 'Live Auction',
      value: 'auction'
    }
  ];

  const suggestedTags = [ "3D", "contemporary" ];

  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    if (query.length) {
      action(query)
    } else {
      setResults([])
    }
  }, [])

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return <div className="explore__form">
    <div className="container">
      <div className="explore__form-title">Kult creators</div>
      <div className="explore__form-field">
        <i className="icon icon-search explore__form-field-icon"></i>
        <input className="explore__form-input" onChange={onChange} onFocus={onFocus} placeholder='Search' type='text' value={query}/> {
          active && results.length > 0 && (<ul className="explore__form-results">
            {
              results.map(({id, title}) => (<li className="explore__form-results-item" key={id}>
                <Link href={`/user/${id}`}>
                  <a className="explore__form-results-link">{title}</a>
                </Link>
              </li>))
            }
          </ul>)
        }
      </div>
      <div className="explore__form-row">
        <SelectDropdown list={creativeFields} cb={(v) => console.log(v)} wrapperClasses="explore__form-filter"/>
        <SelectDropdown list={filters} cb={(v) => console.log(v)} wrapperClasses="explore__form-filter"/>
        <div className="explore__form-tags">
          <div className="explore__form-tags-label">Suggested tags</div>
          <div className="explore__form-tags-list">
            {
              suggestedTags.map(tag => (
                <Link href={`/explore?tag=${tag}`} key={tag}>
                  <a className="explore__form-tags-link">{tag}</a>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default FormExplore;
