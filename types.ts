//used the same structure learned during discussion 7
export type UrlProp = {
    alias: string;
    url: string;
};

//ok: true -> the URL was saved, and we get back the alias to build the short link
//ok: false -> something failed (invalid URL or alias taken) and we get an error message to display
export type CreateUrlResult =
    | {ok: true; alias: string;}
    | {ok: false; error: string;};