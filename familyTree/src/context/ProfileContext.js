import React from 'react';

export const ProfileContext = React.createContext();

const ProfileCStore = props => {
  const [children, setChildren] = useState([]);
  return (
    <ProfileStore.Provider value={{children, setChildren}}>
      {props.children}
    </ProfileStore.Provider>
  );
};
export default ProfileStore;
