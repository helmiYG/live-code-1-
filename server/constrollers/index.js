const User = require('../model/user')
const Item = require('../model/item');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


module.exports = {
    register:(req, res) =>{
        const {username, password } = req.body
        let hash = bcrypt.hashSync(password, salt);
        User.create({
            username : username,
            password : hash 
        })
        .then((result) => {
            res.status(201).json({
                succes: true,
                message : `Acount ${result.username} registered `
            })
        })
        .catch((err) => {
            res.send(err)
        });
    },
    login: (req, res) =>{
        const {username, password } = req.body
        User.findOne({username : username})
        .then((user) => {
            let result =  bcrypt.compareSync(password, user.password);
            if(result === true){
                let token = jwt.sign({
                    id : user._id,
                    username : username,
                },'secret-key')
                res.status(201).json({
                    token
                })
            }else{
                console.log('u / p wrong');
                
            }
        })
        .catch((err) => {
            console.log(err);
            
        });
        
    },

    addItem: (req, res) =>{
        const {name, price, stock, tags} = req.body
        let input = []
        tags.forEach(tag => {
            input.push(tag.value)
        });
        let decode = jwt.verify(req.params.token, 'secret-key')
        if(decode){
            Item.create({
                name : name,
                price : price,
                stock : stock,
                tags : input,
                user : decode.id
            })
            .then((result) => {
               res.status(201).json({
                   result
               })
            })
            .catch((err) => {
                res.status(400).json({
                    err
                })
            });
        }else{
            res.status(400).json({
                err : 'you are not authorized to acces tih api'
            })
        }
    },
    searchByName: (req, res) =>{
        
        Item.find({name : req.params.name})
        
        .then((result) => {
            console.log(result);
            res.status(200).json({
                result
            })
        })
        .catch((err) => {
            res.status(500)
        });
    },
    searchByPrice: (req, res) =>{
    
        Item.find({price : {$gte : req.params.price}})
        .then((result) => {
            res.status(200).json({
                result
            })
        })
        .catch((err) => {
            res.status(500)
        });
    },
    search: (req, res) =>{
        Item.find({})
        .then((result) => {
            res.status(200).json({
                result
            })
        })
        .catch((err) => {
            res.status(500)
        });
    }
}