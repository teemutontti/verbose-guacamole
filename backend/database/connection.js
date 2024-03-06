require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

const connectionFunctions = {
    findAll() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM foods";
            pool.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                    return;
                } else {
                    if (results.length === 0) {
                        reject({
                            code: 204,
                            message: "No foods in the database",
                        });
                        return;
                    }
                    resolve(results);
                }
            });
        });
    },
    save(food) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO foods (name, calories, carbohydrates, fats, proteins, barcode) VALUES (?, ?, ?, ?, ?)";

            if (!food.name || !food.calories || !food.carbohydrates || !food.fats || !food.proteins) {
                reject({ code: 400, message: "Values can't be empty" });
                return;
            }

            const foodList = [food.name, food.calories, food.carbohydrates, food.fats, food.proteins, food.barcode];
            pool.query(sql, foodList, (err, res) => {
                err ? reject({ code: 500, message: err }) : resolve(res);
            });
        });
    },
    update(id, food) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE foods SET name = ?, calories = ?," + "carbohydrates = ?, fats = ?, proteins = ?";
            if (!food.name || !food.calories || !food.carbohydrates || !food.fats || !food.proteins) {
                reject({ code: 400, message: "Values can't be empty" });
                return;
            }

            pool.query(sql, food, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                } else if (res.affectedRows === 0) {
                    reject({
                        code: 404,
                        message: `There's no data with the id of ${id} in the` + `database`,
                    });
                    return;
                }
                resolve(res);
                return;
            });
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM foods WHERE id = ?";
            pool.query(sql, id, (err, res) => {
                err ? reject({ code: 500, message: err }) : resolve(res);
            });
        });
    },
};

module.exports = connectionFunctions;
