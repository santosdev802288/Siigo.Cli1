import _ from 'lodash';
import shelljs, { ExecOptions, ShellString } from 'shelljs';
import winston, { format } from 'winston';

export enum ExitCode {
  OK = 0,
  FAIL = 1
}

const alignedWithColorsAndTime = format.combine(
  format.colorize({all: true}),
  format.timestamp(),
  format.align(),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
  level: 'info',
  format: alignedWithColorsAndTime,
  transports: [
    new winston.transports.Console(),
  ]
});

function _extractOutput(shellString: ShellString): string{
  return _.trim(_.isEmpty(shellString.stdout) ? shellString.stderr : shellString.stdout)
}

class SiigoShell {


  exec(command: string): ShellString;
  exec(command: string, options: ExecOptions): ShellString
  exec(command: string, options?: ExecOptions): ShellString {
    let shellString;

    if (options?.fatal || options?.silent) {
      logger.info(command)
    }

    if (_.isNil(options)) {
      shellString = shelljs.exec(command, { async: false, silent: true })
    } else {
      shellString = shelljs.exec(command, { ...options, async: false })
    }

    const output = _extractOutput(shellString)
    const message = `${command}  =>  ${output}`

    if (!options?.silent){
      shellString.code === ExitCode.OK ? logger.info(message) : logger.warn(message)
    }
    
    return shellString;
  }
}


const siigoShell: SiigoShell = new SiigoShell()
export default siigoShell

