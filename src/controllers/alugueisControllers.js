import dayjs from "dayjs"
import { db } from "../database/database.js"

export async function getAlugueis(req, res) {
    try {
        const result = await db.query(`select rentals.*, games.name as "gameName",customers.name as "clientName" FROM rentals join customers on
        rentals."customerId"=customers.id join games on rentals."gameId"=games.id;`)

        const finalRes = result.rows.map(i => ({
            ...i,
            customer: {
                id: i.customerId,
                name: i.clientName
            },
            game: {
                id: i.gameId,
                name: i.gameName
            }
        }))
        return res.status(200).send(finalRes)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postAlugueis(req, res) {
    const { customerId, gameId, daysRented } = req.body
    try {
        const existeCliente = await db.query(`select * from customers where id=$1;`, [customerId])
        if (existeCliente.rows[0].length == 0) return res.sendStatus(400)

        const jogo = await db.query(`select * from games where id=$1;`, [gameId])
        if (jogo.rows[0].length == 0) return res.sendStatus(400)

        const originalPrice = daysRented * jogo.rows[0].pricePerDay

        const jogosDisp = await db.query(`select * from games;`)
        const estoque = jogosDisp.rows.map(i => i.stockTotal)
        let sum = estoque.reduce(function (a, b) {
            return a + b
        })
        const alugueis = await db.query(`select * from rentals;`)
        if (sum - alugueis.rows.length < 1) return res.sendStatus(400)

        await db.query(`insert into rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee")
        values($1,$2,$3,$4,$5,$6,$7);`, [customerId, gameId, dayjs().format('YYYY-MM-DD'), daysRented, null, originalPrice, null])

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postAluguelById(req, res) {
    const { id } = req.params
    try {
        const alugueis = await db.query(`select * from rentals where id=$1;`, [id])
        if (alugueis.rows.length === 0) return res.sendStatus(404)

        if (alugueis.rows[0].returnDate != null) return res.sendStatus(400)

        const game = await db.query(`select * from games where id=$1;`, [alugueis.rows[0].gameId])
        const now = dayjs().format('YYYY-MM-DD')

        const atraso = dayjs(alugueis.rows[0].rentDate).add(alugueis.rows[0].daysRented, "day")
        console.log(atraso)
        let delayFee
        if (dayjs(atraso).diff(now, 'day') < 0) {
            delayFee = dayjs(atraso).diff(now, 'day') * -game.rows[0].pricePerDay
        }else{
            delayFee=0
        }

        console.log(await db.query(`update rentals set "returnDate"=$1, "delayFee"=$2 where id=$3;`,[now, delayFee,id]))

        const newRent = await db.query(`update rentals set "returnDate"=$1, "delayFee"=$2 where id=$3;`,[now, delayFee,id])
        res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteAluguelById(req, res) {
    const { id } = req.params
    try {
        const alugueis = await db.query(`select * from rentals where id=$1;`, [id])
        if (alugueis.rows.length === 0) return res.sendStatus(404)

        if(alugueis.rows[0].returnDate===null) return res.sendStatus(400)

        await db.query("delete from rentals where id=$1;",[id])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}