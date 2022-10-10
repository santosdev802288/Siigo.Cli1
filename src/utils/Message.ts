
export class Message {
    private error: boolean;
    private type: string;
    private message: string
    constructor(error: boolean,  type: string, message: string ){
        this.error = error
        this.type = type
        this.message= message
    }

    toString(){
        return JSON.stringify(this)
    }
}
