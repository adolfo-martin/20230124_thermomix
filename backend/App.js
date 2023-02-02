import ThermomixMariadbRepository from './repositories/ThermomixMariadbRepository.js';
import ThermomixRestServer from './restservers/ThermomixRestServer.js';

const repository = new ThermomixMariadbRepository();
const server = new ThermomixRestServer(8082, repository);
server.listen();