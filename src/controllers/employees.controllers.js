import DB from '../DB/connection.js';

const getEmployees = async (req, res) => {
    const [employees] = await DB.query('SELECT * FROM employee');
    res.status(200).json({
        status: 'success',
        data: employees,
    });
}
const createEmployee = async (req, res) => {
    const { name, salary } = req.body;

    const [rows] = await DB.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary]);
    res.status(200).send({
        status: 'success',
        employee: {
            id: rows.insertId,
            name,
            salary,
        }
    });
}
const getEmployee = async (req, res) => {
    const { id } = req.params;

    const [employee] = await DB.query('SELECT * FROM employee WHERE id = ?', id);

    if(!employee.length) {
        return res.status(404).json({
            status: 'failed',
            message: `Employee with id: ${id} does not exist`,
        });
    }

    res.status(200).json({
        status: 'success',
        employee: employee[0],
    });
}
const updateEmployee = async (req, res) => {
    const { params: { id }, body: { name, salary } } = req;

    const [result] = await DB.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id]);

    if(!result.affectedRows) {
        return res.status(404).json({
            status: 'failed',
            message: `Employee with id: ${id} does not exist`,
        });
    }

    const [employee] = await DB.query('SELECT * FROM employee WHERE id = ?', id);

    res.status(200).json({
        status: 'success',
        employee: employee[0],
    });
}
const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    const [result] = await DB.query('DELETE FROM employee WHERE id = ?', id);
    if(!result.affectedRows) {
        return res.status(404).json({
            status: 'failed',
            message: `Employee with id: ${id} does not exist`,
        });
    }

    res.status(200).json({
        status: 'success',
        message: `Employee with id: ${id} was deleted successfully`,
    });
}


export {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
}