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
      const MAX_RECENT_SEARCHES = 8;

      // 중복 검색어 제거
      const isDuplicate = state.recentSearches.some(
        item => item.code === action.payload.code
      );

      if (!isDuplicate) {
        state.recentSearches = [
          action.payload,
          ...state.recentSearches.slice(0, MAX_RECENT_SEARCHES - 1)
        ];
      } else {
        // 중복된 항목을 맨 앞으로 이동
        state.recentSearches = [
          action.payload,
          ...state.recentSearches.filter(
            item => item.code !== action.payload.code
          )
        ].slice(0, MAX_RECENT_SEARCHES);
      }
    },
    setSearchActive: (state, action: PayloadAction<boolean>) => {
      state.isSearchActive = action.payload;
    }
  }
});

export const { setSearchTerm, setSuggestions, addRecentSearch, setSearchActive } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;