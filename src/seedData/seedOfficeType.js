import csv from "csvtojson";
import {connectDB} from "../config/database.js"
import {OfficeType} from "../models/officeType.js"

const seedOfficeType = async()=>{
    try {
        await connectDB()
        const rows = await csv({delimiter:"\t"}).fromFile("src/data/officeTypes.csv")

        const officeTypesDocs = rows.map((row)=>({
                officeTypeName:row.officeTypeName.trim(),
                level:Number(row.Level.replace("Level","").trim()),
                isActive:row.Status.trim().toLowerCase()==="active",
                isDeleted:false


        }))

        await OfficeType.deleteMany({})

        await OfficeType.insertMany(officeTypesDocs)

        console.log("officeTypes data seeded successfully")
        process.exit(0)
    } catch (error) {
        console.error("error in seeding the officeType data",error)
        process.exit(1)
    }
}

seedOfficeType()