const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html");
    res.write("<head><title>Enter Messge</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button>click<button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsebody = Buffer.concat(body).toString();
      const message = parsebody.split("=")[1];
      fs.writeFileSync("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("loaction", "/");
        return res.end;
      });
      //   console.log(parsebody);
      //   fs.writeFileSync("message.txt", "dummy");
      //   res.statusCode = 302;
      //   res.setHeader("loaction", "/");
      //   return res.end;
    });
  }

  res.setHeader("Content-type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from my node.js server</h1></body>");
  res.write("</html>");
  res.end();
};

// module.exports = requestHandler;

module.exports = {
  handler: requestHandler,
  sometext: "some data",
};

module.exports.handler = requestHandler;
module.exports.sometext = "some hard coded text";
