import { MessageModel } from "./Message";
import { UserModel } from "./User";

export interface ConversationModel {
	id: string;
	name: string;
	last_message: MessageModel;
	other_user: UserModel;
}
