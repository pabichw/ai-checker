import React from 'react';

type Provider = React.ComponentType<{ children: React.ReactNode }>;

export const composeProviders = (...providers: Provider[]) => {
  return ({ children }: { children: React.ReactNode }) => {
    return providers.reduceRight((acc, Provider) => {
      return <Provider>{acc}</Provider>;
    }, children);
  };
};
