import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

type FilterContextProviderProps = {
  children: ReactNode;
}

type FilterContextData = {
  secondFilter: SetStateAction<string[]>;
  lastFilter: SetStateAction<string>;
  firstSelect: string;
  setFirstFilter: (filter: Filter) => void;
  setSearchFilter: (filter: Filter) => void;
  setRegions: (regions: Region) => void;
  setCapitals: (capitals: Capital) => void;
  setCountries: (names: Name) => void;
  setCallingCodes: (callingCodes: CallingCode) => void;
  setLanguages: (language: Language) => void;
}
type makeUniqueList = string[];

type Filter = string;

type List = {
  name: string;
} | any;

type Region = {
  name: string;
} | any;

type Capital = {
  name: string;
} | any;

type Name = {
  name: string;
} | any;

type CallingCode = {
  name: string;
} | any;

type Language = {
  name: string;
} | any;

export const FilterContext = createContext({} as FilterContextData);

export function FilterContextProvider({ children }: FilterContextProviderProps) {
  const [secondFilter, setSecondFilter] = useState<string[]>([]);
  const [firstSelect, setFirstSelect] = useState<string>('');
  const [lastFilter, setLastFilter] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<string[]>();
  const [capitalFilter, setCapitalFilter] = useState<string[]>();
  const [languagesFilter, setLanguagesFilter] = useState<string[]>();
  const [countriesFilter, setCountriesFilter] = useState<string[]>();
  const [codesFilter, setCodesFilter] = useState<string[]>();

  function setFirstFilter(filter: Filter) {
    switch (filter) {
      case 'Região':
        setSecondFilter(regionFilter);
        setFirstSelect('region');
        break;
      case 'Capital':
        setSecondFilter(capitalFilter);
        setFirstSelect('capital');
        break;
      case 'Língua':
        setSecondFilter(languagesFilter);
        setFirstSelect('languages');
        break;
      case 'País':
        setSecondFilter(countriesFilter);
        setFirstSelect('country');
        break;
      case 'Código de ligação':
        setSecondFilter(codesFilter);
        setFirstSelect('callingCodes');
        break;
      case '':
        setSecondFilter([]);
        setFirstSelect('');
        break;
    
      default:
        break;
    }
  }

  function setSearchFilter(filter: Filter) {
    setLastFilter(filter)
  }

  function Filter() {
    console.log(`Filtro: ${secondFilter} - ${lastFilter}`)
  }

  const setRegions = (regions: Region) => {
    setRegionFilter(makeUniqueList(regions))
  }

  function setCapitals(capitals: Capital) {
    setCapitalFilter(makeUniqueList(capitals))
  }

  function setCountries(names: Name) {
    setCountriesFilter(makeUniqueList(names))
  }
  
  function setCallingCodes(callingCodes: CallingCode) {
    const list = [];
    callingCodes.map(item => list.push(item));
    const sortedList = list.sort((a, b) => a - b);
    
    const newList = Array.from(new Set(sortedList.map(item => JSON.stringify({name: item[0]})))).map(item => JSON.parse(item)).filter(item => item.name !== "");
    
    setCodesFilter(newList);
  }

  function setLanguages(languages: Language) {
    const list = [];
    languages.map(item => item.map(item => list.push(item)));
    
    const newList = Array.from(new Set(list.map(item => JSON.stringify({name: item})))).map(item => JSON.parse(item)).filter(item => item.name !== "");

    setLanguagesFilter(newList);
  }
  
  function makeUniqueList(list: List): makeUniqueList {
    const newList = Array.from(new Set(list.map(item => JSON.stringify(item)))).map(item => JSON.parse(item as string)).filter(item => item.name !== "");

    return newList;
  }


  return(
    <FilterContext.Provider value={{
      setFirstFilter,
      setSearchFilter,
      firstSelect,
      secondFilter,
      lastFilter,
      setRegions,
      setCapitals,
      setCountries,
      setCallingCodes,
      setLanguages,
    }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => {
  return useContext(FilterContext);
}