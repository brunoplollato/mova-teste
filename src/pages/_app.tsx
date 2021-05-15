import Header from '../components/Header';
import { FilterContextProvider } from '../contexts/FilterContext';

import '../styles/globals.scss';
import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <FilterContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          
          <Component {...pageProps} />
        </main>
      </div>
    </FilterContextProvider>
  )
}

export default MyApp