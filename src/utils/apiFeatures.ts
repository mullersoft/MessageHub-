class APIFeatures {
  private query: any;
  private queryString: any;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  /**
   * Filters the query based on query parameters.
   * Excludes pagination, sorting, field selection parameters.
   * Applies advanced filtering such as greater than, less than, etc.
   * @returns {APIFeatures} - The updated APIFeatures instance.
   */
  filter(): this {
    const queryObj = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  /**
   * Sorts the query based on the 'sort' query parameter.
   * Defaults to sorting by 'createdAt' in descending order.
   * @returns {APIFeatures} - The updated APIFeatures instance.
   */
  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  /**
   * Limits the fields returned in the query result based on the 'fields' query parameter.
   * Defaults to excluding the '__v' field.
   * @returns {APIFeatures} - The updated APIFeatures instance.
   */
  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  /**
   * Paginates the query results based on the 'page' and 'limit' query parameters.
   * Defaults to page 1 and limit 100.
   * @returns {APIFeatures} - The updated APIFeatures instance.
   */
  paginate(): this {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default APIFeatures;
