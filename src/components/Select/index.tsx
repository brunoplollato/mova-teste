import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import { useFilter } from '../../contexts/FilterContext';

import styles from './styles.module.scss';

type SelectProps = {
  title: string;
  items: Item;
}

type Item = {
  name: string;
} | any;

function Select({ title, items }: SelectProps) {
  const node = useRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const toggle = (isOpen) => setOpen(!open);

  const { setFirstFilter, setSearchFilter } = useFilter();

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setOpen(false);
  };
  
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  function handleOnClick(item: Item) {
    if (!selection.some(current => current.name === item.name)) {
      setSelection([item]);
      setIsSelected(true);
      toggle(!open)
      
      if (item.name === 'Região' || item.name === 'Capital' || item.name === 'Língua' || item.name === 'País' || item.name === 'Código de ligação') {
        setFirstFilter(item.name);
      } else {
        setSearchFilter(item.name)
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.name !== item.name
      );
      setSelection([...selectionAfterRemoval]);
      setIsSelected(false)
    }
  }

  function isItemInSelection(item: Item) {
    if (selection.some(current => current.name === item.name)) {
      return true;
    }
    return false;
  }

  return (
    <div className={styles.container} ref={node}>
      <div
        tabIndex={0}
        className={styles.header}
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className={styles.headerTitleContainer}>
          <p className={`${styles.headerTitle} ${open ? styles.open : null}`}>{`${!isSelected ? title : selection[0].name}`}</p>
        </div>
        <div className={styles.headerAction}>
          <p>{open ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</p>
        </div>
      </div>
      {open && (
        <ul className={styles.listContainer}>
          {items.map((item: Item) => (
            <li className={styles.listItem} key={item.name}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span className={isItemInSelection(item) && styles.selected}>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select