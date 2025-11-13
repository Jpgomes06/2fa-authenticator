import {IUuidGenerator} from "../contracts/IUuidGenerator";
import { v4 as uuidv4} from 'uuid';

export class UuidProvider implements IUuidGenerator{
    generate(): string {
        return uuidv4();
    }
}