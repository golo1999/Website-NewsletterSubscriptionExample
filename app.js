const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const path=require("path").dirname(require.main.filename);
const port=3000 || process.env.PORT;
const request=require("request");

app.use("/assets", express.static(__dirname+'/assets'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) =>
{
    res.sendFile(path+"/index.html");
});

app.post("/", (req, res) =>
{
    const {name, email}=req.body;
    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: name
                }
            }
        ]
    };
    const options={
        url: "https://us1.api.mailchimp.com/3.0/lists/fa4b7e97c0",
        method: "POST",
        headers: {
            Authorization: "golo 1ec52c9b1de52e76fdebbc23e084df88-us1"
        },
        body: JSON.stringify(data)
    };

    request(options, (error, response, body) =>
    {
        if(error || response.statusCode!==200)
            res.sendFile(path+"/fail.html");
        else res.sendFile(path+"/success.html");
    });
});

app.post("/success", (req, res)=>{res.redirect("/")});

app.listen(port);

// mailchimp api key
// 1ec52c9b1de52e76fdebbc23e084df88-us1

// mailchimp list id
// fa4b7e97c0