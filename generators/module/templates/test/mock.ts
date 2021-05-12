import { <%= config.nameUpper %> } from '../domain/<%= config.name %>'

export class <%= config.nameUpper %>Mock {
    /**
     *
     */
    public static <%= config.name %> = () =>
            new <%= config.nameUpper %>()
                .builder()
                .build()

    /**
     *
     */
    public static <%= config.name %>s = () => <%= config.nameUpper %>Mock.mock<%= config.nameUpper %>s()

    private static mock<%= config.nameUpper %>s = (num<%= config.nameUpper %>s = 5) =>
        Array(num<%= config.nameUpper %>s)
            .fill(null)
            .map(i =>
                new <%= config.nameUpper %>()
                    .builder()
                    .build(),
            )

    private static strRand = (sub = 7) =>
            Math.random()
                .toString(36)
                .substring(sub)
}
