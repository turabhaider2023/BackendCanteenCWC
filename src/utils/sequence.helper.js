import { Counter } from "../models/counter.model.js"

export const generateSequenceNumber = async(
    module,
    prefix,
    session
)=>{
    const year = new Date().getFullYear()
   const counter = await Counter.findOneAndUpdate(
        {module,
         year},
        {
            $inc:{
                sequence:1
            }
        },
        {
            upsert:true,
            returnDocument:"after",
            session
        }
    )

    const formattedSequence = String(counter.sequence).padStart(6,"0")

    return `${prefix}-${year}-${formattedSequence}`

   
}