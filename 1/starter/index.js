const fs = require("fs");
const http = require("http");
const url = require("url");

// const name = "sohil";
// console.log(name);

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn)

// const textOut = `This is it is ${textIn}. \nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log("file written")

// this is synchronous code which only run only once when the server starts
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8",
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8",
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8",
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // console.log(req.url);
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    const cardHmtl = dataObj.map((el) => replaceTemplate(templtaeCard, el));
    res.end(tempOverview);
  } else if (pathName === "/login") {
    res.end("Login Page");
  } else if (pathName === "/product") {
    res.end("Product Page");
  } else if (pathName === "/api") {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    //   res.writeHead(200, {
    //     "content-type": "application/json",
    //   });
    //   res.end(data);
    // });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404);
    res.end("404 Page Not Found");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server is listening on port 8000");
});
