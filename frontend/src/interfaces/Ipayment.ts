import { PaymentStatusInterface } from "./IpaymentStatus";
import { PaymentTypeInterface } from "./IpaymentType";
import {UserInterface} from "./Iuser";

export interface PaymentInterface {
    ID?:            number;
    PaymentDate:    Date;
    TotalPrice?:    number;
    Note?:          string;
    MoneySlip?:     string;
    //fk
    UserID?: number;
    User?: UserInterface;
   
    PaymentStatusID?: number;
    PaymentStatus?: PaymentStatusInterface;
    
    PaymentTypeID?: number;
    PaymentType?: PaymentTypeInterface;
}
