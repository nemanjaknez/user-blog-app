import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getMembers, BlogPost, deleteBlogPost, addBlogPost, editBlogPost } from "../../data/data";
import { RootState } from "../store";

export const fetchBlogPosts = createAsyncThunk<BlogPost[], void, { rejectValue: string }>(
  "blogPosts/fetchBlogPosts",
  async (_, { rejectWithValue }) => {
    try {
      const posts = await getMembers();
      return posts;
    } catch (error) {
      return rejectWithValue("Failed to fetch blog posts");
    }
  }
);

export const removeBlogPost = createAsyncThunk(
  'blogPost/removeBlogPost',
  async (id: string, { rejectWithValue }) => {
    try {
      const success = await deleteBlogPost(id);
      if (!success) throw new Error("Deletion failed");
      return id;
    } catch(error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createBlogPost = createAsyncThunk(
  'blogPost/createBlogPost',
  async (post: BlogPost, { rejectWithValue }) => {
    try {
      const success = await addBlogPost(post);
      if (!success) throw new Error("Post creation failed");
      return post;
    } catch(error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const editPost = createAsyncThunk(
  'blogPost/editPost',
  async (post: BlogPost, { rejectWithValue }) => {
    try {
      const success = await editBlogPost(post.id, post);
      if (!success) throw new Error("Post editing was unsuccessful");
      return post;
    } catch(error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export interface BlogPostState {
  blogPostsList: BlogPost[];
  loading: boolean;
}

const initialState = {
  blogPostsList: [],
  loading: false
} as BlogPostState;

export const blogPostSlice = createSlice({
  name: "blogPost",
  initialState,
  reducers: {
    // TODO: Add any needed reducers here
    // myAwesomeReducer() {}
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.blogPostsList.push(...payload);
      })
      .addCase(removeBlogPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.blogPostsList = state.blogPostsList.filter((post) => post.id !== payload);
      })
      .addCase(createBlogPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        if(payload) {
          state.blogPostsList = [payload, ...state.blogPostsList];
        }
      })
      .addCase(editPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        if(payload) {
          state.blogPostsList = state.blogPostsList.map((post) =>
            post.id === payload.id ? { ...post, ...payload } : post
          );
        }
      })
  },
});

// TODO: Export any redux actions if needed
// export const { removeUser } = userSlice.actions;

export default blogPostSlice.reducer;

export const selectBlogPosts = (state: RootState) => state.blogPost.blogPostsList;
export const loadingBlogPosts = (state: RootState) => state.blogPost.loading;
