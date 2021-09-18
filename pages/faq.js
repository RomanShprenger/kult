import { useState } from "react";
import { FormFaq } from 'components/Forms';
import faqData from 'data/faq.json';

function Faq({ list }) {
  const [shownItem, setShownItem] = useState(null);
  const [shownList, setShownList] = useState(list);

  const toggle = (index) => {
    shownItem === index ? setShownItem(null) : setShownItem(index);
  }

  const filter = ({ query, categories }) => {
    const newList = list.filter(item => {
      let queryFlag = false;
      let categoryFlag = false;
      if (query === '') {
        queryFlag = true;
      } else if (query) {
        if(item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
          queryFlag = true;
        };
        if(item.text.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
          queryFlag = true;
        };
      }

      if (categories && categories.length > 0) {
        categories.forEach((cat) => {
          item.categories.indexOf(cat) !== -1 && (categoryFlag = true);
        });
      } else {
        categoryFlag = true
      }

      return queryFlag && categoryFlag;
    });
    setShownItem(null);
    setShownList(newList);
  };

  return <div className="faq">
    {/* Faq title */}
    <div className="container">
      <div className="faq__title">Find answers to all of the frequently asked questions about KULT</div>
    </div>
    {/* Faq form */}
    <FormFaq action={filter} />
    {/* FAQ list */}
    <div className="container">
      <ul className="faq__list">
        {
          shownList.map((item, i) => <li key={i} className={`faq__list-item faq__item ${i === shownItem ? "faq__item--active" : ""}`}>
            <div className="faq__item-title" onClick={() => toggle(i)}>{item.title}</div>
            <button type="button" className="faq__item-btn" onClick={() => toggle(i)}>
              <i className="icon icon-arrow-down"></i>
            </button>
            <div className="faq__item-author">
              <img src={item.author.photo} alt={item.author.name} className="faq__item-author-img" />
              written by
              <a href={item.author.url} target="_blank" className="faq__item-author-link">{item.author.name}</a>
            </div>
            {
              i === shownItem && <div className="faq__item-text" dangerouslySetInnerHTML={{ __html: item.text }} ></div>
            }
          </li>)
        }
      </ul>
    </div>
  </div>
}


export async function getServerSideProps() {
  // TODO: тут будем запрашивать данные с сервера и передавать в компонент
  // const res = await fetch(`https://...`)
  // const data = await res.json()
  const data = faqData;

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...data
    },
  }
}

export default Faq
