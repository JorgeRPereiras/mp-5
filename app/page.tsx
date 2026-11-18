import UrlShortenerForm from "@/components/UrlShortenerForm";
import styled from "styled-components";

const StyledHeader = styled.header`
    /*90% width of <body>*/
    width: 90%;
    /*vertical margin of (0) and horizontal margin in (auto)*/
    margin: 0 auto;
    /*font in form of [font-style] [font-variant] [font-weight] [font-size] [font-family]*/
    font: normal small-caps bold calc(2px + 1.5vw) verdana, arial, helvetica, sans-serif;
    /*padding to the left of header and footer*/
    padding-left: 3%;
    background-color: #323232;
    color: #14FFEC;
`;

export default function Home(){
    return(
        <>
            <StyledHeader>
                <h1>CS303 Url Shortener</h1>
            </StyledHeader>
            <main>
                <UrlShortenerForm />
            </main>
        </>
    );
}