import Badge from "components/Badge";
import { useRouter } from 'next/router'
import { FormPurchase } from 'components/Forms';
import artworkData from 'data/artwork.json';
import balanceData from 'data/balance.json';

function BuyArtwork({ balance, owner, title, slug, price, assets }) {
  const router = useRouter();
  const submit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    alert(JSON.stringify(values, null, 2));
    router.push('/artwork/' + slug);
  };

  return <div className="bid-new">
    <div className="bid-new__heading">Fixed price</div>
    <div className="bid-new__title">Buy an artwork</div>
    <div className="bid-new__heading">You are purchasing</div>
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

    <div className="bid-new__heading">Paying now</div>
    <FormPurchase balance={balance} price={4} submit={submit} />
  </div>
}

export async function getServerSideProps({ query }) {
  // TODO: тут будем запрашивать данные с сервера и передавать в компонент
  // const res = await fetch(`https://...`)
  // const data = await res.json()
  const { slug } = query;


  const data = artworkData;
  const balance = balanceData;

  if (!slug) {
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
      slug
    },
  }
}

export default BuyArtwork
