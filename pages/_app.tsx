import React from 'react';
import '../styles/globals.css';
import type {AppProps} from 'next/app';

function MyApp({Component, pageProps}: AppProps) {
  return <>
    {/* <SafeHydrate> */}
    {/* <StrictMode> */}
    {/* <Suspense fallback="Loading..."> */}
    <Component {...pageProps} />
    {/* </Suspense> */}
    {/* </StrictMode> */}
    {/* </SafeHydrate> */}
  </>;
}

export default MyApp;
