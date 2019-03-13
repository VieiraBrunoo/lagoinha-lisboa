const proxy = [
    {
        context: '/siec-api/api',
        target: 'http://localhost:8081'
    }
];
module.exports = proxy;