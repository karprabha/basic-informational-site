import http from "http";
import fs from "fs";

const PORT = 3000;

const contentTypes = {
    html: "text/html",
    plain: "text/plain",
    css: "text/css",
};

const sendErrorResponse = (res) => {
    const filePath = "./views/routes/404.html";
    sendFileResponse(res, filePath, contentTypes.html, 404);
};

const sendFileResponse = (res, filePath, contentType, statusCode = 200) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            if (statusCode === 404) {
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/plain");
                res.end("Not Found");
            } else {
                sendErrorResponse(res);
            }
        } else {
            res.statusCode = statusCode;
            res.setHeader("Content-Type", contentType);
            res.end(data);
        }
    });
};

const server = http.createServer((req, res) => {
    const reqURL = req.url;

    switch (reqURL) {
        case "/":
            sendFileResponse(res, "./views/index.html", "text/html");
            break;

        case "/about":
            sendFileResponse(res, "./views/routes/about.html", "text/html");
            break;
        case "/contact-me":
            sendFileResponse(
                res,
                "./views/routes/contact-me.html",
                "text/html"
            );
            break;
        case "/styles/style.css":
            sendFileResponse(res, "./styles/style.css", contentTypes.css);
            break;
        default:
            sendErrorResponse(res);
    }
});

server.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
