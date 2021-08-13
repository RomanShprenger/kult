import Profile from "components/Profile";
import { UserTabs } from "components/User";
import { useState } from 'react';

const User = ({ data, notFound }) => {

  if (notFound) {
    return <div className="user">User didn't find</div>
  }

  const [follow, setFollow] = useState(data.follower);

  const followHandler = (e) => {
    e.preventDefault();
    // TODO: отправляем запрос к API, чтобы отписать пользователя
    setFollow(!follow);
  };

  return <div className="user">
    <div className="user__preview">
      <div className="user__preview-bg" style={{
        backgroundImage: `url(${data.backgroundUrl})`
      }}>
        <img src={data.backgroundUrl} alt="Profile background image" />
      </div>
      <div className="user__preview-profile">
        <Profile
          type="full"
          followHandler={followHandler}
          avatar={data.avatar}
          verified={data.verified}
          owner={data.owner}
          follower={follow}
          nickname={data.nickname}
          name={data.name}
          hash={data.hash}
          description={data.description}
          created={data.created}
          stats={data.stats}
          socials={data.socials}
        />
      </div>
    </div>
    <div className="user__content">
      <div className="user__content-profile">
        <Profile
          type="small"
          followHandler={followHandler}
          avatar={data.avatar}
          verified={data.verified}
          owner={data.owner}
          follower={follow}
          nickname={data.nickname}
          name={data.name}
          hash={data.hash}
          description={data.description}
          created={data.created}
          stats={data.stats}
          socials={data.socials}
        />
      </div>
      <div className="user__content-tabs">
        <UserTabs owner={data.owner} feed={data.feed} creations={data.creations} collection={data.collections} bids={data.bids} avatar={data.avatar} nickname={data.nickname} name={data.name} hash={data.hash} />
      </div>
    </div>
  </div>
}

