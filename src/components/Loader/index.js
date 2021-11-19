import React, { memo } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

import { LinearContainer } from './styledComponents';

function Loader() {
  return (
    <LinearContainer>
      <LinearProgress />
    </LinearContainer>
  );
}

export default memo(Loader);
