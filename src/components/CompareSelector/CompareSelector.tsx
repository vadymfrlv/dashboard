import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategories, selectComparison } from '../../redux/compare/compareSlice';

import { SelectorWrapper, Selector, SelectList, SelectItem } from './CompareSelector.styled';

const categories = [
  { value: 'Cables', label: 'Cables' },
  { value: 'Routers', label: 'Routers' },
  { value: 'Connectors', label: 'Connectors' },
];

export const CompareSelector = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedCategories } = useSelector(selectComparison);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setOpen(prev => !prev);

  const handleSelect = (categoryValue: string) => {
    dispatch(setSelectedCategories(categoryValue));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        e.target instanceof Node &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <SelectorWrapper ref={wrapperRef}>
      <Selector onClick={handleToggle}>
        {selectedCategories?.length > 0 ? selectedCategories?.join(' & ') : 'Select to compare'}
      </Selector>
      {open && (
        <SelectList>
          {categories.map(category => (
            <SelectItem
              key={category.value}
              onClick={() => handleSelect(category.value)}
              style={{
                fontWeight: selectedCategories.includes(category.value) ? '900' : '400',
              }}
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectList>
      )}
    </SelectorWrapper>
  );
};
