import "../styles/globals.css";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import movies from "../reducers/Movies";

const store = configureStore({
  reducer: { movies },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
