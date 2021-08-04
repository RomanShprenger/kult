import Link from 'next/link';
import Badge from 'components/Badge';
import { priceFormat } from "utils/format";

const Owner = ({ price, auction, owner }) => {

  const columnOne = (title, price) => {
    return <>
      <div className="owner__title">{title}</div>
      <div className="owner__price">
        <div className="owner__price-eth">{priceFormat(price.eth)} ETH</div>
        <div className="owner__price-usd">${priceFormat(price.usd)}</div>
      </div>
    </>
  }


 return <div className="owner">
   <div className="owner__column">
     { auction.active ? columnOne("Last bid", auction.last_bid) : columnOne("Sold for", price) }
   </div>
   <div className="owner__column">
     <div className="owner__title">{ auction.active ? "Auction" : "Owner" }</div>
     {
        auction.active ? (
          <div className="owner__auction">
            <Link href={`/bidin`}>
              <a className="btn btn--bid owner__auction-btn">Bid in</a>
            </Link>
            <div className="owner__auction-min">Minimum bid {priceFormat(auction.min_bid)} ETH</div>
          </div>
        ) : (
          <div className="owner__user">
            <Badge type="nick-hash" nick={owner.nickname} imgUrl={owner.photo} hash={owner.hash} />
          </div>
        )
     }
   </div>
 </div>
}

export default Owner;
