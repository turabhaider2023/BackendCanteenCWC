import { Vendor } from "../models/vendor.js"
import ApiError from "../utils/ApiError.js"

export const createVendorService = async(data)=>{
    const {vendorName,gstNumber,contactPerson,vendorMobile,
        vendorEmail,address,state,city,pinCode} = data
    const existingVendor = await Vendor.findOne({
        gstNumber,
        isDeleted:false
    })

    if(existingVendor){
        throw new ApiError(409,
            "Vendor with this GST number already exists"
        )
    }

    try {
        const newVendor = await Vendor.create({
            vendorName,
            gstNumber,
            contactPerson,
            vendorMobile,
            vendorEmail,
            address,
            state,
            city,
            pinCode
        })

        return newVendor
    } catch (error) {
        if(error.code ===11000){
            throw new ApiError(409,
                "Vendor with this GST number already exists"
            )
        }

        throw error;
    }


}

export const getAllVendorsService = async ()=>{
 const allVendors = await Vendor.find({
    isDeleted:false
 })
 .sort({vendorName:1})

 return allVendors;
}

export const getVendorByIdService = async (data)=>{
const { vendorId }= data


const vendor = await Vendor.findOne({
    _id:vendorId,
    isDeleted:false
})

if(!vendor){
    throw new ApiError(404
        ,"Vendor not found"
    )
}

return vendor;

}

export const updateVendorService = async (data)=>{
    const {vendorId,vendorName,gstNumber,contactPerson,vendorMobile,
        vendorEmail,address,state,city,pinCode,isActive} = data

        const existingVendor = await Vendor.findOne({
            _id:vendorId,
            isDeleted:false
        })

        if(!existingVendor){
            throw new ApiError(404,
                "Vendor not found"
            )
        }

     if(gstNumber!==undefined){
           const duplicateVendor = await Vendor.findOne({
            gstNumber,
            isDeleted:false,
            _id:{$ne:vendorId}
        })

        if(duplicateVendor){
            throw new ApiError(409,
                "Vendor with this GST number already exists"
            )
        }
     }

     const updatedData = {}

     if(vendorName!==undefined){
        updatedData.vendorName=vendorName;
     }

      if(gstNumber!==undefined){
        updatedData.gstNumber=gstNumber;
     }

      if(contactPerson!==undefined){
        updatedData.contactPerson=contactPerson;
     }

      if(vendorMobile!==undefined){
        updatedData.vendorMobile=vendorMobile;
     }

      if(vendorEmail!==undefined){
        updatedData.vendorEmail=vendorEmail;
     }

      if(address!==undefined){
        updatedData.address=address;
     }

      if(state!==undefined){
        updatedData.state=state;
     }

      if(city!==undefined){
        updatedData.city=city;
     }

      if(pinCode!==undefined){
        updatedData.pinCode=pinCode;
     }

     if(isActive!==undefined){
        updatedData.isActive=isActive
     }

    

   try {
     const updatedVendor = await Vendor.findByIdAndUpdate(
        vendorId,
        updatedData,
        {returnDocument:"after",
        runValidators:true
        }
    )

    return updatedVendor
   } catch (error) {
    if(error.code ===11000){
        throw new ApiError(409,
            "Vendor with this GST number already exists"
        )
    }

    throw error;
   }
}

export const deleteVendorService = async (data)=>{
 const { vendorId }= data


const vendor = await Vendor.findOne({
        _id:vendorId,
        isDeleted:false
    })

    if(!vendor){
        throw new ApiError(404
            ,"Vendor not found"
        )
    }

    const deletedVendor = await Vendor.findByIdAndUpdate(
        vendorId,
        {isDeleted:true,
        isActive:false},
        {returnDocument:"after"}
    )

    return deletedVendor;

}