import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background-image: url("/img/background7000.svg");
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    font-family: sans-serif;
  }

  body {
  font-family: "Mulish", sans-serif;
}



code {
  font-family: "Recursive", monospace;
}

`;
