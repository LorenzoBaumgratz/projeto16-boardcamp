import { db } from "../database/database.js"

export async function getJogos(req,res){
    try {
        const jogos=await db.query(`select * from games;`)
        res.send(jogos.rows)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function postJogos(req,res){
    const {name,image,stockTotal,pricePerDay}=req.body
    try {
        const existeJogo=await db.query(`select * from games where name=$1;`,[name])
        if(existeJogo.rows.length!=0) return res.sendStatus(409)

        await db.query(`insert into games (name,image,"stockTotal","pricePerDay") values ($1,$2,$3,$4);`,[name,image,stockTotal,pricePerDay])
        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}