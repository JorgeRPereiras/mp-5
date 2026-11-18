import {notFound, redirect} from "next/navigation";
import getUrlByAlias from "@/lib/getUrlByAlias";

//dynamic route
export default async function AliasPage({params,} : {
    params: Promise<{alias: string}>;
}){
    //the alias from the URL path
    const {alias} = await params;
    //look up the alias in MongoDB (null if it does not exist)
    const url = await getUrlByAlias(alias);

    if(!url) notFound();
    //send the visitor to the original URL
    redirect(url);
}