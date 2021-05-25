import {Test, TestingModule} from '@nestjs/testing'
import * as request from 'supertest'
import {HttpStatus, INestApplication} from '@nestjs/common'
import {AppModule} from '../src/app.module'

describe('AppController (e2e)', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it('should be return _user', () => {
        return request(app.getHttpServer())
            .get(`/health`)
            .set('Authorization', 'sd')
            .expect(HttpStatus.OK)
    })

    it('should be throw not found exception', () => {
        return request(app.getHttpServer())
            .get(`/xdfgdf`)
            .set('Authorization', 'sd')
            .expect(HttpStatus.NOT_FOUND)
    })

    it('should be throw not found exception', () => {
        return request(app.getHttpServer())
            .get(`/xdfgdf`)
            .set('Authorization', 'sd')
            .expect(HttpStatus.NOT_FOUND)
    })

    afterAll(async () => {
        await app.close()
    })
})
