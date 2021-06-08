package query

import (
	"siigo.com/<%= config.name %>/src/application/query"
)

func NewFindAllQueryPerson() *query.FindAllPersonQuery {
	return  &query.FindAllPersonQuery{}
}
