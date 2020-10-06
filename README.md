# 🚀 API Rest TRM Colombia

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This api returns the value of a dollar on a certain date, this information is obtained from the Web Service that the Financial Superintendence of Colombia has developed, which can be verified on this link:
See [SOAP - Web Service](https://www.superfinanciera.gov.co/SuperfinancieraWebServiceTRM/TCRMServicesWebService/TCRMServicesWebService?WSDL)


# How work?
Only pass the date in format **YYY-MM-DD** to URL
```sh
https://trm-colombia.vercel.app/?date=2018-12-31
```
and return a JSON object:
```json
{
    "data":{
        "unit":"COP",
        "validityFrom":"2019-02-02T05:00:00.000Z",
        "validityTo":"2019-02-04T05:00:00.000Z",
        "value":3102.61,
        "success":true
    },
    "dev":"Jonhatan Fajardo",
    "web":"www.makaw.dev"
}
```

License
----

MIT


### Developed by [Makaw Dev](http://makaw.dev) 

