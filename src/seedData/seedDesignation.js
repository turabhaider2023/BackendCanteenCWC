import csv from "csvtojson";
import {connectDB} from "../config/database.js"
import {Designation} from "../models/designation.js"

const seedDesignation = async()=>{
    try {
         await connectDB()

         const rows = await csv({delimiter:"\t"}).fromFile("src/data/designations.csv")
            console.log(rows[0]);
            console.log(Object.keys(rows[0]));

         const designationDocs = rows.map((row)=>({
            designationName:row.designationName.trim(),
            level:Number(row.Level.replace("Level","").trim()),
            isActive:row.Status.trim().toLowerCase()==="active",
            isDeleted:false

         }))

         await Designation.deleteMany({})
         await Designation.insertMany(designationDocs)
         console.log("designation seeds complete successfully")
         process.exit(0)




    } catch (error) {
        console.error("error in seeding the designation",error)
        process.exit(1)
        
    }
}

seedDesignation()