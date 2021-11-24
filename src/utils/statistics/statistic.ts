import * as dotenv from 'dotenv'
import { Schema, model, connect, disconnect}   from 'mongoose'
import colors from 'colors';
import path  from 'path'

import { isTestEnv } from '../environment/node';
import {getAllParametersSiigo} from '../siigoFile';

dotenv.config({path: path.resolve(__dirname, '../environment/.env')})
const url: string = '' + process.env.URLMONGO

interface Statistic {
    user: string;
    option: string;
    createdAt?: Date;
}

const schema = new Schema<Statistic>({
  user: {type: String, required: true},
  option: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
})

export async function saveStatistic(option:string): Promise<void> {
  if (!isTestEnv()){
    const siigoParams = await getAllParametersSiigo();
    try {
      await connect(url)
    
      const statisticModel = model<Statistic>('statistics', schema)
      const stat = new statisticModel({
        user: siigoParams.user,
        option
      })
      await stat.save()
      await disconnect()
    } catch (error) {
      console.log(colors.yellow.italic(`\nNo se pueden enviar las estadísticas de uso. Puede continuar. \n${error}`))
    }
    
  }
}