import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { extractedCompanyData } from '@typings/hooks';

export interface SearchSliceState {
  searchTerm: string;
  suggestions: extractedCompanyData[];
  recentSearches: extractedCompanyData[];
  isSearchActive: boolean;
}

const initialState: SearchSliceState = {
  searchTerm: '',
  suggestions: [],
  recentSearches: [],
  isSearchActive: false
};

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<extractedCompanyData[]>) => {
      state.suggestions = action.payload;
    },
    addRecentSearch: (state, action: PayloadAction<extractedCompanyData>) => {
      if (!state.recentSearches.includes(action.payload)) {
        state.recentSearches = [action.payload, ...state.recentSearches.slice(0, 4)];
      }
    },
    setSearchActive: (state, action: PayloadAction<boolean>) => {
      state.isSearchActive = action.payload;
    }
  }
});

export const { setSearchTerm, setSuggestions, addRecentSearch, setSearchActive } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;