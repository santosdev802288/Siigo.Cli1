import { check, sleep } from 'k6';
import grpc from 'k6/net/grpc';
import { IConfig } from '../../config/config';


const client = new grpc.Client();

client.load(['definitions'], 'example.proto');

export class GRPCExample {

    public constructor(
        public readonly config: IConfig
    ) {}

    /**
     * 
     * @param id 
     */
    public exampleGetId(id: number) {
        client.connect(this.config.gRPCUrl, {
            plaintext: true, // true for non SSL/TLS connections
            timeout: 3000 // 3 seconds
        });


        const data = { id: id };

        const response = client.invoke('example.Example/ExampleGetId', data);


        check(response, {
            'status is OK': (r) => r && r.status === grpc.StatusOK,
            'id is present': (r) => (response.message as unknown as Record<string, any>).message.endsWith(String(id)),
        });

        client.close();

        sleep(1);
    }

};