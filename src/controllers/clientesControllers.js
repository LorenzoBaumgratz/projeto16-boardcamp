import { db } from "../database/database.js"

export async function getCliente(req,res){
    try{
        
        const clientes=await db.query(`select * from customers;`)
        res.send(clientes.rows.map(i=>({
            ...i,
            birthday:i.birthday.toISOString().split("T")[0]
        })))
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function getClienteById(req,res){
    const {id}=req.params
    try{
        const cliente=await db.query(`select * from customers where id=$1;`,[id])
        if(!cliente.rows[0]) return res.sendStatus(404)

        res.send({
            ...cliente.rows[0],
            birthday:cliente.rows[0].birthday.toISOString().split("T")[0]
        })
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function putClienteById(req,res){
    const {id}=req.params
    const {name,phone,cpf,birthday}=req.body
    try{
        const cliente=await db.query(`select * from customers where id=$1;`,[id])
        if(!cliente) return res.sendStatus(404)
        const existeCpf1=await db.query(`select * from customers where id=$1 and cpf=$2;`,[id,cpf])
        const existeCpf2=await db.query(`select * from customers where cpf=$1;`,[cpf])

        if(existeCpf1.rows.length===0 && existeCpf2.rows.length===1) return res.sendStatus(409)

        const clientePut=await db.query(`update customers set name=$1,phone=$2,cpf=$3,birthday=$4 where id=$5;`,[name,phone,cpf,birthday.split("T"),id])
        res.sendStatus(200)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function postCliente(req,res){
    const {name,phone,cpf,birthday}=req.body
    try{
        const existeCpf=await db.query(`select * from customers where cpf=$1;`,[cpf])
        if(existeCpf.rows.length!==0) return res.sendStatus(409)
        
        await db.query(`insert into customers (name,phone,cpf,birthday) values($1,$2,$3,$4);`,[name,phone,cpf,birthday.split("T")])
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}