const Meta = ({ data }) => {
 return <div className="meta">
   <div className="meta__title">Metadata</div>
   <div className="meta__content">
     :>> <span className="primary">{data}</span>
   </div>
 </div>
}

export default Meta;
