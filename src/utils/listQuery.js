export const getListQuery = (query)=>{
    const page = Number(query.page)||1;
    const limit = Number(query.limit) || 10 ;
    const skip = (page - 1)*limit;
    const search = query.q || "";

    return {
        page ,
        limit,
        skip,
        search
    }
}