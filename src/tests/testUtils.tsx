import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { CustomProvider } from '../CustomContextProvider';

import { QueryClient, QueryClientProvider } from 'react-query';
const client = new QueryClient();

const AllTheProviders: FC = ({ children }: any) => {
  return (
    <CustomProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </CustomProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
