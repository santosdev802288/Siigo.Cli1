import * as dotenv from 'dotenv'
import { Schema, model, connect, disconnect}   from 'mongoose'
import path  from 'path'
import {getAllParametersSiigo} from '../siigoFile';

dotenv.config({path: path.resolve(__dirname, '../environment/.env')})
const url: string = '' + process.env.URLMONGO

interface statistic {
    user: string;
    option: string;
    createdAt: any;
}

export async function saveStatistic(option:string) {
    const siigoParams = await getAllParametersSiigo();
    await connect(url)
    const schema = new Schema<statistic>({
        user: {type: String, required: true},
        option: {type: String, required: true},
        createdAt: {type: Date, default: Date.now},
    })
    const statisticModel = model<statistic>('statistics', schema)
    const stat = new statisticModel({
        user: siigoParams.user,
        option
    })
    await stat.save()
    await disconnect()
}