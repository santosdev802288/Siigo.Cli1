import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {LoggerService} from '@siigo/core'
import {ValidationPipe} from '@nestjs/common'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function boot() {
    const app = await NestFactory.create(AppModule)
    const contextPath = process.env.CONTEXT_PATH || 'api'
    const defaultPort = 5005
    const port = process.env.PORT || defaultPort

    app
        .setGlobalPrefix(contextPath)
        .useGlobalPipes(new ValidationPipe())
        .useLogger(app.get(LoggerService))

    app.enableCors()

    const document = SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
            .setTitle('api')
            .setDescription('The API description')
            .setVersion('1.0')
            .setBasePath(contextPath)
            .build(),
    )
    SwaggerModule.setup(contextPath, app, document)
    await app.listen(port)
}

boot()
