package fxmodule

import (
	siigokafka "dev.azure.com/SiigoDevOps/Siigo/_git/go-kafka.git/kafka"
	log "github.com/sirupsen/logrus"
	"go.uber.org/fx"
	"gopkg.in/confluentinc/confluent-kafka-go.v1/kafka"

	"siigo.com/bolt/src/application/consumer"
	"siigo.com/bolt/src/application/producer"
	"siigo.com/bolt/src/config"
)

// BrokerModule Create FX Broker Kafka Module
var BrokerModule = fx.Options(
	fx.Provide(
		NewKafkaConfig,
		consumer.RegisterConsumers,
		siigokafka.InitializeProducer,
	),
	fx.Invoke(
		siigokafka.SubscribeConsumers,
		SendMyEventExample,
	),
)

// Create KafkaConfig Instance
func NewKafkaConfig(config *config.Configuration) *kafka.ConfigMap {

	kafkaConfig := &kafka.ConfigMap{}
	for key, value := range config.Kafka {
		_ = kafkaConfig.SetKey(key, value)
	}
	return kafkaConfig
}

// Send Event For Example
func SendMyEventExample(semigroup *siigokafka.Producer) {
	log.WithFields(log.Fields{"text": "Ayuwokiiii"}).Info("Sending My Event")
	go semigroup.Publish(producer.MyEvent{Data: "Ayuwokiiii"}) // example publish event
}
