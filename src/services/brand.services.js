import ApiError from "../utils/ApiError.js";
import { Brand } from "../models/brand.js"

export const createBrandService = async (data)=>{
    const {brandName,description} = data

    const existingBrand = await Brand.findOne({
        brandName,
        isDeleted:false
    })

    if(existingBrand){
        throw new ApiError(
            409,
            "Brand name already exists"
        )
    }

    try {
        const newBrand = await Brand.create({
            brandName,
            description
        })

        return newBrand
    } catch (error) {
        if(error.code === 11000){
            throw new ApiError(
                409,
                "Brand name already exists"
            )
        }

        throw error
    }
}

export const getAllBrandsService = async ()=>{
    const allBrands = await Brand.find({
        isDeleted:false
    })
    .sort({brandName:1})

    return allBrands;
}

export const getBrandByIdService = async (data)=>{
    const {brandId} = data
    const brand = await Brand.findOne({
        _id:brandId,
        isDeleted:false
    })

    if(!brand){
        throw new ApiError(
            404,
            "Brand not found"
        )

    }

    return brand
}

export const updateBrandService = async (data)=>{
    const {brandId,brandName,description,isActive} = data

        const existingBrand = await Brand.findOne({
            _id:brandId,
            isDeleted:false
        })

        if(!existingBrand){
            throw new ApiError(
                404,
                "Brand not found"
            )
        }

        if(brandName!==undefined){
            const duplicateBrand = await Brand.findOne({
            brandName,
            isDeleted:false,
            _id:{$ne:brandId}
        })

        if(duplicateBrand){
            throw new ApiError(
                409,
                "Brand name already exists"
            )
        }}
        

       const updatedData = {}

       if(brandName!==undefined){
        updatedData.brandName=brandName
       }

       if(description!==undefined){
        updatedData.description=description
       }

       if(isActive!==undefined){
        updatedData.isActive=isActive
       }

       try {
            const updatedBrand = await Brand.findByIdAndUpdate(
                brandId,
                updatedData,
                {returnDocument:"after",
                 runValidators:true
                }
            )

            return updatedBrand
       } catch (error) {
            if(error.code === 11000){
                throw new ApiError(
                    409,
                    "Brand name already exists"
                )
            }

            throw error;
       }
    

    }
export const deleteBrandService = async (data)=>{
    const {brandId} = data

    const existingBrand = await Brand.findOne({
        _id:brandId,
        isDeleted:false
    })

    if(!existingBrand){
        throw new ApiError(
            404,
            "Brand not found"
        )
    }

    const deletedBrand = await Brand.findByIdAndUpdate(
        brandId,
        {
            isDeleted:true,
            isActive:false
        },
        {returnDocument:"after"}
    )

    return deletedBrand
}