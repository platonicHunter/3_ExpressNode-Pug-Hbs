const fs = require('fs');

function requestHandler(req, res) {
    // Log request details (optional)
    // console.log(req.method, req.url, req.headers);
    // process.exit(); // Exit the server

    // Routing Request
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>Send Message</title></head>");
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        );
        res.write("</html>");
        return res.end();
    }

    if (url === "/message" && method === "POST") {
        // Parsing Request Body
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk); // Log chunk data
        });

        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message = parsedBody.split("=")[1]; // Extract message

            fs.writeFile("message.txt", message, err => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "text/plain");
                    res.write("Internal Server Error");
                    return res.end();
                }

                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    }

    // Default response
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
    res.write("</html>");
    res.end();
}

// Export
module.exports.handler = requestHandler;
module.exports.sometxt = 'Text of Route';
// Alternatively:
// module.exports = {
//     handler: requestHandler,
//     someTxt: 'Text of Route',
// };
