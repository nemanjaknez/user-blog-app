import { BlogPost } from "../../data/data";
import reducer, { fetchBlogPosts, createBlogPost, editPost, removeBlogPost, BlogPostState } from "../blog/blogPostSlice";

const TestBlogPosts: BlogPost[] = [
  {
    "id": "173fcc2t-601f-40e4-b921-3bc90368a1d4",
    "userId": 1,
    "datePosted": "2025-02-03T02:52:44Z",
    "title": "Lorem ipsum test 1",
    "body": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint",
  },
  {
    "id": "987fcc1c-601c-40e4-b687-3ba90378a1d9",
    "userId": 1,
    "datePosted": "2025-02-03T01:23:14Z",
    "title": "Lorem ipsum test 2",
    "body": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ducimus qui ab illo inventore",
  },
];

describe("blogPostSlice", () => {
  let initialState: BlogPostState;

  beforeEach(() => {
    initialState = {
      blogPostsList: [],
      loading: false,
    };
  })

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      blogPostsList: [],
      loading: false,
    });
  });

  it("adds blog posts to list when fetched", () => {
    const action = { type: fetchBlogPosts.fulfilled.type, payload: TestBlogPosts };

    const previousState: BlogPostState = {
      blogPostsList: [],
      loading: false,
    };

    expect(reducer(previousState, action)).toEqual({
      blogPostsList: TestBlogPosts,
      loading: false,
    });
  });

  it("should create new blog post", () => {
    const newPost: BlogPost = {
      id: "069fcr1c-601c-40e4-b687-3ba90378a1d9",
      userId: 2,
      datePosted: "2025-03-03T11:34:03Z",
      title: "Test Post Lorem Ipsum",
      body: "New test post content lorem ipsum dolor",
    };

    const action = { type: createBlogPost.fulfilled.type, payload: newPost };

    expect(reducer(initialState, action)).toEqual({
      blogPostsList: [newPost],
      loading: false,
    });
  });

  it("should update existing post", () => {
    const updatedPost = { ...TestBlogPosts[0], title: "Updated Title" };
    const action = { type: editPost.fulfilled.type, payload: updatedPost };
    const previousState = { blogPostsList: TestBlogPosts, loading: false };

    expect(reducer(previousState, action)).toEqual({
      blogPostsList: [updatedPost, TestBlogPosts[1]],
      loading: false,
    });
  });

  it("should remove blog post", () => {
    const action = { type: removeBlogPost.fulfilled.type, payload: "173fcc2t-601f-40e4-b921-3bc90368a1d4" };
    const previousState = { blogPostsList: TestBlogPosts, loading: false };
    
    expect(reducer(previousState, action)).toEqual({
      blogPostsList: [TestBlogPosts[1]],
      loading: false,
    });
  });
});
