export interface IQrCodeGenerator {
    generate(uri:string):Promise<string>;
}