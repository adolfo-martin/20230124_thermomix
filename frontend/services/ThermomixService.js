export default class ThermomixService {
    async retrieveBooks(token) {
        const url = 'http://127.0.0.1:8082/api/books';

        // Comprueba si el servidor está encendido
        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const method = 'get';

            response = await fetch(url, { method, headers });
        } catch (error) {
            throw new Error(`Cannot retrieve books: ${error.message}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve books: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve books: ${error.message}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve books: ${data.message}`);
        }

        return data.books;
    }


    async retrieveDishes(token) {
        const url = 'http://127.0.0.1:8082/api/dishes';

        // Comprueba si el servidor está encendido
        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const method = 'get';

            response = await fetch(url, { method, headers });
        } catch (error) {
            throw new Error(`Cannot retrieve books: ${error.message}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve books: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve books: ${error.message}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve books: ${data.message}`);
        }

        return data.dishes;
    }


    async retrieveDishById(dishId, token) {
        const url = `http://127.0.0.1:8082/api/dish/${dishId}`;

        // Comprueba si el servidor está encendido
        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const method = 'get';

            response = await fetch(url, { method, headers });
        } catch (error) {
            throw new Error(`Cannot retrieve dish: ${error.message}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve dish: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve dish: ${error.message}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve books: ${data.message}`);
        }

        return data.dish;
    }


    async retrieveDishesByBookId(bookId, token) {
        const url = `http://127.0.0.1:8082/api/book/${bookId}/dishes`;

        // Comprueba si el servidor está encendido
        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const method = 'get';

            response = await fetch(url, { method, headers });
        } catch (error) {
            throw new Error(`Cannot retrieve books: ${error.message}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve books: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve books: ${error.message}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve books: ${data.message}`);
        }

        return data.dishes;
    }


    async retrieveRecipeById(recipeId, token) {
        const url = `http://127.0.0.1:8082/api/recipe/${recipeId}`;

        // Comprueba si el servidor está encendido
        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const method = 'get';

            response = await fetch(url, { method, headers });
        } catch (error) {
            throw new Error(`Cannot retrieve recipe: ${error.message}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve recipe: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve recipe: ${error.message}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve books: ${data.message}`);
        }

        return data.recipe;
    }


    async retrieveRecipesByBookId(bookId, token) {
        const url = `http://127.0.0.1:8082/api/book/${bookId}/recipes`;

        // Comprueba si el servidor está encendido
        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const method = 'get';

            response = await fetch(url, { method, headers });
        } catch (error) {
            throw new Error(`Cannot retrieve books: ${error.message}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve books: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve books: ${error.message}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve books: ${data.message}`);
        }

        return data.recipes;
    }
}