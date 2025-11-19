import { generateSecret } from '@colingreybosh/otp-lib';
import {ISecretGenerator} from "../contracts/ISecretGenerator";

export class SecretProvider implements ISecretGenerator{
    generate(): string {
        return generateSecret();
    }
}