export default class HardwareshopService {
    async retrieveSockets(token) {
        const url = 'http://127.0.0.1:8082/api/sockets';

        // Comprueba si el servidor está encendido
        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const method = 'get';

            response = await fetch(url, { method, headers });
        } catch (error) {
            throw new Error(`Cannot retrieve sockets: ${error.message}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve sockets: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve sockets: ${error.message}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve sockets: ${data.message}`);
        }

        return data.sockets;
    }


    async retrieveProcessors(token) {
        const url = 'http://127.0.0.1:8082/api/processors';

        // Comprueba si el servidor está encendido
        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const method = 'get';

            response = await fetch(url, { method, headers });
        } catch (error) {
            throw new Error(`Cannot retrieve sockets: ${error.message}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve sockets: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve sockets: ${error.message}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve sockets: ${data.message}`);
        }

        return data.processors;
    }


    async retrieveProcessorByUuid(processorUuid, token) {
        const url = `http://127.0.0.1:8082/api/processor/${processorUuid}`;

        // Comprueba si el servidor está encendido
        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const method = 'get';

            response = await fetch(url, { method, headers });
        } catch (error) {
            throw new Error(`Cannot retrieve processor: ${error.message}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve processor: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve processor: ${error.message}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve sockets: ${data.message}`);
        }

        return data.processor;
    }


    async retrieveProcessorsBySocketUuid(socketUuid, token) {
        const url = `http://127.0.0.1:8082/api/socket/${socketUuid}/processors`;

        // Comprueba si el servidor está encendido
        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const method = 'get';

            response = await fetch(url, { method, headers });
        } catch (error) {
            throw new Error(`Cannot retrieve sockets: ${error.message}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve sockets: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve sockets: ${error.message}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve sockets: ${data.message}`);
        }

        return data.processors;
    }


    async retrieveMotherboardByUuid(motherboardUuid, token) {
        const url = `http://127.0.0.1:8082/api/motherboard/${motherboardUuid}`;

        // Comprueba si el servidor está encendido
        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const method = 'get';

            response = await fetch(url, { method, headers });
        } catch (error) {
            throw new Error(`Cannot retrieve motherboard: ${error.message}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve motherboard: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve motherboard: ${error.message}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve sockets: ${data.message}`);
        }

        return data.motherboard;
    }


    async retrieveMotherboardsBySocketUuid(socketUuid, token) {
        const url = `http://127.0.0.1:8082/api/socket/${socketUuid}/motherboards`;

        // Comprueba si el servidor está encendido
        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const method = 'get';

            response = await fetch(url, { method, headers });
        } catch (error) {
            throw new Error(`Cannot retrieve sockets: ${error.message}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve sockets: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve sockets: ${error.message}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve sockets: ${data.message}`);
        }

        return data.motherboards;
    }
}