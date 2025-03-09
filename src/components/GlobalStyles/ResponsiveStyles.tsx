import { css } from "styled-components";

export const responsiveStyles = css`
    @media (max-width: 1440px) {
        .container {
            width: 1100px;
        }
    }

    @media (max-width: 1200px) {
        .container {
            width: 960px;
        }
    }

    @media (max-width: 1024px) {
        .container {
            width: 800px;
        }

        .search-filter {
            width: 45%;
        }

        .blog-list-holder {
            padding: 25px;
        }
    }

    @media (max-width: 768px) {
        .container {
            width: 86%;
        }
    }

    @media (max-width: 600px) {

        .search-holder {
            justify-content: flex-start;
        }

        .search-filter {
            width: 100%;
        }
    }
`;

export default responsiveStyles;
