const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const buildListFilter = (
    query = {},
    searchFields = [],
    {softDelete = true} = {}
)=>{

    const { q, isActive, includeDeleted } = query

    const filter = {}

    if(softDelete && includeDeleted !== "true"){
        filter.isDeleted = false
    }

    if(isActive !== undefined){
        filter.isActive = isActive==="true"
    }

    if(q && searchFields.length){
        const needle = new RegExp(escapeRegex(q), "i") 
        filter.$or =  searchFields.map((field)=>({
        [field]:needle
    }))


    }

    return filter
}

export const runList = async (
    Model,
    {
        query = {},
        searchFields = [],
        filter = {},
        sort = {createdAt:-1},
        populate = [],
        collation,
        softDelete = true
    }={}
)=>{
   const { page = 1 ,limit=50} = query; 

   const where = {
    ...buildListFilter(query,searchFields,{softDelete}),
    ...filter
   }

   let cursor = Model.find(where).sort(sort)

   for (const p of populate){
    cursor = cursor.populate(p)
   }

   if(collation){
    cursor = cursor.collation(collation)
   }

   if(limit>0){
    cursor = cursor
            .skip((page-1)*limit)
             .limit(limit)
   }

   const [items,total] = await Promise.all([
    cursor.exec(),
    Model.countDocuments(where)
   ])

   return {
    items,
    total,
    page,
    limit,
    pages:limit>0?Math.ceil(total/limit):1
   }
}