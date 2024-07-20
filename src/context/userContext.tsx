// Context로 관리하려고 했으나 되지 않아 주석처리
// 추후 삭제

// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface UserContextType {
//   userId: number | null;
//   setUserId: (id: number | null) => void;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [userId, setUserId] = useState<number | null>(null);

//   return (
//     <UserContext.Provider value={{ userId, setUserId }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };
