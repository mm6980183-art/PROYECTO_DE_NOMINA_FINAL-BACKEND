import { getConnection } from "../database/connections.js";
import sql from "mssql";

export const getUsers = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Colaboradores');
        res.json(result.recordset);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("idColaboradores", sql.Int, req.params.id)
            .query("SELECT * FROM Colaboradores WHERE idColaboradores = @idColaboradores");

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Colaborador no encontrado" });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ error: error.message });
    }
};
export const createUser = async (req, res) => {
    try {
        const { NombreCompleto, Cedula, Telefono, AreadeDesempeño, Cargo } = req.body;

        // Validar campos requeridos
        if (!NombreCompleto || !Cedula || !Telefono || !AreadeDesempeño || !Cargo) {
            return res.status(400).json({ 
                error: "Todos los campos son requeridos",
                campos_faltantes: {
                    NombreCompleto: !NombreCompleto,
                    Cedula: !Cedula,
                    Telefono: !Telefono,
                    AreadeDesempeño: !AreadeDesempeño,
                    Cargo: !Cargo
                }
            });
        }

        const pool = await getConnection();
        await pool.request()
            .input("NombreCompleto", sql.VarChar, NombreCompleto)
            .input("Cedula", sql.VarChar, Cedula)
            .input("Telefono", sql.VarChar, Telefono)
            .input("AreadeDesempeño", sql.VarChar, AreadeDesempeño)
            .input("Cargo", sql.VarChar, Cargo)
            .query(`
                INSERT INTO Colaboradores 
                (NombreCompleto, Cedula, Telefono, AreadeDesempeño, Cargo)
                VALUES (@NombreCompleto, @Cedula, @Telefono, @AreadeDesempeño, @Cargo)
            `);

        res.status(201).json({ message: "Usuario creado correctamente" });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: error.message });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { NombreCompleto, Cedula, Telefono, AreadeDesempeño, Cargo } = req.body;

        // Validar campos requeridos
        if (!NombreCompleto || !Cedula || !Telefono || !AreadeDesempeño || !Cargo) {
            return res.status(400).json({ 
                error: "Todos los campos son requeridos",
                campos_faltantes: {
                    NombreCompleto: !NombreCompleto,
                    Cedula: !Cedula,
                    Telefono: !Telefono,
                    AreadeDesempeño: !AreadeDesempeño,
                    Cargo: !Cargo
                }
            });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input("idColaboradores", sql.Int, req.params.id)
            .input("NombreCompleto", sql.VarChar, NombreCompleto)
            .input("Cedula", sql.VarChar, Cedula)
            .input("Telefono", sql.VarChar, Telefono)
            .input("AreadeDesempeño", sql.VarChar, AreadeDesempeño)
            .input("Cargo", sql.VarChar, Cargo)
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
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ error: error.message });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("idColaboradores", sql.Int, req.params.id)
            .query("DELETE FROM Colaboradores WHERE idColaboradores = @idColaboradores");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Colaborador no encontrado" });
        }

        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: error.message });
    }
};

