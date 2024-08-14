import { createContext } from 'react';

const userContext = createContext({
  loggedInUser: '',
  user: null, // You can provide a default user value or leave it as null
  setUser: () => { }, // Placeholder function for setting user, you'll replace this with your actual function
});

export default userContext;
