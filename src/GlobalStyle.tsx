import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #191b1e;
    color: #f9f9fa;
    font-family: 'Inter', Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  input, button {
    font-family: inherit;
  }
`;
