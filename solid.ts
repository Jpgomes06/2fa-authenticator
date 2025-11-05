interface IPaymentMethod {
    valid(): boolean;
    pay(): void;
}

interface IWithdrawMethod {
    valid(): boolean;
    withdraw(): boolean;
}

class Bank{
    public processPayment(method:IPaymentMethod){
       if (method.valid()){
           method.pay();
           return true
       }
    }
}

class Withdraw {
    public withdraw(method:IWithdrawMethod){
        if (method.valid()){
            method.withdraw();
        }
    }
}

class DigitalBank extends Withdraw{

}

type Method = {
    type: string;
    barCode: string;
    cvv: string;
};

class BadBank {
    public processPayment(method:Method){
        if(method.type == 'boleto') {
            method.barCode = '0001';
        } else if(method.type == 'cartaodeCredito') {
            method.cvv = '123';
        }
    }
}

class BoletoPayment {
    public valid():boolean{
        return true
    }
    public pay():void{
    }
}

class CardPayment {
    public valid():boolean{
        return false
    }
    public pay():void{
        return
    }
    public sacar():void{

    }
}

class PixPayment {
    public valid():boolean{
        //50 linhas de codigo
        return false
    }
    public pay():void{
        return
    }
}

const bank = new Bank();
const boleto = new BoletoPayment();
const cartao = new CardPayment();
const pix = new PixPayment();
bank.processPayment(boleto);

