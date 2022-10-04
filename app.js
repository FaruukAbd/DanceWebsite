const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const port=8080;
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DanceContact',{useNewUrlParser:true},{useUnifiedTopology:true});

const CntctSchema={
    name: String,
    email:String,
    number:String,
    gender:String,
    age:String,
};



const datas=mongoose.model('contact',CntctSchema);


app.use('/static',express.static('static'));

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
});

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
});

// app.post('/contact',(req,res)=>{
//     // var mydatas=new datas(req.body);
//     var mydatas= new datas({
//         name:req.body.name,
//         email:req.body.email,
//         number:req.body.number,
//         gender:req.body.gender,
//         age:req.body.age
//     })
    
// mydatas.save().then(()=>{
//         res.send('this item has been saved to the database');
//     }).catch(()=>{
//         res.status(404).send('item has  not been saved to the database');
//     })

// });

app.post('/contact',function(req,res){
    let mydatas= new datas({
        name:req.body.name,
        email:req.body.email,
        number:req.body.number,
        gender:req.body.gender,
        age:req.body.age
    });
    mydatas.save();
    res.redirect('/contact');

    
})




app.get('/about',(req,res)=>{
    res.status(200).render('about.pug');
});

app.listen(port,()=>{
   console.log(`the server has been started on the port ${port}`);
});