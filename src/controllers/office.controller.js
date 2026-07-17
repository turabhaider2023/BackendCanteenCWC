import { createOfficeService,
    getAllOfficesService,
    updateOfficeService,
    deleteOfficeService } from "../services/office.service.js" 
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"

export const createOffice = asyncHandler(async(req,res)=>{
    
        
        const newOffice=await createOfficeService(req.body)


        return res.status(201).json(
            new ApiResponse(
                201,
                newOffice,
                "Office created successfully"

            )
        )
    
    
})

export const getAllOffices = asyncHandler(async(req,res)=>{
        const allOffices=await getAllOfficesService()

        return res.status(200).json(
            new ApiResponse(
                200,
                allOffices,
                "All offices fetched successfully"

            )
        )
    
})

export const updateOffice = asyncHandler(async (req,res)=>{

        const updatedOffice=await updateOfficeService({
            officeId:req.params.officeId,
            ...req.body
        })

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedOffice,
            "Office updated successfully"
        )
   )

})

export const deleteOffice = asyncHandler(async (req,res)=>{
       
        const deletedOffice = await deleteOfficeService(req.params)
        

        return res.status(200).json(
            new ApiResponse(
                200,
                deletedOffice,
                "Office deleted successfully"

            )
        )
   
})