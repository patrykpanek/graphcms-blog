import React, { useEffect, useState } from 'react';
import { Header } from '../components';
import '../styles/style.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
