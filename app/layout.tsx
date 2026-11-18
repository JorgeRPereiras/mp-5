import React from "react";

export default function RootLayout(
    {children,}:
        Readonly<{children: React.ReactNode;}>
){
    return(
        <html lang="en">
            <head>
                <style>{`
                    *{
                    margin: 0;
                    box-sizing: border-box;
                }
                `}</style>
                <title>CS303 | MP5</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}