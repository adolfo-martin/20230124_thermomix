import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

export default class ThermomixRestServer {

    static #instance;
    #port;
    #repository;
    #app;


    constructor(port, repository) {
        if (!ThermomixRestServer.#instance) {
            ThermomixRestServer.#instance = this;

            this.#port = port;
            this.#repository = repository;

            this.#app = new express();
            this.#app.use(cors());
            this.#configureRoutes();
        }

        return this;
    }


    listen() {
        this.#app.listen(this.#port, () =>
            console.log(`Thermomix server listening on port ${this.#port}`)
        );
    }


    #configureRoutes() {
        this.#app.get('/api/books', this.#validateTokenMiddleware.bind(this), this.#retrieveAndSendBooks.bind(this));
        this.#app.get('/api/dishes', this.#validateTokenMiddleware.bind(this), this.#retrieveAndSendDishes.bind(this));
        this.#app.get('/api/book/:bookId/dishes', this.#validateTokenMiddleware.bind(this), this.#retrieveAndSendDishesByBookId.bind(this));
        this.#app.get('/api/dish/:dishId', this.#validateTokenMiddleware.bind(this), this.#retrieveAndSendDishById.bind(this));
        this.#app.get('/api/recipes', this.#validateTokenMiddleware.bind(this), this.#retrieveAndSendRecipes.bind(this));
        this.#app.get('/api/book/:bookId/recipes', this.#validateTokenMiddleware.bind(this), this.#retrieveAndSendRecipesByBookId.bind(this));
        this.#app.get('/api/recipe/:recipeId', this.#validateTokenMiddleware.bind(this), this.#retrieveAndSendRecipeById.bind(this));
        this.#app.get('*', this.#validateTokenMiddleware.bind(this), this.#sendPleaseUseOurApi.bind(this));
    }


    #sendPleaseUseOurApi(req, res) {
        setTimeout(async () => {
            res.status(404).json({ ok: false, message: 'Please, use our API.' });
        }, 1000);
    }


    async #retrieveAndSendBooks(req, res) {
        setTimeout(async () => {
            try {
                const books = await this.#repository.retrieveBooks();
                res.status(200).json({ ok: true, books });
            } catch (error) {
                res.status(400).json({ ok: false, message: error.message });
            }
        }, 1000);
    }


    async #retrieveAndSendDishes(req, res) {
        setTimeout(async () => {
            try {
                const dishes = await this.#repository.retrieveDishes();
                res.status(200).json({ ok: true, dishes });
            } catch (error) {
                res.status(400).json({ ok: false, message: error.message });
            }
        }, 1000);
    }


    async #retrieveAndSendDishesByBookId(req, res) {
        setTimeout(async () => {
            try {
                const bookId = req.params.bookId;
                if (!bookId) {
                    res.status(400).json({ ok: false, message: 'There is not book id.' });
                    return;
                }

                const dishes = await this.#repository.retrieveDishesByBookId(bookId);
                const dishesIds = dishes.map(({ id }) => id);
                res.status(200).json({ ok: true, dishes: dishesIds });
            } catch (error) {
                res.status(400).json({ ok: false, message: error.message });
            }
        }, 1000);
    }


    async #retrieveAndSendDishById(req, res) {
        setTimeout(async () => {
            try {
                const dishId = req.params.dishId;
                if (!dishId) {
                    res.status(400).json({ ok: false, message: 'There is not dish id.' });
                    return;
                }

                const dish = await this.#repository.retrieveDishById(dishId);
                res.status(200).json({ ok: true, dish });
            } catch (error) {
                res.status(400).json({ ok: false, message: error.message });
            }
        }, 1000);
    }


    async #retrieveAndSendRecipes(req, res) {
        setTimeout(async () => {
            try {
                const recipes = await this.#repository.retrieveRecipes();
                res.status(200).json({ ok: true, recipes });
            } catch (error) {
                res.status(400).json({ ok: false, message: error.message });
            }
        }, 1000);
    }


    async #retrieveAndSendRecipesByBookId(req, res) {
        setTimeout(async () => {
            try {
                const bookId = req.params.bookId;
                if (!bookId) {
                    res.status(400).json({ ok: false, message: 'There is not book id.' });
                    return;
                }

                const recipes = await this.#repository.retrieveRecipesByBookId(bookId);
                const recipesIds = recipes.map(({ id }) => id);
                res.status(200).json({ ok: true, recipes: recipesIds });
            } catch (error) {
                res.status(400).json({ ok: false, message: error.message });
            }
        }, 1000);
    }


    async #retrieveAndSendRecipeById(req, res) {
        setTimeout(async () => {
            try {
                const recipeId = req.params.recipeId;
                if (!recipeId) {
                    res.status(400).json({ ok: false, message: 'There is not recipe id.' });
                    return;
                }

                const recipe = await this.#repository.retrieveRecipeById(recipeId);
                res.status(200).json({ ok: true, recipe });
            } catch (error) {
                res.status(400).json({ ok: false, message: error.message });
            }
        }, 1000);
    }

    async #validateTokenMiddleware(req, res, next) {
        const token = getBearerToken(req);
        if (!token) {
            res.status(407)
                .json({ ok: false, message: 'There is no token.' });
            return;
        }

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET || 'a91a848960fd61cb6240d06679c2ba14bbb753502cce7c62093aed36ff6d3fa7704f60e6f89b6159e156a8b758bad943d220ae9484221532f7fb440478ec580a',
            (err, user) => {
                if (err) {
                    res.status(407)
                        .json({ ok: false, message: 'The access token is not valid.' });
                    return;
                }

                req.user = user;
                next();
            })

        function getBearerToken(req) {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            return token;
        }
    }
}