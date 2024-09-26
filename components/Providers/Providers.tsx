// components/Providers/Providers.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  );
};

export default Providers;