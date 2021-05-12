import { Test, TestingModule } from '@nestjs/testing'
import { <%= config.nameUpper %> } from '../domain/<%= config.name %>'
import { I<%= config.nameUpper %>Service } from '../domain/interface/i<%= config.nameUpper %>-service'
import { <%= config.nameUpper %>ServiceToken } from '../constans'
import { <%= config.nameUpper %>Controller } from '../<%= config.nameUpper %>.controller'
import { <%= config.nameUpper %>Mock } from './mock'

describe('<%= config.nameUpper %> Controller', () => {
    let <%= config.name %>Controller: <%= config.nameUpper %>Controller
    let <%= config.name %>Service

    const service: Partial<I<%= config.nameUpper %>Service<<%= config.nameUpper %>>> = {}

    afterEach(() => jest.clearAllMocks())

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [<%= config.nameUpper %>Controller],
            providers: [
                {
                    provide: <%= config.nameUpper %>ServiceToken,
                    useValue: service,
                },
            ],
            imports: [],
        }).compile()

        <%= config.name %>Controller = module.get<<%= config.nameUpper %>Controller>(<%= config.nameUpper %>Controller)
        <%= config.name %>Service = module.get<I<%= config.nameUpper %>Service<<%= config.nameUpper %>>>(<%= config.nameUpper %>ServiceToken)
    })

    it('should be defined', () => {
        expect(<%= config.name %>Controller).toBeDefined()
        expect(<%= config.name %>Service).toBeDefined()
    })

})
