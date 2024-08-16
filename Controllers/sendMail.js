const nodemailer = require("nodemailer")

const sendMail =(req,res)=>{
    
var mailer = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'panchaldeepak49@gmail.com',
        pass : 'rhyp pybh oiqf jvio'
    }
});

var mailDetail = {
    from : 'panchaldeepak49@gmail.com',
    // to : 'panchaldeepak535@gmail.com',
    to : req.body.email,
    subject : req.body.subject,
    text : req.body.message
}

mailer.sendMail(mailDetail,function(error,result){
    if(error) throw error
    //console.log("email send")
})
  res.send("done")
}

// const sendMail =async(req,res)=>{
    //let testAccount = await nodemailer.createTestAccount();

    // const transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, 
    //     auth: {
    //         user: 'dina.bashirian90@ethereal.email',
    //         pass: '3Tvx5uUAMqKkYWKr1e'
    //     }
    //   });
    

    //   let info = await transporter.sendMail({
    //     from: '"Deepak 👻" <panchaldeepak49@gmail.com>', // sender address
    // to: "panchaldeepak535@gmail.com", // list of receivers
    // subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    // html: "<b>Hello world?</b>", // html body
    //   })

    //console.log(info.messageId)
    //res.json(Info)
    // res.send('I am sending mail')
 //}


 module.exports = { sendMail }