
import { PrismaClient } from "./generated/prisma/client";
import logger from "./Logger";


class MeshDB {
    client: PrismaClient;

    constructor() {
        this.client = new PrismaClient();
    }

    async init() {
        return this.client.$connect
    }
}

const meshDB = new MeshDB();
export default meshDB;