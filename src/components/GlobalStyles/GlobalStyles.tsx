import React from "react";
import { createGlobalStyle, css } from "styled-components";
import { responsiveStyles } from "./ResponsiveStyles";

export const GlobalStyles = React.memo(
  createGlobalStyle`${css`
    * {
      margin: 0;
      box-sizing: border-box;
      padding: 0;
      border: 0;
      font-family: "Montserrat", sans-serif;
    }

    :root {
      --additional-bg-color: #f5f5f5;
    }

    p {
      font-size: 15px;
      line-height: 1.467em;
      font-weight: 400;
    }

    a {
      text-decoration: none;
      color: currentColor;
    }

    .container {
      width: 1300px;
      margin: 0 auto;
      padding: 50px 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-top: 10px;
      font-size: 15px;
      line-height: 1.467em;
      font-weight: 400;
    }

    thead tr {
      background-color: var(--additional-bg-color);
    }

    th,
    td {
      text-align: left;
      padding: 8px;
    }

    th:first-child,
    td:first-child {
      width: 40px;
      padding: 0;
    }

    td {
      border-top: 1px solid #dddddd;
    }

    .user-first-name,
    .user-last-name {
      width: 15%;
    }

    .user-email {
      width: 33%;
    }

    .user-gender {
      width: 12%;
    }

    tr.table-row {
      transition: background-color 0.15s ease-in-out;
    }

    tr.table-row:hover {
      background-color: var(--additional-bg-color);
    }

    tr.table-row.child-row {
      background-color: #fff;
    }

    .table-holder {
      position: relative;
      overflow-x: auto;
    }

    .expand-row {
      width: 40px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      background-color: transparent;
    }

    .expand-row:hover {
      background-color: transparent;
    }

    .expand-row:after {
      content: "";
      display: inline-block;
      box-sizing: border-box;
      padding: 0;
      border-top: 5px solid transparent;
      border-left: 10px solid rgba(0, 0, 0, 0.4);
      border-bottom: 5px solid transparent;
      border-right: 0px solid transparent;
      transform-origin: center;
      transition: transform 0.15s ease-in-out, border-color 0.25s ease-in-out;
    }

    .table-row.expanded .expand-row:after,
    .table-row button.expand-row:hover:after {
      transform: rotate(90deg);
      border-left-color: rgba(0, 0, 0, 0.75);
    }

    .table-row.child-row .blog-list {
      list-style: none;
    }

    .blog-list-holder {
      padding: 25px 48px;
      background-color: #f9f9f9;
    }

    .blog-list {
      background-color: #fff;
      padding: 15px 30px 18px;
      border-left: 2px solid #d3d3d3;
    }

    .blog-list li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      border-top: 1px solid #eee;
    }

    .blog-list li:first-child {
      border-top: none;
      padding-top: 0;
    }

    .blog-list li:last-child {
      padding-bottom: 0;
    }

    .blog-list .post-title {
      flex-basis: 50%;
    }

    .blog-list .post-title a {
      text-decoration: none;
      color: #495057;
      transition: color 0.2s ease-in-out;
    }

    .blog-list .post-title a:hover {
      color: #000;
    }

    .blog-list .post-date {
      color: #495057;
    }

    .blog-list .post-date,
    .blog-list .button-holder {
      flex-basis: 15%;
    }

    .pagination {
      list-style: none;
      display: flex;
      justify-content: center;
      gap: 6px;
      font-size: 14px;
      margin-top: 30px;
    }

    .pagination li {
      min-width: 30px;
      height: 30px;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #eee;
      color: #000;
      cursor: pointer;
      transition: border-color 0.25s ease-in-out;
    }

    .pagination li.active {
      border-color: #000;
    }

    .pagination li.disabled {
      pointer-events: none;
      background-color: var(--additional-bg-color);
      color: #999;
      cursor: not-allowed;
    }

    .pagination li.active.disabled {
      background-color: #fff;
      color: #000;
    }

    .input-holder label {
      display: block;
      margin: 0 0 6px;
    }

    input,
    textarea {
      display: block;
      width: 100%;
      padding: 10px 15px; 
      border: 1px solid #eee;
      border-radius: 0;
      font-size: 15px;
      line-height: 1.467em;
      font-weight: 400;
      margin: 0 0 20px;
      transition: border-color 0.15s ease-in-out;
    }

    input {
      height: 46px;
    }

    textarea {
      height: 150px;
    }

    input:focus,
    textarea:focus {
      border-radius: 0;
      outline: none;
      border-color: #b5b5b5;
    }

    button,
    .button-link {
      display: inline-flex;
      padding: 7px 15px;
      font-size: 14px;
      line-height: 1.5em;
      background-color: #fff;
      border: 1px solid #ddd;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.25s ease-in-out;
    }

    button:hover,
    .button-link:hover {
      background-color: #ededed;
      border-color: #a1a1a1;
    }

    .delete-btn {
      color: #fff;
      background-color: #D84040;
      border-color: #D84040;
    }

    .delete-btn:hover {
      color: #fff;
      background-color: #A31D1D;
      border-color: #A31D1D;
    }

    table button,
    table .button-link {
      font-size: 14px;
      line-height: 1em;
      padding: 4px 7px;
    }

    .buttons-holder {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .back-button {
      margin-top: 40px;
    }

    .form-holder {
      margin: 30px 0 0;
    }

    .form-holder button {
      display: block;
    }

    .form-title-holder {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 30px;
    }

    .success-message,
    .error-message {
      display: inline-block;
      padding: 5px 15px;
      margin: 10px 0;
    }

    .error-message {
      border: 1px solid #D84040;
      color: #D84040;
    }

    .success-message {
      border: 1px solid #77B254;
      color: #77B254;
    }

    .image-placeholder {
      width: 100%;
      height: 30vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #fff;
      font-size: 2rem;
      font-weight: 700;
      background: #d5d5d5;
      margin-bottom: 30px;
    }

    .blog-single .post-title {
      margin: 0;
    }

    .blog-single .post-text {
      margin: 20px 0 0;
    }

    .blog-single .post-date {
      margin: 20px 0;
    }

    .search-holder {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      margin-top: 20px;
    }

    .search-filter {
      width: 30%;
    }

    .search-filter label {
      display: block;
      margin: 0 0 6px;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255,255,255, 0.6);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loader {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      border: 3px solid;
      border-color: #000 #000 transparent;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }

    .loader::after {
      content: '';  
      box-sizing: border-box;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      border: 3px solid;
      border-color: transparent #E52020 #E52020;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      animation: rotationBack 0.5s linear infinite;
      transform-origin: center center;
    }

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    } 
        
    @keyframes rotationBack {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }

    ${responsiveStyles}

  `}`,
);
