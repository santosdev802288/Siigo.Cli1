export enum ServerType {
  CQRS_COMMAND = 'command',
  CQRS_QUERY = 'query',
  CQRS = 'command+query',
  FULL = 'full',
  GRPC = 'grpc-server',
  GRPC_CLIENT = 'grpc-client',
  KAFKA = 'kafka',
  KAFKA_MONGO = 'kafka-mongo',
  KAFKA_SQL = 'kafka-sql',
  REST = 'basic',
}