export async function getServerSideProps({ query }) {
  const { nickname, owner } = query;

  // TODO: временное решение для проверки дизайна (?owner=true)

  // TODO: тут будем запрашивать данные с сервера и передавать в компонент
  // const res = await fetch(`https://...`)
  // const data = await res.json()

  // Схема запроса
  const data = {
    verified: true,
    owner: !!owner, // аккаунт самого пользователя
    follower: true, // подписан ли пользователь на автора
    nickname: nickname,
    avatar: "/assets/author-1x1-2.png",
    backgroundUrl: "/assets/background.png",
    name: "Meta Gerald",
    hash: "0x3d816...a35c",
    description: "Meta Gerald is an artist and a programmer who is interested in autonomous systems, collective intelligence, generative art, and computer science.",
    created: 1621430820, // timestamp
    stats: {
      posts: "133",
      followers: "3.2K",  // допустим, что тысячи и миллионы режем на серверной стороне
      following: "277"
    },
    socials: [
      {
        name: "twitter",
        link: "https://twitter.com/elonmusk"
      },
      {
        name: "website",
        link: "https://shprenger.me/"
      },
      {
        name: "instagram",
        link: "https://www.instagram.com/spacex/"
      },
      {
        name: "facebook",
        link: "https://www.facebook.com/shprengerroman"
      }
    ],
    feed: [{
      type: "artwork",
      imageUrl: "/assets/post-1x1-2.png",
      title: "Abstract horizons sunset on the mountains",
      slug: "abstract-horizons-sunset-on-the-mountains",
      categories: ["visual design"],
      unlockable: {
        status: true
      },
      bid: {
        eth: 2,
        usd: 1464.26
      },
      date: 1621430820, // timestamp
      liked: false
    }, {
      type: "post",
      text: "William uses lines to create small personal sketches, large-scale murals, live drawings, and collaborations with artists",
      description: "Moved good image fly to gathering brought grass air living. Living light, own fruit created you'll heaven a appear and subdue them forth place waters his female fifth. The place which. It signs he. Kind yielding air is gathered days rule lesser multiply it sixth, yielding had created fifth herb isn't years night. See More...",
      slug: "abstract-horizons-sunset-on-the-mountains",
      date: 1621430820, // timestamp
      liked: false
    },{
      type: "artwork",
      imageUrl: "/assets/post-1x1-2.png",
      title: "Abstract horizons sunset on the mountains",
      slug: "abstract-horizons-sunset-on-the-mountains",
      categories: ["visual design"],
      unlockable: {
        status: true
      },
      bid: {
        eth: 2,
        usd: 1464.26
      },
      date: 1621430820, // timestamp
      liked: false
    }, {
      type: "post",
      text: "William uses lines to create small personal sketches, large-scale murals, live drawings, and collaborations with artists",
      description: "Moved good image fly to gathering brought grass air living. Living light, own fruit created you'll heaven a appear and subdue them forth place waters his female fifth. The place which. It signs he. Kind yielding air is gathered days rule lesser multiply it sixth, yielding had created fifth herb isn't years night. See More...",
      slug: "abstract-horizons-sunset-on-the-mountains",
      date: 1621430820, // timestamp
      liked: false
    },{
      type: "artwork",
      imageUrl: "/assets/post-1x1-2.png",
      title: "Abstract horizons sunset on the mountains",
      slug: "abstract-horizons-sunset-on-the-mountains",
      categories: ["visual design"],
      unlockable: {
        status: true
      },
      bid: {
        eth: 2,
        usd: 1464.26
      },
      date: 1621430820, // timestamp
      liked: false
    }, {
      type: "post",
      text: "William uses lines to create small personal sketches, large-scale murals, live drawings, and collaborations with artists",
      description: "Moved good image fly to gathering brought grass air living. Living light, own fruit created you'll heaven a appear and subdue them forth place waters his female fifth. The place which. It signs he. Kind yielding air is gathered days rule lesser multiply it sixth, yielding had created fifth herb isn't years night. See More...",
      slug: "abstract-horizons-sunset-on-the-mountains",
      date: 1621430820, // timestamp
      liked: false
    },{
      type: "artwork",
      imageUrl: "/assets/post-1x1-2.png",
      title: "Abstract horizons sunset on the mountains",
      slug: "abstract-horizons-sunset-on-the-mountains",
      categories: ["visual design"],
      unlockable: {
        status: true
      },
      bid: {
        eth: 2,
        usd: 1464.26
      },
      date: 1621430820, // timestamp
      liked: false
    }, {
      type: "post",
      text: "William uses lines to create small personal sketches, large-scale murals, live drawings, and collaborations with artists",
      description: "Moved good image fly to gathering brought grass air living. Living light, own fruit created you'll heaven a appear and subdue them forth place waters his female fifth. The place which. It signs he. Kind yielding air is gathered days rule lesser multiply it sixth, yielding had created fifth herb isn't years night. See More...",
      slug: "abstract-horizons-sunset-on-the-mountains",
      date: 1621430820, // timestamp
      liked: false
    },{
      type: "artwork",
      imageUrl: "/assets/post-1x1-2.png",
      title: "Abstract horizons sunset on the mountains",
      slug: "abstract-horizons-sunset-on-the-mountains",
      categories: ["visual design"],
      unlockable: {
        status: true
      },
      bid: {
        eth: 2,
        usd: 1464.26
      },
      date: 1621430820, // timestamp
      liked: false
    }, {
      type: "post",
      text: "William uses lines to create small personal sketches, large-scale murals, live drawings, and collaborations with artists",
      description: "Moved good image fly to gathering brought grass air living. Living light, own fruit created you'll heaven a appear and subdue them forth place waters his female fifth. The place which. It signs he. Kind yielding air is gathered days rule lesser multiply it sixth, yielding had created fifth herb isn't years night. See More...",
      slug: "abstract-horizons-sunset-on-the-mountains",
      date: 1621430820, // timestamp
      liked: false
    },{
      type: "artwork",
      imageUrl: "/assets/post-1x1-2.png",
      title: "Abstract horizons sunset on the mountains",
      slug: "abstract-horizons-sunset-on-the-mountains",
      categories: ["visual design"],
      unlockable: {
        status: true
      },
      bid: {
        eth: 2,
        usd: 1464.26
      },
      date: 1621430820, // timestamp
      liked: false
    }, {
      type: "post",
      text: "William uses lines to create small personal sketches, large-scale murals, live drawings, and collaborations with artists",
      description: "Moved good image fly to gathering brought grass air living. Living light, own fruit created you'll heaven a appear and subdue them forth place waters his female fifth. The place which. It signs he. Kind yielding air is gathered days rule lesser multiply it sixth, yielding had created fifth herb isn't years night. See More...",
      slug: "abstract-horizons-sunset-on-the-mountains",
      date: 1621430820, // timestamp
      liked: false
    }], // посты и артворки
    creations: [{
      type: "artwork",
      imageUrl: "/assets/post-1x1-2.png",
      title: "Abstract horizons sunset on the mountains",
      slug: "abstract-horizons-sunset-on-the-mountains",
      unlockable: {
        "status": true,
        "content": "The piece of art was created by PPSS group - collaboration between Pavel Pepperstein and Sonya Stereostyrski. <a href='https://en.wikipedia.org/wiki/Pavel_Pepperstein' target='_blank'>https://en.wikipedia.org/wiki/Pavel_Pepperstein</a>"
      },
      categories: ["visual design"],
      bid: {
        eth: 2,
        usd: 1464.26
      },
      date: 1621430820, // timestamp
      liked: false
    }, {
      type: "artwork",
      imageUrl: "/assets/post-1x1-2.png",
      title: "Abstract horizons sunset on the mountains",
      slug: "abstract-horizons-sunset-on-the-mountains",
      unlockable: {
        "status": true,
        "content": "The piece of art was created by PPSS group - collaboration between Pavel Pepperstein and Sonya Stereostyrski. <a href='https://en.wikipedia.org/wiki/Pavel_Pepperstein' target='_blank'>https://en.wikipedia.org/wiki/Pavel_Pepperstein</a>"
      },
      categories: ["visual design"],
      bid: {
        eth: 2,
        usd: 1464.26
      },
      date: 1621430820, // timestamp
      liked: false
    }], // артворки
    collections: [{
      type: "artwork",
      imageUrl: "/assets/post-1x1.png",
      title: "Abstract horizons sunset on the mountains",
      slug: "abstract-horizons-sunset-on-the-mountains",
      unlockable: {
        "status": true,
        "content": "The piece of art was created by PPSS group - collaboration between Pavel Pepperstein and Sonya Stereostyrski. <a href='https://en.wikipedia.org/wiki/Pavel_Pepperstein' target='_blank'>https://en.wikipedia.org/wiki/Pavel_Pepperstein</a>"
      },
      categories: ["visual design"],
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
      imageUrl: "/assets/post-1x1-2.png",
      title: "Abstract horizons sunset on the mountains",
      slug: "abstract-horizons-sunset-on-the-mountains",
      unlockable: {
        "status": true,
        "content": "The piece of art was created by PPSS group - collaboration between Pavel Pepperstein and Sonya Stereostyrski. <a href='https://en.wikipedia.org/wiki/Pavel_Pepperstein' target='_blank'>https://en.wikipedia.org/wiki/Pavel_Pepperstein</a>"
      },
      categories: ["visual design"],
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
      others: [{
        avatar: "/assets/owner3.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        date: 1621430820, // timestamp
        bid: {
          eth: 2,
          usd: 1412
        }
      }, {
        avatar: "/assets/owner2.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        date: 1621430820, // timestamp
        bid: {
          eth: 2,
          usd: 1412
        }
      }, {
        avatar: "/assets/owner5.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        date: 1621430820, // timestamp
        bid: {
          eth: 2,
          usd: 1412
        }
      }, {
        avatar: "/assets/owner4.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        date: 1621430820, // timestamp
        bid: {
          eth: 2,
          usd: 1412
        }
      }],
      last_bid: {
        avatar: "/assets/owner1.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        date: 1621430820, // timestamp
        bid: {
          eth: 2,
          usd: 1412
        }
      },
      min_bid: {
        eth: 2.1,
        usd: 1482.6
      },
      imageUrl: "/assets/artwork-4.png",
      title: "Abstract horizons sunset on the mountains",
      slug: "abstract-horizons-sunset-on-the-mountains",
    }, {
      others: [{
        avatar: "/assets/owner3.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        date: 1621430820, // timestamp
        bid: {
          eth: 2,
          usd: 1412
        }
      }, {
        avatar: "/assets/owner2.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        date: 1621430820, // timestamp
        bid: {
          eth: 2,
          usd: 1412
        }
      }, {
        avatar: "/assets/owner5.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        date: 1621430820, // timestamp
        bid: {
          eth: 2,
          usd: 1412
        }
      }, {
        avatar: "/assets/owner4.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        date: 1621430820, // timestamp
        bid: {
          eth: 2,
          usd: 1412
        }
      }],
      last_bid: {
        avatar: "/assets/owner1.png",
        nickname: "williamhaze",
        hash: "0X88B1...F448",
        date: 1621430820, // timestamp
        bid: {
          eth: 2,
          usd: 1412
        }
      },
      min_bid: {
        eth: 2.1,
        usd: 1482.6
      },
      imageUrl: "/assets/artwork-4.png",
      title: "Abstract horizons sunset on the mountains",
      slug: "abstract-horizons-sunset-on-the-mountains",
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
