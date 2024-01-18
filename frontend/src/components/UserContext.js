// UserContext.js
import { createContext } from 'react';

const UserContext = createContext({
    userID: null,
    setUser: () => { },
});

export default UserContext;
