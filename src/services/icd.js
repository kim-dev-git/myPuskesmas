const https = require("https");

const client_id = process.env.VUE_APP_ICD_CLIENT_ID;
const client_secret = process.env.VUE_APP_ICD_CLIENT_SECRET;
const scope = "icdapi_access";
const grant_type = "client_credentials";
let token;

function getToken() {

  // http header fields to set
  const Authorization = `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString("base64").toString("utf-8")}`;
  const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization
  };

  // http options
  const options = {
      hostname: "icdaccessmanagement.who.int",
      port: 443,
      path: "/connect/token",
      method: "POST",
      headers
  };
  const data = `grant_type=${grant_type}&scope=${scope}`;

  // make request
  return new Promise((resolve, reject) => {
      let req = https.request(options, res => {
          let data = "";

          res.on("data", chunck => {
              data += chunck;
          });

          res.on("end", () => {
              resolve(JSON.parse(data.toString()).access_token);
          });
      });

      req.on("error", error => {
          console.error("ERR", error);
          reject(error);
      });
        
      req.write(data, "utf-8");
      req.end();
  });
}

function get(id) {

  // http header fields to set
  const headers = {
      "Authorization": `Bearer ${token}`, 
      "Accept": "application/json", 
      "Accept-Language": "en",
      "API-Version": "v2"
  };

  // http options
  const options = {
      hostname: "id.who.int",
      port: 443,
      path: `/icd/entity/${id}`,
      method: "GET",
      headers
  };

  // make request
  return new Promise((resolve, reject) => {
      let req = https.request(options, res => {
          let data = "";

          res.on("data", chunck => {
              data += chunck;
          });

          res.on("end", () => {
              resolve(JSON.parse(data.toString()));
          });
      });

      req.on("error", error => {
          console.error("ERR", error);
          reject(error);
      });
        
      req.end();
  });
}

async function searchByName(term) {

  // query
  let res = await get(encodeURI(`search?q=${term}`));
  let results = res.destinationEntities;
  let first = results[0];
  if (!first) {
    return { status: 'error' }
  }
  let id = first.id.match(/\d+/)[0];

  // get first result
  return await get(id);
}

export async function search(keyword) {
  token = await getToken();
  let res = await searchByName(keyword);
  return res
}

// // async code
// (async () => {

//   // get the oauth2 token
//   token = await getToken();

//   // access ICD API
//   // let res = await get("2114593305");

//   // search for a term
//   // let tb = await search("tuberculosis");
//   let tb = await searchByName("Pseudomembranous");

//   // print results
//   // console.log(res);
//   console.log(tb);
// })();