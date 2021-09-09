import BidList from 'components/BidList';
import Badge from "components/Badge";
import { useRouter } from 'next/router'
import { FormNewBid } from 'components/Forms';
import artworkData from 'data/artwork.json';
import balanceData from 'data/balance.json';

function NewBid({ balance, bids, owner, title, slug, auction, assets }) {
  const router = useRouter();
  const submit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    alert(JSON.stringify(values, null, 2));
    router.push('/artwork/' + slug);
  };

  return <div className="bid-new">
    <div className="bid-new__heading">Auction</div>
    <div className="bid-new__title">Place a bid</div>
    <div className="bid-new__heading">PLACING A BID FOR</div>
    <div className="bid-new__artwork">
      <header className="bid-new__artwork-header">
        <Badge type="heading-hash" nick={owner.nickname} imgUrl={owner.photo} hash={owner.hash} text="Owner" />
      </header>
      <div className="bid-new__artwork-img" style={{
        backgroundImage: `url(${assets[0]})`
      }}>
        <img src={assets[0]} alt={title} />
      </div>
      <div className="bid-new__artwork-title">{title}</div>
    </div>

    <div className="bid-new__heading">YOUR BID</div>
    <FormNewBid balance={balance} minBid={auction.min_bid} submit={submit} />

    <div className="bid-new__heading">RIVAL BIDS</div>
    <BidList data={bids} type="hash-date" rate={balance.eth_rate} format="bid" />
  </div>
}

export async function getServerSideProps({ query }) {
  // TODO: тут будем запрашивать данные с сервера и передавать в компонент
  // const res = await fetch(`https://...`)
  // const data = await res.json()
  const { id } = query;


  const data = artworkData;
  const balance = balanceData;

  const auctionStatus = data && data.auction && data.auction.active;

  if (!id || !auctionStatus) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      ...data,
      balance,
      slug: id
    },
  }
}

export default NewBid
