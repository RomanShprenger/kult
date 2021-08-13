import UserBidsItem from "./UserBidsItem";

const UserBids = ({ data, owner }) => {
  return <div className="user-bids">
    {
      data.map((item, index) => <UserBidsItem key={`${item.slug}-${index}`} owner={owner} {...item} />)
    }
  </div>
}

export default UserBids;
