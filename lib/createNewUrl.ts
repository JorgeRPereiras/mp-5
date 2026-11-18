"use server";
//runs only on the server, so the Mongo connection string never reaches the browser

import getCollection, {URL_COLLECTION} from "@/db";
import {CreateUrlResult} from "@/types";

//only letters, numbers, hyphens, and underscores are permitted
const ALIAS_PATTERN = /^[a-zA-Z0-9_-]+$/;

//returns true only if the value is a correct http or https URL with a domain
function isValidUrl(value : string): boolean{
    try{
        //the URL constructor throws if the string is not a valid URL
        const parsed = new URL(value);
        return(
            //only allow http or https, and require a dot in the hostname so for example "http://hello" is rejected
            (parsed.protocol === "http:" || parsed.protocol === "https:") && parsed.hostname.includes(".")
        );
    } catch {
        return false;
    }
}

//validates the input and saves the alias/url pair in MongoDB.
//returns a CreateUrlResult so the form can show either the new alias or an error message
export default async function createNewUrl(
    url: string,
    alias: string,
): Promise<CreateUrlResult> {
    //remove accidental spaces before validating
    url = url.trim();
    alias = alias.trim();

    //backend validation
    if(!isValidUrl(url)){
        return {ok: false, error: "Please enter a valid URL."};
    }
    if(!ALIAS_PATTERN.test(alias)){
        return {ok: false, error: "Alias can only contain letters, numbers, -, and _."};
    }

    try {
        const collection = await getCollection(URL_COLLECTION);
        //unique index on alias
        await collection.createIndex({alias: 1}, {unique: true});
        await collection.insertOne({alias, url});
        return {ok: true, alias};
    } catch (err: unknown) {
        //11000 is MongoDB's duplicate key error code, meaning the alias already exists
        if((err as {code?: number}).code === 11000){
            return {ok: false, error: "That alias is already taken. Try another one."};
        }
        //any other failure (connection problem, etc) gets this message
        return {ok: false, error: "Something went wrong. Try again."};
    }
}