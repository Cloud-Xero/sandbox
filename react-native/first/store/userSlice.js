import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clips: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addClip: (state, action) => {
      const newClip = action.payload;
      state.clips.push(newClip);
    },
    deleteClip: (state, action) => {
      const deletingClip = action.payload;
      const currentClips = state.clips;

      const filteredClips = currentClips.filter(
        (clip) => clip.url !== deletingClip.url
      );

      state.clips = filteredClips;
    },
  },
});

export const { addClip, deleteClip } = userSlice.actions;

export default userSlice.reducer;
