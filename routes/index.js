

var User = require('../model/User');
module.exports = function (app) {
    app.get('/',function (req,res) {
        var page = parseInt(req.query.page) || 1;
        User.getAll(null,page,function(err,docs,total){
            if(err){
                req.flash('error',err);
                return res.redirect('/');
            }
            res.render('index',{
                title:'首页',
                page:page,
                isFirstPage:(page - 1) * 3 == 0,
                isLastPage:(page - 1) * 3 + docs.length == total,
                success:req.flash('success').toString(),
                error:req.flash('error').toString(),
                docs:docs
            })
        })
    });
    app.post('/',function(req,res){
        var account = req.body.account;
        var username = req.body.username;
        var age = req.body.age;
        var gender = req.body.gender == 'true' ? '男' : '女';
        var phone = req.body.phone;
        var email = req.body.email;
        var createTime = new Date();
        var newUser = new User({
            account:account,
            username:username,
            age:age,
            gender:gender,
            phone:phone,
            email:email,
            createTime:createTime
        });
        User.get(newUser.account,function(err,user){
            if(err){
                req.flash('error',err);
                return res.redirect('/');
            }
            if(user){
                req.flash('error','用户名已存在');
                return res.redirect('/');
            }
            newUser.save(function(err,user){
                if(err){
                    req.flash('error',err);
                    return res.redirect('/');
                }
                req.session.user = newUser;
                req.flash('success','注册成功');
                return res.redirect('/');
            })
        })
    });
    // 删除
    app.get('/delete/:account',function(req,res){
        User.delete(req.params.account,function(err){
            if(err){
                req.flash('error',err);
                return res.redirect('/');
            }
            req.flash('success','删除成功');
            return res.redirect('/');
        })
    });
    //修改界面
    app.get('/update/:account', function (req, res) {
        User.edit(req.params.account, function (err, doc) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            return res.render('update', {
                title: '编辑页面',
                success: req.flash('success').toString(),
                error: req.flash('error').toString(),
                doc: doc
            })
        })
    });
//修改行为
app.post('/update/:account',function(req,res){
    User.geiwogai(req.params.account,req.body.username,req.body.phone,req.body.email,function(err,doc){
        if(err){
            req.flash('error',err);
            return res.redirect('/');
        }
        req.flash('success','修改成功');
        return res.redirect('/');
    })
});
    //搜索
    app.get('/search',function(req,res){
        var page = parseInt(req.query.page) || 1;
        User.search(req.query.keyword,page,function(err,docs,total){
            if(err){
                req.flash('error',err);
                return res.redirect('/');
            }
            return res.render('index',{
                title:'搜索结果',
                page:page,
                isFirstPage:(page - 1) * 3 == 0,
                isLastPage:(page - 1) * 3 + docs.length == total,
                success:req.flash('success').toString(),
                error:req.flash('error').toString(),
                docs:docs
            })
        })
    })
};