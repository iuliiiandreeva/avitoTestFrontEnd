import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { RootState } from './store'; // Adjust the import path based on your project structure

// Define the shape of your game object
interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

// Define the initial state for the slice
interface GamesState {
  games: Game[];
  isLoading: boolean;
  error: any;
  message: string;
  selectedPlatform: string;
  selectedGenre: string | null;
  selectedSorting: string | null;
  id: number | null;
}


const initialState: GamesState = {
  games: [],
  isLoading: false,
  error: null,
  message: "",
  selectedPlatform: "all",
  selectedGenre: null,
  selectedSorting: null,
  id: null,
};

// Create an async thunk action to fetch games
export const fetchGames = createAsyncThunk<Game[], { params: any }>(
  'games/fetchGames',
  async ({ params }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<Game[]> = await axios.get(
        'https://free-to-play-games-database.p.rapidapi.com/api/games',
        {
          params,
          headers: {
            'X-RapidAPI-Key': '43fc9aae6cmsh93bd31160378652p19c5f3jsn42074c0ab659',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
          },
        }
      );

      // Return the data to be stored in the Redux store
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return rejectWithValue('Objects not found');
      } else if (error.response?.status === 500) {
        return rejectWithValue('Something went wrong on our side');
      } else {
        return rejectWithValue('SomeError');
      }
    }
  }
);

// Create a slice of the Redux store
const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setSelectedPlatform: (state, action:PayloadAction<string>) => {
      state.selectedPlatform = action.payload;
    },
    setSelectedGenre: (state, action:PayloadAction<string>) => {
      state.selectedGenre = action.payload;
    },
    setSelectedSorting: (state, action:PayloadAction<string>) => {
      state.selectedSorting = action.payload;
    },
    resetSelectedGenre: (state) => {
      state.selectedGenre = null;
    },
    resetSelectedSorting: (state) => {
      state.selectedSorting = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.games = action.payload;
        state.error = null; // Clear error on success
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'An error occurred';
      });
  },
});


export default gamesSlice.reducer;
export const { setSelectedPlatform, setSelectedGenre, setSelectedSorting, resetSelectedSorting, resetSelectedGenre} = gamesSlice.actions;

export const selectGames = (state: RootState) => state.games;
