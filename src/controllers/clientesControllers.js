import { db } from "../database/database.js"

export async function getCliente(req,res){
    try{
        const clientes=await db.query(`select * from customers;`)
        res.send(clientes.rows)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function getClienteById(req,res){
    const {id}=req.params
    try{
        const cliente=await db.query(`select * from customers where id=$1;`,[id])
        if(!cliente.rows[0]) return res.sendStatus(404)

        res.send(cliente.rows[0])
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function putClienteById(req,res){
    const {id}=req.params
    try{
        const cliente=await db.query(`select * from customers where id=$1;`,[id])
        if(!cliente) return res.sendStatus(404)

        const existeCpf=await db.query(`select * from customers where cpf=$1;`,[cpf])
        if(existeCpf.rows.length>0) return res.sendStatus(409)

        const clientePut=await db.query(`update customers set name=$1,phone=$2,cpf=$3,birthday=$4 where id=$5;`,[name,phone,cpf,birthday,id])
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

        await db.query(`insert into customers (name,phone,cpf,birthday) values($1,$2,$3,$4);`,[name,phone,cpf,birthday])
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}