import Select from '../Select';
import { useFilter } from '../../contexts/FilterContext';

import styles from './styles.module.scss';
import { useEffect } from 'react';


export default function FiltersContainer() {
  const { secondFilter, lastFilter, firstSelect, setFirstFilter } = useFilter();
  const initialOptions = [
    {name: 'Região'},
    {name: 'Capital'},
    {name: 'Língua'},
    {name: 'País'},
    {name: 'Código de ligação'}
  ]

  useEffect(() => {
    setFirstFilter('');
  }, [])
  
  return (
    <header className={styles.container}>
      <div className={styles.filter}>
        <span>Filtrar por</span>
        <Select title='Escolha uma opção' items={initialOptions} />
      </div>
      { secondFilter.length > 0 ? (
        <div className={styles.filter}>
          <span>Filtrar por</span>
          <Select title='Escolha uma opção' items={secondFilter} />
        </div>
      ) : null}
      {/* { lastFilter ? (
        <div className={styles.btnContainer}>
          <button type="button" className={styles.searchButton}>
            Pesquisar
          </button>
        </div>
      ) : null} */}
    </header>
  );
};