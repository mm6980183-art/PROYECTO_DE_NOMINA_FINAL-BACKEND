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

// Middleware para JSON con manejo de encoding UTF-8
app.use(express.json({ 
	limit: '10mb',
	strict: false 
}));

// Middleware para manejo de errores de JSON
app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		console.error('Error de JSON:', err.message);
		return res.status(400).json({ 
			error: 'JSON inválido',
			detalles: err.message
		});
	}
	next();
});

app.use(userRoutes);

export default app