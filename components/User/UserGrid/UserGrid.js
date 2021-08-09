import UserGridItem from './UserGridItem';

const UserGrid = ({ data, name, avatar }) => {
  return <div className="user-grid">
    {
      data.map((item, index) => <UserGridItem key={`${item.title}-${index}`} {...item} name={name} avatar={avatar} />)
    }
  </div>
}

export default UserGrid;
