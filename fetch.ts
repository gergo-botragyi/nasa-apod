import fetch from "node-fetch";

const API_KEY = "XaqDXc4hfpi7n215Gn3Shi99eftlo81HT1Kq1VWO";

const response = async (date?:string|undefined):Promise<object> => {
    const data = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${date !== undefined && date.match(/^\d{4}-\d{2}-\d{2}$/gm) ? `&date=${date}` : `&count=1`}`,{
        method:"GET"
    });
    console.log(data);
    if(!data.ok||data.status!=200)
    {return {error:data.statusText}}
    return {result:(await data.json()) as object};
};

export default response;