import _ from 'lodash';
import shelljs, { ExecOptions, ShellString } from 'shelljs';
import winston, { format } from 'winston';

export enum ExitCode {
  OK = 0
}

const alignedWithColorsAndTime = format.combine(
  format.colorize({all: true}),
  format.timestamp(),
  format.align(),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
  format: alignedWithColorsAndTime,
  transports: [
    new winston.transports.Console(),
  ]
});

class SiigoShell {

  exec(command: string): ShellString;
  exec(command: string, options: ExecOptions): ShellString
  exec(command: string, options?: ExecOptions): ShellString {
    let shellString;

    if (_.isNil(options)) {
      shellString = shelljs.exec(command, { async: false, silent: true })
    } else {
      options.silent = !options.fatal
      shellString = shelljs.exec(command, { ...options, async: false })
    }

    const output = _.trim(_.isEmpty(shellString.stdout) ? shellString.stderr : shellString.stdout)
    const message = `[${command}]  ${output}`
    
    shellString.code === ExitCode.OK ? logger.info(message) : logger.warn(message)
    
    return shellString;
  }
}


const siigoShell: SiigoShell = new SiigoShell()
export default siigoShell

