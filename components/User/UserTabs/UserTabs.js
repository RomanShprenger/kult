import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import { useState } from 'react';
import Modal from 'components/Modal';
import { FormNewPost } from 'components/Forms';
import Link from 'next/link';
import 'react-tabs/style/react-tabs.css';
import { UserBids, UserCollection, UserCreations, UserGrid, UserFeed } from "components/User";

resetIdCounter();

const UserTabs = ({ owner, feed, creations, collection, bids, name, nickname, avatar, hash }) => {
  const [gridView, setGridView] = useState(true);
  const [toggleView, setToggleView] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const select = (index, lastIndex, event) => {
    index !== 0 ? setToggleView(false) : setToggleView(true);
  }

  const createContent = () => (<div className="user-tabs__add">
    <div className="user-tabs__add-grid">
      <a href="#" className="user-tabs__add-link" onClick={(e) => { e.preventDefault(); setShowModal(true) }}>
        <i className="icon icon-post"></i>
        <span className="user-tabs__add-link-text">Add post</span>
      </a>
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
      >
        <FormNewPost close={() => setShowModal(false)} />
      </Modal>
      <Link href="/artwork/new">
        <a className="user-tabs__add-link">
          <i className="icon icon-picture"></i>
          <span className="user-tabs__add-link-text">Upload artwork</span>
        </a>
      </Link>
    </div>
  </div>);

  const emptyTab = () => <div className="user-tabs__panel-empty">No content yet</div>;

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
          owner && createContent()
        }
        {
          feed.length > 0 ?
            (gridView ? <UserGrid data={feed} name={name} avatar={avatar} /> :  <UserFeed type="feed" owner={owner} data={feed} name={name} nickname={nickname} avatar={avatar} hash={hash} />)
            :
            emptyTab()
        }
      </TabPanel>
      <TabPanel className="user-tabs__panel">
        {
          owner && createContent()
        }
        {
          creations.length > 0 ? <UserCreations data={creations} owner={owner} name={name} nickname={nickname} avatar={avatar} hash={hash} /> : emptyTab()
        }
      </TabPanel>
      <TabPanel className="user-tabs__panel">
        {
          owner && createContent()
        }
        {
          collection.length > 0 ? <UserCollection data={collection} owner={owner} name={name} nickname={nickname} avatar={avatar} hash={hash} /> : emptyTab()
        }
      </TabPanel>
      <TabPanel className="user-tabs__panel">
        {
          bids.length > 0 ? <UserBids owner={owner} data={bids} /> : emptyTab()
        }
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
