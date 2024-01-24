const mongoose = require('mongoose')

// get credential mongooDB host, port, database name and password
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const databaseName = process.env.DB_NAME;
const DBState =  [{
    value: 0,
    label: "disconnected"
},
{
    value: 1,
    label: "connected"
},
{
    value: 2,
    label: "connecting"
},
{
    value: 3,
    label: "disconnecting"
}];

const mongooConnect = async () => {
    let connectionURL;

    if(!username || !password) {
        connectionURL = `mongodb://${host}:${port}/${databaseName}`; 
    } else {
        connectionURL = `mongodb://${username}:${password}@${host}:${port}/${databaseName}`;
    }

    try {
        // connection to the mongoodb database with url
        await mongoose.connect(connectionURL)
    } catch (err) {
        // log error connection mongoodb
        console.error(err)
    }
}

const mongooHealtCheck = () => {
    const state = Number(mongoose.connection.readyState);
    const message = DBState.find(f => f.value == state).label;
    
    return message;
}

module.exports = {mongooConnect, mongooHealtCheck}