import { useContext, useState, createContext } from 'react';

export type FilterParams = {
  branchIds?: number[];
  purposeIds?: number[];
  cooperationWay?: string;
  recruitmentPlaceId?: number;
  skillCategoryIds?: number[];
};

type FilterParamsContextType = {
  filterParams: FilterParams | undefined;
  updateFilterParams: (newFilterParams: FilterParams) => void;
  resetFilterParams: () => void;
};

const FilterParamsContext = createContext<FilterParamsContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const FilterProvider = ({ children }: Props) => {
  const [filterParams, setFilterParams] = useState<FilterParams | undefined>(undefined);

  const updateFilterParams = (newFilterParams: FilterParams) => {
    setFilterParams(newFilterParams);
  };

  const resetFilterParams = () => {
    setFilterParams(undefined);
  };

  return (
    <FilterParamsContext.Provider value={{ filterParams, updateFilterParams, resetFilterParams }}>
      {children}
    </FilterParamsContext.Provider>
  );
};

export const useFilterParams = () => {
  const context = useContext(FilterParamsContext);
  if (context === null) {
    throw new Error('useFilterParams 은 FilterProvider 내부에서 호출해주세요.');
  }
  return context;
};
