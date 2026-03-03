const Transaction=require('../models/transactions.js')


// add transactions
exports.addTransaction= async(req,res)=>{
    try{
        const{type,amount,category,date,name,method,status}=req.body
        const transaction=await Transaction.create({
            user:req.user,
            type,
            amount,
            category,
            date,
            name,
            method,
            status
        })
        res.status(201).json(transaction)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}


// get transactions

exports.getTransaction= async(req,res)=>{
    try{
        const transactions=await Transaction.find({user:req.user}).sort({date:-1})
        res.json(transactions)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.deleteTransaction=async(req,res)=>{
    try{
        await Transaction.findByIdAndDelete(req.params.id)
        res.json({message:'Transaction Deleted'})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}