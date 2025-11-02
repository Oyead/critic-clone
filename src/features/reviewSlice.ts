import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Review {
  gameId: string;
  user: string;
  rating: number;
  comment: string;
}

const initialState: Review[] = JSON.parse(localStorage.getItem("reviews") || "[]");

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.push(action.payload);
      localStorage.setItem("reviews", JSON.stringify(state));
    },
    removeReview: (state, action: PayloadAction<{ gameId: string; user: string }>) => {
      const newState = state.filter(
        (r) => !(r.gameId === action.payload.gameId && r.user === action.payload.user)
      );
      localStorage.setItem("reviews", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addReview, removeReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
