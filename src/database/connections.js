// import e from 'express'
import sql from 'mssql'

const dbSettings = {
    user: 'sa',
    password: 'Admin1234',
    server: 'localhost',
    database: 'ProyectoNóminaFinal',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings)
        return pool
    } catch (error) {
        console.error(error)
    }
}