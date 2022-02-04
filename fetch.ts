import fetch from "node-fetch";

const response = async (date?:string|undefined, api_key?:string|undefined):Promise<object> => {
    const data = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}${date !== undefined && date.match(/^\d{4}-\d{2}-\d{2}$/gm) ? `&date=${date}` : `&count=1`}`,{
        method:"GET"
    });
    if(!data.ok||data.status!=200)
    {return {error:data.statusText}}
    return {result:(await data.json()) as object};
};

export default response;