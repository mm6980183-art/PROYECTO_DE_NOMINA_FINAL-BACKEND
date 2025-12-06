import { getConnection } from "../database/connections.js";
import sql from "mssql";

export const getUsers = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Colaboradores');
    res.json(result.recordset);
};

export const getUser = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("idColaboradores", sql.Int, req.params.id)
        .query("SELECT * FROM Colaboradores WHERE idColaboradores = @idColaboradores");

    if (result.recordset.length === 0) {
        return res.status(404).json({ message: "Colaborador no encontrado" });
    }

    res.json(result.recordset[0]);
};
export const createUser = async (req, res) => {
    const pool = await getConnection();
    await pool.request()
        .input("NombreCompleto", sql.VarChar, req.body.NombreCompleto)
        .input("Cedula", sql.VarChar, req.body.Cedula)
        .input("Telefono", sql.VarChar, req.body.Telefono)
        .input("AreadeDesempeño", sql.VarChar, req.body.AreadeDesempeño)
        .input("Cargo", sql.VarChar, req.body.Cargo)
        .query(`
            INSERT INTO Colaboradores 
            (NombreCompleto, Cedula, Telefono, AreadeDesempeño, Cargo)
            VALUES (@NombreCompleto, @Cedula, @Telefono, @AreadeDesempeño, @Cargo)
        `);

    res.json({ message: "Usuario creado correctamente" });
};
export const updateUser = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("idColaboradores", sql.Int, req.params.id)
        .input("NombreCompleto", sql.VarChar, req.body.NombreCompleto)
        .input("Cedula", sql.VarChar, req.body.Cedula)
        .input("Telefono", sql.VarChar, req.body.Telefono)
        .input("AreadeDesempeño", sql.VarChar, req.body.AreadeDesempeño)
        .input("Cargo", sql.VarChar, req.body.Cargo)
        .query(`
            UPDATE Colaboradores
            SET NombreCompleto = @NombreCompleto,
                Cedula = @Cedula,
                Telefono = @Telefono,
                AreadeDesempeño = @AreadeDesempeño,
                Cargo = @Cargo
            WHERE idColaboradores = @idColaboradores
        `);

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Colaborador no encontrado" });
    }

    res.json({ message: "Usuario actualizado correctamente" });
};
export const deleteUser = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("idColaboradores", sql.Int, req.params.id)
        .query("DELETE FROM Colaboradores WHERE idColaboradores = @idColaboradores");

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Colaborador no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente" });
};

