package consumer

import (
	"dev.azure.com/SiigoDevOps/Siigo/_git/go-cqrs.git/cqrs"
	siigokafka "dev.azure.com/SiigoDevOps/Siigo/_git/go-kafka.git/kafka"
	"gopkg.in/confluentinc/confluent-kafka-go.v1/kafka"
)

//

// Register siigokafka consumers
func RegisterConsumers() siigokafka.KafkaConsumers {
	return map[string]func(message *kafka.Message, dispatcher cqrs.Dispatcher){
		"test-topic":   TestConsumer,
		"health-topic": HealthConsumer,
	}
}
