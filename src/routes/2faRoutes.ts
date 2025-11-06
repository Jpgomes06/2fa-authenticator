import express from 'express';
import {ICreateTotpController} from "../contracts/ICreateTotpController";

export function createTotpAccountRouter(controller:ICreateTotpController) {
    const router = express.Router();
    router.post('/', (request, response) =>{
        return controller.handle(request,response)
    });
    return router;
}
