"use client";
//"use client" because this component uses (useState)
import styled from "styled-components";

const PageWrapper = styled.div`
    background-color: #212121;
    /*90% width*/
    width: 90%;
    /*vertical margin of (0) and horizontal margin in (auto)*/
    margin: 0 auto;
    /*font in form of [font-style] [font-variant] [font-weight] [font-size] [font-family]*/
    font: normal small-caps bold calc(2px + 2vw) verdana, arial, helvetica, sans-serif;
    /*No white spaces at the bottom*/
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const StyledInput = styled.input`
    border: solid #0D7377 8px;
    /*centers the text inside*/
    text-align: center;
    /*font in form of [font-style] [font-variant] [font-weight] [font-size] [font-family]*/
    font: normal small-caps bold calc(2px + 2vw) verdana, arial, helvetica, sans-serif;
    background-color: #323232;
    color: #FFFFFF;
    width: 50%;
    box-sizing: border-box;
    margin-bottom: 1%;
`;

const StyledButton = styled.button`
    border: solid #14FFEC 8px;
    /*centers the text inside*/
    text-align: center;
    /*font in form of [font-style] [font-variant] [font-weight] [font-size] [font-family]*/
    font: normal small-caps bold calc(2px + 2vw) verdana, arial, helvetica, sans-serif;
    background-color: #0D7377;
    color: #212121;
    width: 50%;
    box-sizing: border-box;
    cursor: pointer;
`;

const StyledShortUrlBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
`;

const StyledCopyButton = styled(StyledButton)`
    margin-left: 5%;
`;

const StyledError = styled.p`
    color: red;
    margin-top: 2%;
    text-align: center;
`;

import {useState} from "react";
import createNewUrl from "@/lib/createNewUrl";


export default function UrlShortenerForm(){
    //values typed into the two inputs
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    //error message from the server action ("" means no error)
    const [error, setError] = useState("");
    //the full short link, shown after creation
    const [shortUrl, setShortUrl] = useState("");
    //whether the copy button was clicked, to show "Copied!"
    const [copied, setCopied] = useState(false);

    //runs when the form is submitted, sends the data to the server action
    async function handleSubmit(e: React.FormEvent){
        //stops the browser from reloading the page
        e.preventDefault();
        //clear results from any previous attempt
        setError("");
        setShortUrl("");
        setCopied(false);

        const result = await createNewUrl(url, alias);
        if(result.ok){
            //build the short link from the current domain, so it works locally and when deployed
            setShortUrl(`${window.location.origin}/${result.alias}`);
        } else {
            setError(result.error);
        }
    }

    //copies the short link to the clipboard
    async function handleCopy(){
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
    }

    return(
        <PageWrapper>
            <StyledForm onSubmit={handleSubmit}>
                <StyledInput
                    placeholder="https://example.com/very/long/link"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />

                <StyledInput
                    placeholder="custom-alias"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    required
                />

                <StyledButton type="submit">
                    Shorten
                </StyledButton>
            </StyledForm>

            {/* only rendered when there is an error message */}
            {error && <StyledError>{error}</StyledError>}

            {/* only rendered after a link was created */}
            {shortUrl && (
                <StyledShortUrlBox>
                    <a href={shortUrl}>
                        {shortUrl}
                    </a>
                    <StyledCopyButton onClick={handleCopy}>
                        {copied ? "Copied!" : "Copy"}
                    </StyledCopyButton>
                </StyledShortUrlBox>
            )}
        </PageWrapper>
    );
}