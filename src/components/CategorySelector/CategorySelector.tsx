import { useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';

import { setCategory } from '../../redux/filter/filterSlice';

import { SelectorWrapper, Selector, SelectList, SelectItem } from './CategorySelector.styled';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'Cables', label: 'Cables' },
  { value: 'Routers', label: 'Routers' },
  { value: 'Connectors', label: 'Connectors' },
];

export const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        e.target instanceof Node &&
        !wrapperRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    dispatch(setCategory(value));
    setShowOptions(false);
  };

  return (
    <SelectorWrapper ref={wrapperRef}>
      <Selector onClick={() => setShowOptions(!showOptions)}>
        {selectedCategory || 'Select a category'}
      </Selector>
      {showOptions && (
        <SelectList>
          {categories.map(category => (
            <SelectItem key={category.value} onClick={() => handleCategoryChange(category.value)}>
              {category.label}
            </SelectItem>
          ))}
        </SelectList>
      )}
    </SelectorWrapper>
  );
};
