import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'

const app = express();

// Habilitar CORS para el frontend en http://localhost:5173
app.use(cors({
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(userRoutes);

export default app