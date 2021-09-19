import React, { FunctionComponent } from 'react';
import { BaseLayout } from './layouts/base';

export const App: FunctionComponent = (props) => {
  return <BaseLayout>{props.children}</BaseLayout>;
};
