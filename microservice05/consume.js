const { Kafka, logLevel } = require("kafkajs")
const fs = require("fs");

const clientId = "my-app"
const brokers = ["localhost:9092"]
const topic = "message-log"

const kafka = new Kafka({
	clientId,
	brokers,
	// logCreator: customLogger,
	// logLevel: logLevel.DEBUG,
})

// the kafka instance and configuration variables are the same as before

// create a new consumer from the kafka client, and set its group ID
// the group ID helps Kafka keep track of the messages that this client
// is yet to receive
const consumer =kafka.consumer({
	groupId: clientId,
	minBytes: 5,
	maxBytes: 1e6,
	// wait for at most 3 seconds before receiving new data
	maxWaitTimeInMs:3000,
})

/** 
const consume = async () => {
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic, fromBeginning: true })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: ({ message }) => {
			// here, we just log the message to the standard output
			
			//console.log(`received message: ${message.value}`)
			console.log(JSON.parse(message.value))

		},
	})
}
**/
async function consume(){
	await consumer.connect()
	await consumer.subscribe({ topic, fromBeginning: true })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: ({ message }) => {
			// here, we just log the message to the standard output
			
			//console.log(`received message: ${message.value}`)
			//console.log(JSON.parse(message.value))
			//console.log("HELLOOOOOOOO")
			const mes = message.value

			fs.writeFile("lol.json", mes, 'utf8', function (err) {
				if (err) {
					console.log("An error occured while writing JSON Object to File.");
					return console.log(err);
				}
			 
				console.log("JSON file has been saved.");
			});

		},
	})
}

module.exports = consume
