import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');

    *{
        padding: 0px;
        margin: 0px;
        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
        font-family: 'Inter', sans-serif;
    }

    body{
        background-color: aquamarine;
    }
`;

export default GlobalStyle;