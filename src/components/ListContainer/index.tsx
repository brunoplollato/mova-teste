import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import Pagination from '../Pagination';
import { useFilter } from '../../contexts/FilterContext';

import styles from './styles.module.scss';

type List = {
  name: string;
  flag: string;
  region: string;
  capital: string;
  country: string;
  language: {string};
  callingCodes: string;
}

type ListProps = {
  list: List[],
  listSize: number,
}

export default function ListContainer({ list, listSize }: ListProps) {  
  const router = useRouter();
  const { firstSelect, lastFilter } = useFilter();
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ itemsPerPage ] = useState(listSize);
  
  const indexOfLastCountry = currentPage * itemsPerPage;
  const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;
  let currentCountry = list.slice(indexOfFirstCountry, indexOfLastCountry);

  let filteredList = []

  if (router.pathname === '/') {
    switch (firstSelect) {
      case 'region':
        filteredList = list.filter(item => item.region === lastFilter);
        currentCountry = filteredList.slice(indexOfFirstCountry, indexOfLastCountry);
        break;
      case 'capital':
        filteredList = list.filter(item => item.capital === lastFilter);
        currentCountry = filteredList.slice(indexOfFirstCountry, indexOfLastCountry);
        break;
      case 'country':
        filteredList = list.filter(item => item.country === lastFilter);
        currentCountry = filteredList.slice(indexOfFirstCountry, indexOfLastCountry);
        break;
      case 'languages':
        filteredList = list.filter(item => item.language[0].name === lastFilter);
        currentCountry = filteredList.slice(indexOfFirstCountry, indexOfLastCountry);
        break;
      case 'callingCodes':
        filteredList = list.filter(item => item.callingCodes[0] === lastFilter);
        currentCountry = filteredList.slice(indexOfFirstCountry, indexOfLastCountry);
        break;
  
      default:
        break;
    }
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [lastFilter])

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
    <div className={styles.container}>
      <div className={styles.overflow}>
        <ul className={styles.listContainer}>
          {currentCountry.map(country => (
            <li key={country.name}>
              <Link href={`/country/${country.name}`}>
                <Image src={country.flag} alt={country.name} width={632} height={362} objectFit="cover"/>
              </Link>
            </li>
          ))}
        </ul>

        <Pagination itemsPerPage={itemsPerPage} totalItems={filteredList.length > 0 ? filteredList.length : list.length} paginate={paginate} currentPage={currentPage} />
      </div>
    </div>
  );
};