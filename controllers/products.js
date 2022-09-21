import { Product } from '../models/product.js';

const getProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObjects = {};
    if (featured) {
        queryObjects.featured = featured === 'true' ? true : false;
    }
    if (company) {
        queryObjects.company = company;
    }
    if (name) {
        queryObjects.name = {$regex : name , $options : 'i'};
    }
    if (numericFilters) {
        const operatorsMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte',
        };
        const pattern = /\b(>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(pattern, (match) => `-${operatorsMap[match]}-`);
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach(item => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObjects[field] = { [operator] : Number(value)};
            }
        });
    }
 
    let result = Product.find(queryObjects);

    result = sort ? result.sort(sort.replace(',',' ')) : result.sort('createdAt');
    if(fields) result = result.select(fields.replace(',', ' '));
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    result = result.skip(skip).limit(limit);
    const products = await result;

    res.status(200).json({success : true, size : products.length, products});
}

export {getProducts};