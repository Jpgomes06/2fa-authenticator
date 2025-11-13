import {Request, Response} from "express";

export interface ICreateTotpController {
    handle(req: Request, res: Response): Promise<Response>
}