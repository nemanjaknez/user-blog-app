import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  fetchUsers,
  selectUsers,
  removeUser,
  loadingUsers,
  loadingRemoveUser,
} from "../../redux/user/userSlice";
import {
  fetchBlogPosts,
  selectBlogPosts,
  removeBlogPost,
} from "../../redux/blog/blogPostSlice";
import Pagination from ".././Pagination/Pagination";
import AddPostForm from "../AddPostForm/AddPostForm";
import { User, BlogPost } from "../../data/data";

export const UsersTable = () => {
  const dispatch = useAppDispatch();
  let users = useTypedSelector(selectUsers);
  let blogPosts = useTypedSelector(selectBlogPosts);
  let loadingFetchUsers = useTypedSelector(loadingUsers);
  let loadingDeleteUser = useTypedSelector(loadingRemoveUser);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage, setUsersPerPage] = useState<number>(10);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    if (blogPosts.length === 0) {
      dispatch(fetchBlogPosts());
    }
  }, [dispatch, blogPosts.length]);

  const [filterQuery, setFilterQuery] = useState<string>("");

  const filteredItems = useMemo(() => {
    return users.filter((item: User) => {
      return item.first_name.toLowerCase().includes(filterQuery.toLowerCase());
    });
  }, [users, filterQuery]);

  const handleSearchFilter = (value: string) => {
    setFilterQuery(value);
    setCurrentPage(1);
  };

  const handleDeleteButton = (id: number) => {
    dispatch(removeUser(id));
  };

  const handleDeletePostButton = (id: string) => {
    dispatch(removeBlogPost(id));
  };

  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [currentPostAuthor, setCurrentPostAuthor] = useState<
    User | undefined
  >();
  const openCreatePostForm = (user: User) => {
    setFormVisible(true);
    setCurrentPostAuthor(user);
  };

  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);
  const [expandedUserPosts, setExpandedUserPosts] = useState<BlogPost[]>([]);

  const handleExpandRow = (id: number) => {
    if (expandedUserPosts) {
      setExpandedUserPosts([]);
    }
    setExpandedUserId(expandedUserId === id ? null : id);
  };

  useEffect(() => {
    const expandedPosts = blogPosts.filter(
      (post) => post.userId === expandedUserId,
    );
    setExpandedUserPosts(expandedPosts);
  }, [expandedUserId, blogPosts]);

  const firstUserIndex = (currentPage - 1) * usersPerPage;
  const lastUserIndex = firstUserIndex + usersPerPage;
  const subsetOfUsers: User[] = filteredItems.slice(
    firstUserIndex,
    lastUserIndex,
  );

  return (
    <div className="container">
      <h1>NaviPartner Tech Test</h1>
      <div className="search-holder">
        <div className="search-filter">
          <label htmlFor="search-filter">Search by Name:</label>
          <input
            type="search"
            id="search-filter"
            onChange={(e) => handleSearchFilter(e.target.value)}
            value={filterQuery}
          />
        </div>
      </div>
      <div className="table-holder">
        <table>
          <thead>
            <tr>
              <th aria-label="Expand row button"></th>
              <th className="user-first-name">Name</th>
              <th className="user-last-name">Last Name</th>
              <th className="user-email">Email</th>
              <th className="user-gender">Gender</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {subsetOfUsers.map((user) => (
              <React.Fragment key={user.id}>
                <tr
                  className={`table-row ${
                    expandedUserId === user.id ? "expanded" : ""
                  }`}
                >
                  <td>
                    <button
                      aria-expanded="false"
                      className="expand-row"
                      onClick={() => handleExpandRow(user.id)}
                    ></button>
                  </td>
                  <td className="user-first-name">{user.first_name}</td>
                  <td className="user-last-name">{user.last_name}</td>
                  <td className="user-email">{user.email}</td>
                  <td className="user-gender">{user.gender}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => openCreatePostForm(user)}
                    >
                      Create New Post
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDeleteButton(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedUserId === user.id && (
                  <tr className="table-row child-row">
                    <td colSpan={7}>
                      <div className="blog-list-holder">
                        <ul className="blog-list">
                          {expandedUserPosts.map((post) => (
                            <li key={post.id}>
                              <span className="post-title">
                                <Link to={"/blog-post/" + post.id}>
                                  {post.title.substring(0, 60)}...
                                </Link>
                              </span>
                              <span className="post-date">
                                {new Date(post.datePosted).toLocaleDateString()}
                              </span>
                              <div className="button-holder">
                                <Link
                                  to={"/blog-post/" + post.id}
                                  className="button-link"
                                >
                                  Read more
                                </Link>
                              </div>
                              <div className="button-holder">
                                <button
                                  type="button"
                                  className="delete-btn"
                                  onClick={() =>
                                    handleDeletePostButton(post.id)
                                  }
                                >
                                  Delete Post
                                </button>
                              </div>
                            </li>
                          ))}
                          {expandedUserPosts.length === 0 && (
                            <span>This user has no blog posts created.</span>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {loadingDeleteUser && (
          <div className="loading-overlay">
            <span className="loader"></span>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        usersCount={filteredItems.length}
        usersPerPage={usersPerPage}
      />
      {formVisible && (
        <AddPostForm
          postAuthor={currentPostAuthor}
          setFormVisible={setFormVisible}
        />
      )}
      {loadingFetchUsers && (
        <div className="loading-overlay">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};
