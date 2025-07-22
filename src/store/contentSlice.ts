import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ContentItem {
  id: string;
  photo: string;
  user: string;
  title: string;
  pricingOption: number; // 0 = Paid, 1 = Free, 2 = View Only
  price?: number;
}

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
      // Keyword filter
      if (state.keyword) {
        filtered = filtered.filter(
          (item) =>
            item.user.toLowerCase().includes(state.keyword.toLowerCase()) ||
            item.title.toLowerCase().includes(state.keyword.toLowerCase())
        );
      }
      // Pricing filter
      if (state.selectedPricing.length) {
        filtered = filtered.filter((item) =>
          state.selectedPricing.includes(item.pricingOption)
        );
      }
      // Price range filter (if Paid is selected)
      if (
        state.selectedPricing.includes(0) &&
        state.priceRange[0] !== 0 &&
        state.priceRange[1] !== 999
      ) {
        filtered = filtered.filter(
          (item) =>
            item.price &&
            item.price >= state.priceRange[0] &&
            item.price <= state.priceRange[1]
        );
      }
      state.filteredItems = filtered;
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
