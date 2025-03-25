import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles/GlobalStyles";
import { UsersTable } from "./UsersTable/UsersTable";
import BlogPost from "./BlogPost/BlogPost";

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<UsersTable />}></Route>
        <Route path="/blog-post" element={<BlogPost />}>
          <Route path=":postId" element={<BlogPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
