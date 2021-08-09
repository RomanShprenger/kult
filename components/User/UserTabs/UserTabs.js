import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { UserBids, UserCollection, UserCreations, UserGrid, UserFeed } from "components/User";

resetIdCounter();

const UserTabs = ({ feed, creations, collection, bids, name, nickname, avatar }) => {
  const [gridView, setGridView] = useState(true);
  const [toggleView, setToggleView] = useState(true);

  const select = (index, lastIndex, event) => {
    index !== 0 ? setToggleView(false) : setToggleView(true);
  }

  return <div className="user-tabs">
    <Tabs className="user-tabs__container" onSelect={select} defaultIndex={0}>
      <TabList className="user-tabs__list">
        <Tab className="user-tabs__tab" selectedClassName="user-tabs__tab--selected">
          Feed <span className="user-tabs__tab-count">({feed.length})</span>
        </Tab>
        <Tab className="user-tabs__tab" selectedClassName="user-tabs__tab--selected">
          Creations <span className="user-tabs__tab-count">({creations.length})</span>
        </Tab>
        <Tab className="user-tabs__tab" selectedClassName="user-tabs__tab--selected">
          Collections <span className="user-tabs__tab-count">({collection.length})</span>
        </Tab>
        <Tab className="user-tabs__tab" selectedClassName="user-tabs__tab--selected">
          Current Bids <span className="user-tabs__tab-count">({bids.length})</span>
        </Tab>
      </TabList>

      <TabPanel className="user-tabs__panel">
        {
          gridView ? <UserGrid data={feed} name={name} avatar={avatar} /> :  <UserFeed data={feed} name={name} nickname={nickname} avatar={avatar} />
        }
      </TabPanel>
      <TabPanel className="user-tabs__panel">
        <h2>Any content 2</h2>
      </TabPanel>
      <TabPanel className="user-tabs__panel">
        <h2>Any content 3</h2>
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
