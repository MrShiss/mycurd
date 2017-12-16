
var mongodb = require('./db');

function User(user){
    this.account = user.account;
    this.username = user.username;
    this.age = user.age;
    this.gender = user.gender;
    this.phone = user.phone;
    this.email = user.email;
    this.createTime = user.createTime;
}
User.prototype.save = function(callback){
    var user = {
        account:this.account,
        username:this.username,
        age:this.age,
        gender:this.gender,
        phone:this.phone,
        email:this.email,
        createTime:this.createTime
    };
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('hiuser',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.insert(user,{safe:true},function(err,user){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,user);
            })
        })
    })
};
User.get = function(account,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('hiuser',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({account:account},function(err,user){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                return callback(null,user);
            });
        })
    })
};
//获取所有
User.getAll = function(account,page,callback){
    var skipPage = (page - 1) * 3;
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('hiuser',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.count(function (err,total) {
                if(err){
                    mongodb.close();
                    return callback();
                }
                collection.find().skip(skipPage).limit(3).sort({time:-1}).toArray(function(err,docs){
                    mongodb.close();
                    if(err){
                        return callback(err);
                    }
                    return callback(null,docs,total);
                })
            })
        })
    })
};
//删除页面
User.delete = function(account,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('hiuser',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.remove({
                account:account
            },{
                w:1
            },function(err){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                return callback(null);
            })
        })
    })
};
//编辑
User.edit = function(account,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('hiuser',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({
                account:account
            },function(err,doc){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                console.log(doc);
                return callback(null,doc);
            })
        })
    })
};
User.geiwogai = function(account,username,phone,email,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('hiuser',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.update({
                account:account
            },{
                $set:{
                    username:username,
                    phone:phone,
                    email:email
                }
            },function(err,doc){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                return callback(null,doc);
            })
        })
    })
};
// 搜索
User.search = function(keyword,page,callback){
    var skipPage = (page - 1) * 3;
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('hiuser',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            var newRegex = new RegExp(keyword,"i");
            collection.count({account:newRegex},function (err,total) {
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                collection.find({
                    account:newRegex
                }).skip(skipPage).limit(3).sort({time:-1}).toArray(function(err,docs){
                    mongodb.close();
                    if(err){
                        return callback(err);
                    }
                    console.log(total);
                    console.log(docs);
                    return callback(null,docs,total);
                })
            })
        })
    })
}
module.exports = User;



