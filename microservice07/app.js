const mongoose = require('mongoose')
const express = require('express')
const ATL = require('./models/ATL_model')
const AGPT = require('./models/AGPT_model')
const FF = require('./models/FF_model')

const fs = require("fs");
const { parse } = require('csv-parse')



const app = express()
app.set('view engine', 'ejs');

app.use(express.static("public"))

const check =require("./utils/checkAuthenticated")
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser());


//change
const dbURI = 'mongodb+srv://User:IvfkezJoPM1JuCDC@saasproject.rqtkq.mongodb.net/ATL?retryWrites=true&w=majority'





mongoose.connect(dbURI)
    .then((result) => {
        app.listen(7007)
    })
    .catch((err) => console.log(err))


app.get('/',check.authenticated,(req,res)=>{

    // update the data of atl
    fs.createReadStream("./csv_files/new_atl.csv")
    .pipe(parse({ delimiter: "\t", from_line: 2 }))
    .on("data", function (row) {
        ATL.findOne({
            DateTime: row[0],
            ResolutionCode: row[1],
            AreaCode: row[2],
            AreaTypeCode: row[3],
            AreaName: row[4],
            MapCode: row[5],
            TotalLoadValue: row[6],
            UpdateTime: row[7]
        },

            function (err, data) {
                if (err) return handleError(err);
                if (data == null) {
                    const atl = new ATL({
                        _id: new mongoose.Types.ObjectId(),
                        DateTime: row[0],
                        ResolutionCode: row[1],
                        AreaCode: row[2],
                        AreaTypeCode: row[3],
                        AreaName: row[4],
                        MapCode: row[5],
                        TotalLoadValue: row[6],
                        UpdateTime: row[7]
                    })
                    atl.save()
                }
            })
    })
    // update the data of agpt

    fs.createReadStream("./csv_files/new_agpt.csv")
    .pipe(parse({ delimiter: "\t", from_line: 2 }))
    .on("data", function (row) {
        let generation = 0.0
        if (row[7] != '') {
            let generation = row[7]
        }
        let cons = 0.0
        if (row[8] != '') {
            let cons = row[8]
        }
        AGPT.findOne({
            DateTime: row[0],
            ResolutionCode: row[1],
            AreaCode: row[2],
            AreaTypeCode: row[3],
            AreaName: row[4],
            MapCode: row[5],
            ProductionType: row[6],
            ActualGenerationOutput: generation,
            ActualConsumption: cons,
            UpdateTime: row[9]
        },
            function (err, data) {
                if (err) return handleError(err);
                if (data == null) {
                    const agpt = new AGPT({
                        _id: new mongoose.Types.ObjectId(),
                        DateTime: row[0],
                        ResolutionCode: row[1],
                        AreaCode: row[2],
                        AreaTypeCode: row[3],
                        AreaName: row[4],
                        MapCode: row[5],
                        ProductionType: row[6],
                        ActualGenerationOutput: generation,
                        ActualConsumption: cons,
                        UpdateTime: row[9],
                    })
                    agpt.save()
                }
            })
    })
    // update the data of ff

    fs.createReadStream("./csv_files/new_ff.csv")
    .pipe(parse({ delimiter: "\t", from_line: 2 }))
    .on("data", function (row) {
        FF.findOne({
            DateTime: row[0],
            ResolutionCode: row[1],
            OutAreaCode: row[2],
            OutAreaTypeCode: row[3],
            OutAreaName: row[4],
            OutMapCode: row[5],
            InAreaCode: row[6],
            InAreaTypeCode: row[7],
            InAreaName: row[8],
            InMapCode: row[9],
            FlowValue: row[10],
            UpdateTime: row[11]
        },
            function (err, data) {
                if (err) return handleError(err);
                if (data == null) {
                    const ff = new FF({
                        _id: new mongoose.Types.ObjectId(),
                        DateTime: row[0],
                        ResolutionCode: row[1],
                        OutAreaCode: row[2],
                        OutAreaTypeCode: row[3],
                        OutAreaName: row[4],
                        OutMapCode: row[5],
                        InAreaCode: row[6],
                        InAreaTypeCode: row[7],
                        InAreaName: row[8],
                        InMapCode: row[9],
                        FlowValue: row[10],
                        UpdateTime: row[11]
                    })
                    ff.save()
                }
            })
    })
    res.redirect("/microservice03/")


})




