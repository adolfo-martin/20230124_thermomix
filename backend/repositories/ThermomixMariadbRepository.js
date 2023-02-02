import mariadb from 'mariadb';

export default class ThermomixMariadbRepository {

    static #pool = ThermomixMariadbRepository.#initializeConnection();


    static #initializeConnection() {
        try {
            const pool = mariadb.createPool({
                host: '10.0.0.2',
                user: 'thermomix',
                password: 'Hola1234',
                database: 'thermomix',
                connectionLimit: 5
            });

            return pool;
        } catch (error) {
            throw error;
        }
    }


    // const res = await connection.query('INSERT INTO myTable value (?, ?)', [1, 'mariadb']);
    // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

    async retrieveBooks() {
        try {
            var connection = await ThermomixMariadbRepository.#pool.getConnection();
            const records = await connection.query('select * from books order by id');
            delete records.meta;
            return records;
        } catch (error) {
            throw error;
        } finally {
            if (connection) connection.end();
        }
    }


    async retrieveDishes() {
        try {
            var connection = await ThermomixMariadbRepository.#pool.getConnection();
            const records = await connection.query('select * from dishes order by id');
            delete records.meta;
            return records;
        } catch (error) {
            throw error;
        } finally {
            if (connection) connection.end();
        }
    }


    async retrieveDishById(dishId) {
        try {
            var connection = await ThermomixMariadbRepository.#pool.getConnection();
            const records = await connection.query(`select * from dishes where id = "${dishId}"`);
            delete records.meta;
            return records[0];
        } catch (error) {
            throw error;
        } finally {
            if (connection) connection.end();
        }
    }


    async retrieveDishesByBookId(bookId) {
        try {
            var connection = await ThermomixMariadbRepository.#pool.getConnection();
            const records = await connection.query(`select * from dishes where book_id = "${bookId}" order by id`);
            delete records.meta;
            return records;
        } catch (error) {
            throw error;
        } finally {
            if (connection) connection.end();
        }
    }


    async retrieveRecipes() {
        try {
            var connection = await ThermomixMariadbRepository.#pool.getConnection();
            const records = await connection.query('select * from recipes order by id');
            delete records.meta;
            return records;
        } catch (error) {
            throw error;
        } finally {
            if (connection) connection.end();
        }
    }


    async retrieveRecipeById(recipeId) {
        try {
            var connection = await ThermomixMariadbRepository.#pool.getConnection();
            const records = await connection.query(`select * from recipes where id = "${recipeId}"`);
            delete records.meta;
            return records[0];
        } catch (error) {
            throw error;
        } finally {
            if (connection) connection.end();
        }
    }


    async retrieveRecipesByBookId(bookId) {
        try {
            var connection = await ThermomixMariadbRepository.#pool.getConnection();
            const records = await connection.query(`select * from recipes where book_id = "${bookId}" order by id`);
            delete records.meta;
            return records;
        } catch (error) {
            throw error;
        } finally {
            if (connection) connection.end();
        }
    }
}