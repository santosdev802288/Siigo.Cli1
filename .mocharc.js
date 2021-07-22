process.env.NODE_ENV = 'test';

module.exports = {
    extension: ["ts"],
    require: "ts-node/register",
    timeout: 60000,
}