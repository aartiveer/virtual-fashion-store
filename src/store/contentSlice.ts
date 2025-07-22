import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem } from '../api/fetchContents';

interface ContentState {
  items: ContentItem[];
  filteredItems: ContentItem[];
  loading: boolean;
  keyword: string;
  selectedPricing: number[];
  priceRange: [number, number];
}

const initialState: ContentState = {
  items: [],
  filteredItems: [],
  loading: false,
  keyword: '',
  selectedPricing: [],
  priceRange: [0, 999],
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    setSelectedPricing: (state, action: PayloadAction<number[]>) => {
      state.selectedPricing = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    resetFilters: (state) => {
      state.keyword = '';
      state.selectedPricing = [];
      state.priceRange = [0, 999];
      state.filteredItems = state.items;
    },
    applyFilters: (state) => {
      let filtered = [...state.items];
      if (state.keyword.trim() !== '') {
        filtered = filtered.filter(
          (item) =>
            item.creator.toLowerCase().includes(state.keyword.toLowerCase()) ||
            item.title.toLowerCase().includes(state.keyword.toLowerCase())
        );
      }
      if (state.selectedPricing.length > 0) {
        filtered = filtered.filter((item) =>
          state.selectedPricing.includes(item.pricingOption)
        );
      }
      state.filteredItems = filtered;  // always update with all when no filters
    },
  },
});

export const {
  setItems,
  setKeyword,
  setSelectedPricing,
  setPriceRange,
  resetFilters,
  applyFilters,
} = contentSlice.actions;

export default contentSlice.reducer;
