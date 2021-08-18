import Link from 'next/link';
import connectData from 'data/connect.json'

function ConnectPage() {

  const { wallets } = connectData;

  return <div className="connect">
    <div className="connect__header">
      <div className="connect__label">wallet</div>
      <h1 className="connect__title">Connect</h1>
      <div className="connect__text">Connect with one of available wallet providers or create a new wallet.</div>
    </div>
    <div className="connect__grid">
      {
        wallets.map(item => (
          <Link href={item.link} key={item.name}>
            <a className="connect__wallet">
              <span className="connect__wallet-icons">{
                  item.icons.map((icon, index) => <img src={icon} alt={`${item.name} icon ${index}`} key={icon} />)
                }</span>
              <span className="connect__wallet-name">{item.name}</span>
              <span className="connect__wallet-text">{item.text}</span>
            </a>
          </Link>
        ))
      }
    </div>
  </div>
}

export default ConnectPage
