import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html {
    font-size: 10px;

    @media (min-width: 2500px) {
      font-size: 14px;
    }

    @media (max-width: 1500px) {
      font-size: 9px;
    }

    @media (max-width: 1200px) {
      font-size: 8px;
    }

    @media (max-width: 900px) {
      font-size: 7px;
    }

    @media (max-width: 600px) {
      font-size: 6px;
    }
  }
`;
