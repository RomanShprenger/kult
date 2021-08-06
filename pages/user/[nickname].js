
const User = ({ data }) => {
  console.log(data);
  return <div className="user">
    <div className="user__preview">

    </div>
    <div className="user__content">

    </div>
  </div>
}

export async function getServerSideProps({ query }) {
  const { nickname } = query;

  // TODO: тут будем запрашивать данные с сервера и передавать в компонент
  // const res = await fetch(`https://...`)
  // const data = await res.json()

  // Схема запроса
  const data = {
    verified: true,
    owner: false, // аккаунт самого пользователя
    follower: true, // подписан ли пользователь на автора
    nickname: nickname,
    avatar: "./assets/owner1.png",
    backgroundUrl: "./assets/background.png",
    name: "Meta Gerald",
    hash: "0x3d816...a35c",
    description: "Meta Gerald is an artist and a programmer who is interested in autonomous systems, collective intelligence, generative art, and computer science.",
    created: "1621430820", // timestamp
    stats: {
      posts: "133",
      followers: "3.2K",  // допустим, что тысячи и миллионы режем на серверной стороне
      following: "277"
    },
    socials: {
      twitter: "https://twitter.com/elonmusk",
      website: "https://shprenger.me/",
      instagram: "https://www.instagram.com/spacex/",
      behance: "",
      facebook: "https://www.facebook.com/shprengerroman"
    },
    feed: [{
      type: "artwork",
      imageUrl: "./assets/post-1x1-2.png",
      title: "Abstract horizons sunset on the mountains",
      bid: 2,  // ETH
      liked: false
    }, {
      type: "post",
      text: "William uses lines to create small personal sketches, large-scale murals, live drawings, and collaborations with artists",
      description: "Moved good image fly to gathering brought grass air living. Living light, own fruit created you'll heaven a appear and subdue them forth place waters his female fifth. The place which. It signs he. Kind yielding air is gathered days rule lesser multiply it sixth, yielding had created fifth herb isn't years night. See More...",
      liked: false
    }], // посты и артворки
    creations: [{
      type: "artwork",
      imageUrl: "./assets/post-1x1-2.png",
      title: "Abstract horizons sunset on the mountains",
      unlockable: {
        "status": true,
        "content": "The piece of art was created by PPSS group - collaboration between Pavel Pepperstein and Sonya Stereostyrski. <a href='https://en.wikipedia.org/wiki/Pavel_Pepperstein' target='_blank'>https://en.wikipedia.org/wiki/Pavel_Pepperstein</a>"
      },
      categories: ["visual design"],
      bid: 2,  // ETH
      liked: false
    }, {
      type: "artwork",
      imageUrl: "./assets/post-1x1-2.png",
      title: "Abstract horizons sunset on the mountains",
      unlockable: {
        "status": true,
        "content": "The piece of art was created by PPSS group - collaboration between Pavel Pepperstein and Sonya Stereostyrski. <a href='https://en.wikipedia.org/wiki/Pavel_Pepperstein' target='_blank'>https://en.wikipedia.org/wiki/Pavel_Pepperstein</a>"
      },
      categories: ["visual design"],
      bid: 2,  // ETH
      liked: false
    }], // артворки
    collections: [{
      type: "artwork",
      imageUrl: "./assets/post-1x1.png",
      title: "Abstract horizons sunset on the mountains",
      sold: {
        eth: 2,
        usd: 1464.64
      },
      creator: {
        avatar: "/assets/author-1x1.png",
        name: "Conceptual",
        nickname: "conceptual",
      }
    }, {
      type: "artwork",
      imageUrl: "./assets/post-1x1-2.png",
      title: "Abstract horizons sunset on the mountains",
      sold: {
        eth: 2,
        usd: 1464.64
      },
      creator: {
        avatar: "/assets/author-1x1.png",
        name: "Conceptual",
        nickname: "conceptual",
      }
    }], // купленные артворки
    bids: [{
      current: [{
        avatar: "./assets/owner3.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        bid: 2 // eth
      }, {
        avatar: "./assets/owner1.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        bid: 2 // eth
      }, {
        avatar: "./assets/owner2.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        bid: 2 // eth
      }, {
        avatar: "./assets/owner4.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        bid: 2 // eth
      }],
      last_bid: {
        eth: 2,
        usd: 1412
      },
      imageUrl: "",
      title: "",
      unlockable: {
        "status": true,
        "content": "The piece of art was created by PPSS group - collaboration between Pavel Pepperstein and Sonya Stereostyrski. <a href='https://en.wikipedia.org/wiki/Pavel_Pepperstein' target='_blank'>https://en.wikipedia.org/wiki/Pavel_Pepperstein</a>"
      },
      categories: ["visual design"],
    }], // текущие ставки
  }

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data
    },
  }
}

export default User
