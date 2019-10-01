import React from 'react';
import ReactDom from 'react-dom';
import getRouter from '@router/router';

// ReactDom.render(
//     <div>Hello React!</div>,
//     document.getElementById('app')
// );

// import Hello from 'components/hello/index';
// ReactDom.render(
//     <div>
//       Hello React!
//       <Hello/>
//     </div>,
//     document.getElementById('app')
// );

// //热更新时候，通知index.jsx文件
// if (module.hot) {
//   module.hot.accept();
// }

// ReactDom.render(
//     getRouter(), document.getElementById('app'));


import {AppContainer} from 'react-hot-loader';
/*初始化*/
renderWithHotReload(getRouter());

/*热更新*/
if (module.hot) {
  module.hot.accept('./router/router', () => {
    const getRouter = require('./router/router').default;
    renderWithHotReload(getRouter());
  });
}


function renderWithHotReload(RootElement) {
  ReactDom.render(
      <AppContainer>
        {RootElement}
      </AppContainer>,
      document.getElementById('app')
  )
}
