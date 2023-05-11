import dayjs from "dayjs"
import { db } from "../database/database.js"

export async function getAlugueis(req,res){
    try{
        
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function postAlugueis(req,res){
    const {customerId,gameId,daysRented}=req.body
    try{
        const existeCliente=await db.query(`select * from customers where id=$1;`,[customerId])
        if(existeCliente.rows[0].length==0) return res.sendStatus(400)

        const jogo=await db.query(`select * from games where id=$1;`,[gameId])
        if(jogo.rows[0].length==0) return res.sendStatus(400)

        const originalPrice=daysRented*jogo.rows[0].pricePerDay

        const jogosDisp=await db.query(`select * from games;`)
        const estoque=jogosDisp.rows.map(i=>i.stockTotal)
        let sum=estoque.reduce(function(a,b){
            return a+b
        })
        const alugueis=await db.query(`select * from rentals;`)
        if(sum-alugueis.rows.length<1) return  res.sendStatus(400)

        await db.query(`insert into rentals (customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee)
        values($1,$2,${dayjs('YYYY-MM-DD')},$3,null,$4,null);`,[customerId,gameId,daysRented,originalPrice])
        
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}