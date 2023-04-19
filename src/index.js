import express  from 'express';

import employeesRoutes from './routes/employees.routes.js';

const app = express();

app.use(express.json());

app.use(employeesRoutes)

app.listen(3000);
