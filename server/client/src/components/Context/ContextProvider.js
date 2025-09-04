import React, { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

const ContextProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    const saved = localStorage.getItem("account");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (account) {
      localStorage.setItem("account", JSON.stringify(account));
    } else {
      localStorage.removeItem("account");
    }
  }, [account]);

  return (
    <LoginContext.Provider value={{ account, setAccount }}>
      {children}
    </LoginContext.Provider>
  );
};

export default ContextProvider;

// import React, { createContext, useState } from 'react';

// export const LoginContext = createContext(null);

// const ContextProvider = ({ children }) => {
//   const [account, setAccount] = useState(null);
// const [toggle, setToggle] = useState(false);
//   return (
//     <LoginContext.Provider value={{ account, setAccount, toggle, setToggle }}>
//       {children}
//     </LoginContext.Provider>
//   );
// };

// export default ContextProvider;
