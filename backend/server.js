const express=require("express"); //importing
const app=express() //instance
app.listen(3001,function (){
    console.log("server running at http://localhost:3001")
})
//app.method("path",function)

let arr=[1,2,3,4]
app.get('/hello',function (req,res){
    res.send(arr);
})

app.post("/arr",function (req,res){
    const {username,password}=req.body;
    arr.push(username,password);
    res.send("user details stored")
})