var express = require('express');
var app = express();
var unirest = require("unirest");

app.get('/', function (req, res) {
    let date = req.query.date;
    if(date === undefined){
        res.status(500);
        return res.json({ message: 'Parameter date undefined' });
    }
    else if (!isValidDate(date)){
        res.status(500);
        return res.json({ message: 'Date format invalid' });
    }
    else{
        var req = unirest("POST", "https://www.superfinanciera.gov.co/SuperfinancieraWebServiceTRM/TCRMServicesWebService/TCRMServicesWebService");

        req.query({
            "wsdl": ""
        });

        req.headers({
            "Postman-Token": "fa29ace2-e105-4449-93bd-533f1d330cee",
            "Cache-Control": "no-cache"
        });

        req.send("<Envelope xmlns=\"http://schemas.xmlsoap.org/soap/envelope/\">\n    <Body>\n        <queryTCRM xmlns=\"http://action.trm.services.generic.action.superfinanciera.nexura.sc.com.co/\">\n            <tcrmQueryAssociatedDate xmlns=\"\">2019-05-29</tcrmQueryAssociatedDate>\n        </queryTCRM>\n    </Body>\n</Envelope>");

        req.end(function (res) {
            if(res.error){
                return res.json({ message: 'bad' });
            }else{
                console.log(res.body);

                return res.json({ message: 'ok' });
            }

            
        });
        
       /* let callback = (error, response, body) => {
            if (!error && response.status == 200) {
                console.log('Raw result', body);
                var xml2js = require('xml2js');
                var parser = new xml2js.Parser({ explicitArray: false, trim: true });
                parser.parseString(body, (err, result) => {
                    console.log('JSON result', result);
                });
            };
            console.log(error);
            //console.log('E', response, response.statusMessage);
        };*/
        //console.log(request(options, callback));
        //return res.json({ message: 'ok' });
    }
    console.log(date);
    //res.status(400);
    //res.json({ a: 1 });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regEx) != null;
}