import { useEffect, useState } from 'react';

const userAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  return isAuthenticated;
};

export default userAuth;