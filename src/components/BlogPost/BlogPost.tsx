import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchBlogPosts, selectBlogPosts, removeBlogPost, editPost, loadingBlogPosts } from "../../redux/blog/blogPostSlice";
import { BlogPost as Post } from "../../data/data";

const BlogPost = () => {

    const { postId } = useParams();
    const dispatch = useAppDispatch();    
    let blogPosts = useTypedSelector(selectBlogPosts);

    let loading = useTypedSelector(loadingBlogPosts);

    let navigate = useNavigate();

    useEffect(() => {
        if (blogPosts.length === 0) {
            dispatch(fetchBlogPosts());
        }
    }, [dispatch, blogPosts.length]);

    const post: Post | undefined = blogPosts.find((item) => item.id === postId);

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleEditButton = () => {
        if(post) {
            setTitle(post.title);
            setText(post.body);
        }
        
        setEditMode(true);
    }

    const handleDeleteButton = (id: string) => {
        dispatch(removeBlogPost(id));

        navigate("/");
    }

    const handleSaveChanges = () => {

        if(title === '' || text === '') {
            setError('Both title and text are required.');
            return;
        }

        if(post && title !== '' && text !== '' && (title !== post.title || text !== post.body)) {
            const editedPost = {
                id: post.id,
                userId: post.userId,
                datePosted: post.datePosted,
                title: title,
                body: text,
            }

            dispatch(editPost(editedPost));
            setEditMode(false);
        }

        if(post && title === post.title && text == post.body) {
            setEditMode(false);
        }
    }

    const handleCancelEdit = () => {
        if(post) {
            setTitle(post.title);
            setText(post.body);
        }

        setEditMode(false);
        setError('');
    }

    return(
        <div className="blog-single">
            <div className="container">
                {post !== undefined && (
                    <div>
                        <div className="image-placeholder">Image Placeholder</div>

                        {editMode ? (
                            <>
                                <textarea className="blog-title-input" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                                <textarea className="blog-text-input" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                                {error && (
                                    <p className="error-message">{error}</p>
                                )}
                                <div className="buttons-holder">
                                    <button type="button" onClick={() => handleSaveChanges()}>Save</button>
                                    <button type="button" onClick={() => handleCancelEdit()}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-text">{post.body}</p>
                            </>
                        )}
                        
                        <p className="post-date">Date Posted: {new Date(post.datePosted).toLocaleDateString()}</p>
                        {!editMode && (
                            <div className="buttons-holder">
                                <button type="button" className="edit-btn" onClick={() => handleEditButton()}>Edit Post</button>
                                <button type="button" className="delete-btn" onClick={() => handleDeleteButton(post.id)}>Delete Post</button>
                            </div>
                        )}

                        <Link to="/" className="button-link back-button">Back to users table</Link>
                    </div>
                )}
            </div>
            {loading && (
                <div className="loading-overlay">
                    <span className="loader"></span>
                </div>
            )}
        </div>
    );
}

export default BlogPost;