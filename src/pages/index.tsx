import Head from 'next/head';
import { api } from '../services/api';
import { GetServerSideProps } from 'next';

import ListContainer from '../components/ListContainer';
import FiltersContainer from '../components/FiltersContainer';

import styles from './home.module.scss';
import { useFilter } from '../contexts/FilterContext';
import { useEffect } from 'react';

type HomeProps = {
  countryList: Country[],
  regionList: Region,
  capitalList: Capital,
  nameList: Name,
  callingCodeList: CallingCode,
  languageList: Languages,
  
}

type Country = {
  name: string;
  flag: string;
  region: string;
  capital: string;
  country: string;
  language: {string};
  callingCodes: string;
}

type Region = {
  name: string
}

type Capital = {
  name: string
}

type Name = {
  name: string
}

type CallingCode = {
  name: string
}

type Languages = {
  name: string
}

export default function Home({ 
  countryList,
  regionList,
  capitalList,
  nameList,
  callingCodeList,
  languageList
 }: HomeProps) {
  const { 
    setRegions,
    setCapitals,
    setCountries,
    setCallingCodes,
    setLanguages
  } = useFilter();

  useEffect(() => {
    setRegions(regionList);
    setCapitals(capitalList);
    setCountries(nameList);
    setCallingCodes(callingCodeList);
    setLanguages(languageList);
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Mova</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FiltersContainer />

      <ListContainer list={countryList} listSize={10} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get(`/all?fields=alpha3Code;flag;region;capital;name;callingCodes;languages`);
  
  const countryList = data.map(country => {
    return {
      name: country.alpha3Code.toLowerCase(),
      flag: country.flag,
      region: country.region,
      capital: country.capital,
      country: country.name,
      language: country.languages,
      callingCodes: country.callingCodes,
    }
  })
  
  const regionList = data.map(item => {
    return {
      name: item.region
    }
  })
  
  const capitalList = data.map(item => {
    return {
      name: item.capital
    }
  })
  
  const nameList = data.map(item => {
    return {
      name: item.name
    }
  })

  const callingCodeList = data.map(item => item.callingCodes)

  const languageList = data.map(item => item.languages.map(item => item.name))
  

  return {
    props: {
      countryList,
      regionList,
      capitalList,
      nameList,
      callingCodeList,
      languageList,
    }
  }
}