import ApiClient from "../ApiClient";

class MallaApiClient extends ApiClient {}

const mallaAPI = new MallaApiClient('https://malla.tnmesh.org/api');
export default mallaAPI;