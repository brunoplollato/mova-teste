import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import ListContainer from "../../components/ListContainer";
import { api } from "../../services/api";

import styles from './styles.module.scss';

type Languages = {
  name: string
}

type Country = {
  name: string;
  capital: string;
  region: string;
  subRegion: string;
  population: string;
  languages: Languages[];
  neighboringCountries: Countries;
  flag: string;
}

type CountryProps = {
  countryData: Country;
  neighboring: Neighboring[]
}

type Neighboring = {
  name: string;
  flag: string;
  region: string;
  capital: string;
  country: string;
  language: {string};
  callingCodes: string;
}

type Countries = {
  name: string
}

export default function Country({ countryData, neighboring }: CountryProps) {
  return (
    <div className={styles.countryPage}>
      <Head>
        <title>{countryData.name} | Mova</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div className={styles.countryContainer}>
          <Image 
            src={countryData.flag}
            width={886}
            height={516}
            objectFit="fill"
          />

          <div className={styles.countryInfo}>
            <p>Nome: {countryData.name}</p>
            <p>Capital: {countryData.capital}</p>
            <p>Região: {countryData.region}</p>
            <p>Sub-região: {countryData.subRegion}</p>
            <p>População: {countryData.population}</p>
            <p>
              Línguas: 
              {countryData.languages.map(lang => (
                <span key={lang.name}> {lang.name}</span>
              ))}  
            </p>
          </div>
        </div>

        <div className={styles.neighboringCountriesContainer}>
          <h1>Países Vizinhos:</h1>

          <div className={styles.neighboringCountriesFlags}>
            <ListContainer list={neighboring} listSize={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query
 
  const { data } = await api.get(`/alpha/${slug}?fields=name;capital;region;subregion;population;languages;borders;flag`);
  
  const countryData =  {
      name: data.name,
      capital: data.capital,
      region: data.region,
      subRegion: data.subregion,
      population: data.population,
      languages: data.languages,
      neighboringCountries: data.borders,
      flag: data.flag,
  };

  const neighboring = await Promise.all(await countryData.neighboringCountries.map(country => {
    return api
    .get(`/alpha/${country}?fields=alpha3Code;flag`)
    .then(({ data }) => {
      return {
        name: data.alpha3Code.toLowerCase(),
        flag: data.flag
      }
    });
  }));

  return {
    props: {
      countryData,
      neighboring
    }
  }
}