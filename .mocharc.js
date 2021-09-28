process.env.NODE_ENV = 'test';

module.exports = {
    bail: true, // stop on first failure
    extension: ["ts"],
    require: "ts-node/register",
    timeout: 60000,
}