package consumer

import (
	"dev.azure.com/SiigoDevOps/Siigo/_git/go-cqrs.git/cqrs"
	"dev.azure.com/SiigoDevOps/Siigo/_git/go-cqrs.git/cqrs/uuid"
	log "github.com/sirupsen/logrus"
	"gopkg.in/confluentinc/confluent-kafka-go.v1/kafka"
	"siigo.com/bolt/src/application/command"
)

// Consumer test-topic
func TestConsumer(msg *kafka.Message, dispatcher cqrs.Dispatcher) {

	log.Info("Message on ", msg.TopicPartition, " ", string(msg.Value))
	commandMessage := cqrs.NewCommandMessage(uuid.NewUUID(), &command.GreeterCommand{Name: string(msg.Value)})
	greeting, _ := dispatcher.Send(commandMessage)
	log.Info(greeting)
}
