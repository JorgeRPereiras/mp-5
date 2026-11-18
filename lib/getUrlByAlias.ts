import getCollection, {URL_COLLECTION} from "@/db";

//looks up an alias in MongoDB and returns the URL it points to, or null if the alias does not exist
//is in lib/ so the page does not query the database directly
export default async function getUrlByAlias(alias: string): Promise<string | null>{
    const collection = await getCollection(URL_COLLECTION);
    //findOne returns the matching document, or null if there is no match
    const doc = await collection.findOne({alias});
    //doc?.url -> the url if a document was found, otherwise undefined
    //"?? null" turns undefined into null so the return type stays string | null
    return doc?.url ?? null;
}