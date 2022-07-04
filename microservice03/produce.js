// import the `Kafka` instance from the kafkajs library
const { Kafka, logLevel } = require("kafkajs")

// the client ID lets kafka know who's producing the messages
const clientId = "happy Saas"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]
// this is the topic to which we want to write messages
const topic = "message-log"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
//const kafka = new Kafka({ clientId, brokers, logLevel: logLevel.DEBUG })
const producer = kafka.producer({})

// we define an async function that writes a new message each second
async function produce(data){
	await producer.connect()

	// setInterval(async () => {
		try {
			
			await producer.send({
				topic,
				acks: 1,
				messages: [
					{
						//key: String(i),
						value: JSON.stringify(data),
						
					},
				],
			})

			// if the message is written successfully, log it and increment `i`

		} catch (err) {
			console.error("could not write message " + err)
		}
	//  }, 5000)
}

module.exports = produce
