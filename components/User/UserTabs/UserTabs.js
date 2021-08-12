import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { UserBids, UserCollection, UserCreations, UserGrid, UserFeed } from "components/User";

resetIdCounter();

const UserTabs = ({ owner, feed, creations, collection, bids, name, nickname, avatar, hash }) => {
  const [gridView, setGridView] = useState(true);
  const [toggleView, setToggleView] = useState(true);

  const select = (index, lastIndex, event) => {
    index !== 0 ? setToggleView(false) : setToggleView(true);
  }

  return <div className="user-tabs">
    <Tabs className="user-tabs__container" onSelect={select} defaultIndex={0}>
      <TabList className="user-tabs__list">
        <Tab className="user-tabs__tab" selectedClassName="user-tabs__tab--selected">
          <div className="user-tabs__tab-title user-tabs__tab-title--desktop">Feed <span className="user-tabs__tab-count">({feed.length})</span></div>
          <div className="user-tabs__tab-title user-tabs__tab-title--mobile"><i className="icon icon-grid"></i></div>
        </Tab>
        <Tab className="user-tabs__tab" selectedClassName="user-tabs__tab--selected">
          <div className="user-tabs__tab-title user-tabs__tab-title--desktop">Creations <span className="user-tabs__tab-count">({creations.length})</span></div>
          <div className="user-tabs__tab-title user-tabs__tab-title--mobile"><i className="icon icon-feed"></i></div>
        </Tab>
        <Tab className="user-tabs__tab" selectedClassName="user-tabs__tab--selected">
          <div className="user-tabs__tab-title user-tabs__tab-title--desktop">Collections <span className="user-tabs__tab-count">({collection.length})</span></div>
          <div className="user-tabs__tab-title user-tabs__tab-title--mobile"><i className="icon icon-like"></i></div>
        </Tab>
        <Tab className="user-tabs__tab" selectedClassName="user-tabs__tab--selected">
          <div className="user-tabs__tab-title user-tabs__tab-title--desktop">Current Bids <span className="user-tabs__tab-count">({bids.length})</span></div>
          <div className="user-tabs__tab-title user-tabs__tab-title--mobile"><i className="icon icon-auction"></i></div>
        </Tab>
      </TabList>

      <TabPanel className="user-tabs__panel">
        {
          gridView ? <UserGrid data={feed} name={name} avatar={avatar} /> :  <UserFeed type="feed" owner={owner} data={feed} name={name} nickname={nickname} avatar={avatar} hash={hash} />
        }
      </TabPanel>
      <TabPanel className="user-tabs__panel">
        <UserCreations data={creations} owner={owner} name={name} nickname={nickname} avatar={avatar} hash={hash} />
      </TabPanel>
      <TabPanel className="user-tabs__panel">
        <UserCollection data={collection} owner={owner} name={name} nickname={nickname} avatar={avatar} hash={hash} />
      </TabPanel>
      <TabPanel className="user-tabs__panel">
        <h2>Any content 4</h2>
      </TabPanel>

      {toggleView && <div className="user-tabs__toggle">
        <div className="user-tabs__toggle-radio">
          <label htmlFor="grid">
            <input
              type="radio"
              value="Grid"
              id="grid"
              checked={gridView}
              onChange={() => setGridView(true)}
            />
            <span><i className="icon icon-grid"></i> Grid</span>
          </label>
        </div>
        <div className="user-tabs__toggle-radio">
          <label htmlFor="feed">
            <input
              type="radio"
              value="Feed"
              id="feed"
              checked={!gridView}
              onChange={() => setGridView(false)}
            />
            <span><i className="icon icon-feed"></i> Feed</span>
          </label>
        </div>
      </div>}
    </Tabs>
  </div>
}

export default UserTabs;
