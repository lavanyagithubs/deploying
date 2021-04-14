const exp=require("express");
const webpush=require("web-push");
const cors=require("cors");
const { promise } = require("selenium-webdriver");
const remApiObj=exp.Router();
remApiObj.use(exp.json());
remApiObj.use(cors());
const publicKey="BEvbLxOBvw5R8186WKA1juNrl6I-MLKR3cYOB51QGcFJiX9aWJfEb5CTT7FILn1RUUmXZ85cj5Opl9Nw1Xe_A2M"; 
const privateKey="4CKsf7yTB867RmM2RklwZYNOpo2EEEBf0YWRBP4GSE0";
remApiObj.post("/subs",(req,res)=>{
    let sub =req.body;
    webpush.setVapidDetails(
        'mailto:lavanyagandabani1213@gmail.com',
        publicKey,
        privateKey
    )
    let payload=JSON.stringify({
        Notification:{
            "title":"lavanya",
            "body":"this is first notification"

        }
    });
    setInterval(()=>{
        promise.resolve(webpush.sendNotification(sub,payload))
        .then(()=>res.json({
            message:"notification sent"
        }))
        .catch((err)=>{
            console.log("err in noti",err)
        })
    },5000)
})
const getNotesByRemainderTime = () => {
    return new Promise((resolve, reject) => {
      noteModel.aggregate([{
        $project: {
          id: 1,
          title: 1,
          text: 1,
          subscription: 1,
          "yearRemainder1": {
            "$year": { "$subtract": ["$remainder1", (5.5) * 60 * 60 * 1000] }
          },
          "monthRemainder1": {
            "$month": { "$subtract": ["$remainder1", (5.5) * 60 * 60 * 1000] }
          },
          "dayRemainder1": {
            "$dayOfMonth": { "$subtract": ["$remainder1", (5.5) * 60 * 60 * 1000] }
          },
          "hourRemainder1": {
            "$hour": { "$subtract": ["$remainder1", (5.5) * 60 * 60 * 1000] }
          },
          "minutesRemainder1": {
            "$minute": { "$subtract": ["$remainder1", (5.5) * 60 * 60 * 1000] }
          },
          "yearRemainder2": {
            "$year": { "$subtract": ["$remainder2", (5.5) * 60 * 60 * 1000] }
          },
          "monthRemainder2": {
            "$month": { "$subtract": ["$remainder2", (5.5) * 60 * 60 * 1000] }
          },
          "dayRemainder2": {
            "$dayOfMonth": { "$subtract": ["$remainder2", (5.5) * 60 * 60 * 1000] }
          },
          "hourRemainder2": {
            "$hour": { "$subtract": ["$remainder2", (5.5) * 60 * 60 * 1000] }
          },
          "minutesRemainder2": {
            "$minute": { "$subtract": ["$remainder2", (5.5) * 60 * 60 * 1000] }
          },
          "remainder": {
            $cond: {
              'if': {
                $eq: [
                  { "$minute": { "$subtract": ["$remainder1", (5.5) * 60 * 60 * 1000] } }, new Date().getMinutes()
                ]
              }, then: '$remainder1',
              else: '$remainder2'
            }
          },
          "remainder1": {
            $cond: {
              'if': {
                $eq: [
                  { "$minute": { "$subtract": ["$remainder1", (5.5) * 60 * 60 * 1000] } }, { "$minute": { "$subtract": ["$remainder2", (5.5) * 60 * 60 * 1000] } }
                ]
              }, then: false,
              'else': {
                $cond: {
                  'if': {
                    $eq: [
                      { "$minute": { "$subtract": ["$remainder2", (5.5) * 60 * 60 * 1000] } }, new Date().getMinutes()
                    ]
                  }, then: false,
                  else: true
                }
              }
            }
          }
        }
      },
      {
        $match: {
          $and: [
            { $or: [{ yearRemainder1: new Date().getFullYear() }, { yearRemainder2: new Date().getFullYear() }] },
            { $or: [{ monthRemainder1: new Date().getMonth() + 1 }, { monthRemainder2: new Date().getMonth() + 1 }] },
            { $or: [{ dayRemainder1: new Date().getDate() }, { dayRemainder2: new Date().getDate() }] },
            { $or: [{ hourRemainder1: new Date().getHours() }, { hourRemainder2: new Date().getHours() }] },
            { $or: [{ minutesRemainder1: new Date().getMinutes() }, { minutesRemainder2: new Date().getMinutes() }] },
          ]
        }
      }
      ]).exec((err, notes) => {
        if (err) {
          reject({ message: 'Internal Server Error', status: 500 });
        } else {
          resolve({ note: notes, status: 200 });
        }
      })
    });
  }








module.exports=remApiObj;