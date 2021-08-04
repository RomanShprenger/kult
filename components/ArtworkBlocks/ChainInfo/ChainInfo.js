const ChainInfo = ({ data }) => {
 return <div className="chain-info">
   <div className="chain-info__title">Chain info</div>
   <ul className="chain-info__list">
     {data.map(item => <li className="chain-info__list-item" key={item.text}>
       <img src={`/${item.key}.svg`} alt={item.text} /> {item.text}
     </li>)}
   </ul>
 </div>
}

export default ChainInfo;
