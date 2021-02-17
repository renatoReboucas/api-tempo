const QNeo4j = require("@qualitech/qneo4j");
const neo4j = require('neo4j-driver')

exports.db = new QNeo4j({
  url: "bolt://localhost:7687",
  username: "neo4j", // default: 'neo4j'
  password: "mudar123", // default: 'admin'

  // description: if true, returns raw value of the Neo4j.
  raw: false, // default: false,

  // description: closes the Neo4j driver after the execute method or transaction.
  autoCloseDriver: false, // default: false

  // description: expects to receive a callback function. This callback is called every time an error occurs within the QNeo4j module.
  notifyError: (error, query) => console.log(error, query),

  // description: all configuration available to the driver Neo4j can be set here. See more https://neo4j.com/docs/driver-manual/current/client-applications/
  driverConfig: {
    // ... neo4j driver configuration
  },
});

// module.exports = db
exports.neo4j_driver = {}
exports.neo4j_driver.url_bolt = "bolt://localhost:7687";
exports.neo4j_driver.auth = neo4j.default.auth.basic("neo4j", "mudar123");