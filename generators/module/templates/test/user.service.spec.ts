import { Test, TestingModule } from '@nestjs/testing'
import { <%= config.nameUpper %>Service } from '../<%= config.name %>.service'
import { <%= config.nameUpper %>RepositoryToken } from '../constans'
import { <%= config.nameUpper %>Repository } from '../<%= config.name %>.repository'
import { <%= config.nameUpper %> } from '../domain/<%= config.name %>'
import { <%= config.nameUpper %>Mock } from './mock'
import { I<%= config.nameUpper %>Repository } from '../domain/interface/i<%= config.name %>-repository'

describe('<%= config.nameUpper %>Service', () => {
    let service: <%= config.nameUpper %>Service
    let repository: <%= config.nameUpper %>Repository

    const repoMock: Partial<I<%= config.nameUpper %>Repository<<%= config.nameUpper %>>> = {}

    afterEach(() => jest.clearAllMocks())

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: <%= config.nameUpper %>RepositoryToken,
                    useValue: repoMock,
                },
                <%= config.nameUpper %>Service,
            ],
            imports: [],
        }).compile()

        service = module.get<<%= config.nameUpper %>Service>(<%= config.nameUpper %>Service)
        repository = module.get<<%= config.nameUpper %>Repository>(<%= config.nameUpper %>RepositoryToken)
    })

    it('should be service defined', () => {
        expect(service).toBeDefined()
    })

    it('should be repository defined', () => {
        expect(repository).toBeDefined()
    })
})
