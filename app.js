var express = require('express');
var app = express();
var unirest = require("unirest");
var convert = require('xml-js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.get('/', function (req, res) {
    let date = req.query.date;
    if (date === undefined) {
        res.status(500);
        return res.json({ message: 'Parameter date undefined' });
    }
    else if (!isValidDate(date)) {
        res.status(500);
        return res.json({ message: 'Date format invalid' });
    }
    else {
        let req = unirest("POST", "https://www.superfinanciera.gov.co/SuperfinancieraWebServiceTRM/TCRMServicesWebService/TCRMServicesWebService");

        req.query({
            "wsdl": ""
        });

        req.send(`<Envelope xmlns=\"http://schemas.xmlsoap.org/soap/envelope/\">
                    <Body>
                        <queryTCRM xmlns=\"http://action.trm.services.generic.action.superfinanciera.nexura.sc.com.co/\">
                        <tcrmQueryAssociatedDate xmlns=\"\">${date}</tcrmQueryAssociatedDate>
                        </queryTCRM>
                    </Body>
                </Envelope>`);

        req.end(function (response) {
            if (response.error) {
                res.status(500);
                return res.json({ message: 'Server error' });
            } else {
                let result = JSON.parse(convert.xml2json(response.body, { compact: true }));
                return res.json({
                    "data": {
                        "unit": result["soap:Envelope"]["soap:Body"]["ns2:queryTCRMResponse"]["return"]["unit"]["_text"],
                        "validityFrom": new Date(result["soap:Envelope"]["soap:Body"]["ns2:queryTCRMResponse"]["return"]["validityFrom"]["_text"]),
                        "validityTo": new Date(result["soap:Envelope"]["soap:Body"]["ns2:queryTCRMResponse"]["return"]["validityTo"]["_text"]),
                        "value": JSON.parse(result["soap:Envelope"]["soap:Body"]["ns2:queryTCRMResponse"]["return"]["value"]["_text"]),
                        "success": JSON.parse(result["soap:Envelope"]["soap:Body"]["ns2:queryTCRMResponse"]["return"]["success"]["_text"]),
                    },
                    "web": "www.makaw.dev"
                });
            }
        });
    }
});

app.listen(3000, function () {
    console.log('Run on port 3000!');
});

function isValidDate(dateString) {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regEx) != null;
}
