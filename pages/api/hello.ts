// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { runInNewContext } from 'vm'
import response from "../../fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if(req.method != "GET")
  {res.status(404);return}
  const {date} = req.query;
  res.status(200).json({ ... (await response(typeof date == "string" ? date:date[0], process.env["apiKey"]))})
}
