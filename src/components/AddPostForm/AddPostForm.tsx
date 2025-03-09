import React, { useState } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createBlogPost } from "../../redux/blog/blogPostSlice";
import { User } from "../../data/data";

interface FormParams {
    postAuthor?: User;
    setFormVisible: (formVisible: boolean) => void;
}

const AddPostForm = ({ postAuthor, setFormVisible }: FormParams) => {

    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleCreatePostForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(title === '' || text === '') {
            setError('Both title and text are required.');
            return;
        }

        if(postAuthor !== undefined) {
            const post = {
                id: crypto.randomUUID(),
                userId: postAuthor.id,
                datePosted: new Date().toISOString().slice(0, -5) + "Z",
                title: title,
                body: text,
            };

            dispatch(createBlogPost(post));

            setTitle('');
            setText('');
            setError('');
            setSuccessMessage('Post successfully added!');

            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    }

    return(
        <>
            {postAuthor !== undefined && (
                <div className="form-holder">
                    <div className="form-title-holder">
                        <h3>Add New Post</h3>
                        <button type="button" className="close-form" onClick={() => setFormVisible(false)}>Close Form</button>
                    </div>
                    <form onSubmit={(event) => handleCreatePostForm(event)}>
                        <div className="input-holder">
                            <label htmlFor="post-author">Post Author</label>
                            <input type="text" value={`${postAuthor.first_name} ${postAuthor.last_name}`} readOnly />
                        </div>
                        <div className="input-holder">
                            <label htmlFor="post-title">Post Title</label>
                            <input
                                type="text"
                                id="post-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="input-holder">
                            <label htmlFor="post-text">Post Text</label>
                            <textarea
                                id="post-text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </div>
                        {error && (
                            <p className="error-message">{error}</p>
                        )}
                        {successMessage && (
                            <p className="success-message">{successMessage}</p>
                        )}
                        <button type="submit">Create Post</button>
                    </form>
                </div>
            )}
        </>

    );
}

export default AddPostForm;