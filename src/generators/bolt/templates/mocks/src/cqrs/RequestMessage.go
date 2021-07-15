package cqrs

type RequestMessage struct {
	requestValue interface{}
}

func NewRequestMessage(requestValue interface{}) *RequestMessage {
	return &RequestMessage{requestValue}
}

func (r RequestMessage) AggregateID() string {
	panic("implement me")
}

func (r RequestMessage) Headers() map[string]interface{} {
	panic("implement me")
}

func (r RequestMessage) SetHeader(s string, i interface{}) {
	panic("implement me")
}

func (r RequestMessage) Request() interface{} {
	return r.requestValue
}

func (r RequestMessage) RequestType() string {
	panic("implement me")
}

