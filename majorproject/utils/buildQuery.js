module.exports = (queryParams, extraFilters = {}) => {
    let query = { ...extraFilters };

    const { category, search } = queryParams;

    if (category) {
        query.category = category;
    }

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } }
        ];
    }

    console.log(query);
    return query;
};