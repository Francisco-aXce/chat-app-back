const presentApi = (req, res) => {
    const { apiInfo } = res;
    res.json({
        name: apiInfo.name,
        author: apiInfo.author,
        version: apiInfo.version,
        description: apiInfo.description,
    });
};

module.exports = {
    presentApi,
};