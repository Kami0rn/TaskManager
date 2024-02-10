import { CardInterface } from "./Icard";
import { UserInterface } from "./Iuser";

export interface CommentInterface {
    ID?             : number;
    CommentText?    : string;
    EditDatetime?   : Date;
    //fk
    UserID?          :number;
	User?           :UserInterface;

	CardID?          :number;
	Card?           :CardInterface;
}