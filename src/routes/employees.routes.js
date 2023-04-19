import { Router } from 'express';
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employees.controllers.js';

const router = Router();

router.route('/employees').get(getEmployees).post(createEmployee);
router.route('/employees/:id').get(getEmployee).patch(updateEmployee).delete(deleteEmployee);

export default router;
