import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createDesignationService,
    getAllDesignationsService,
    updateDesignationService,
    deleteDesignationService
    
} from "../services/designation.service.js"

export const createDesignation = asyncHandler(async (req,res)=>{

        const newRecord = await createDesignationService(req.body)
       
        return res.status(201).json(
            new ApiResponse(
                201,
                newRecord,
                "Designation created successfully"

            )
        
        )
    
    
})

export const getAllDesignations = asyncHandler(async(req,res)=>{
        const allDesignations = await getAllDesignationsService()

    return res.status(200).json(
                new ApiResponse(
                    200,
                    allDesignations,
                    "All designations fetched successfully"
                ))
})
        
  


export const updateDesignation = asyncHandler(async (req,res)=>{

    const updatedDesignation = await updateDesignationService({
    designationId: req.params.designationId,
    ...req.body
})
        
        return res.status(200).json(
            new ApiResponse(
                200,
                updatedDesignation,
                "Designation updated successfully"

            )
            
        )
   
})

export const deleteDesignation = asyncHandler(async (req,res)=>{
  
        const deletedDesignation = await deleteDesignationService({designationId:req.params.designationId})

   
        return res.status(200).json(
            new ApiResponse(
                200,
                deletedDesignation,
                "Designation soft deleted successfully"
            )
        )
    
    
})