import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import MemberList from './MemberList';

ReactDOM.render(
  <MemberList count={5} />,
  document.getElementById('root')
);
