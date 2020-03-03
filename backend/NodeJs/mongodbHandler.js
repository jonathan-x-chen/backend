const mongodb = require("mongodb");
const mongodbClient = mongodb.MongoClient;
const url = "mongodb+srv://jonathanChen:4547300chen@cluster0-eunbq.mongodb.net/test?retryWrites=true&w=majority";

function insertAnUser(user,resp){
    mongodbClient.connect(url, {useNewUrlParser:true},function(err,db){
        if(err) throw err;
        else{
            var database = db.db("AppDev");
            database.collection("UsersDev").find({"email":user.email}).toArray(function(err,res){
                if(err) throw err;
                if(res.length != 0){
                    resp.send("Email Exists");
                }
                else{
                    database.collection("UsersDev").insertOne(user,function(err,res){
                        if(err) throw err;
                        else{
                            console.log("sign up")
                            setTimeout(function(){
                                resp.redirect("/login");
                            },5000)
                        }
                        db.close();
                    });   
                }
            })
            
        }
    });
}

function getAllUser(resp){
    mongodbClient.connect(url, {useNewUrlParser:true},function(err,db){
        if(err){
            console.log("Fail to connect to db");
        }
        else{
            var database = db.db("AppDev");
            database.collection("UsersDev").find({}).toArray(function(err,res){
                resp.json(res)
            });
            db.close();
        }
    })
}
mongoService = {
    insertAnUser : insertAnUser,
    getAllUser : getAllUser
}
module.exports = mongoService;