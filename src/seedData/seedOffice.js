import csv from "csvtojson";
import { connectDB } from "../config/database.js";
import { Office } from "../models/office.js";
import { OfficeType } from "../models/officeType.js";

const seedOffice = async () => {
    try {
        await connectDB();
        console.log("successfully connected to the database");

        const rows = await csv({ delimiter: "\t" }).fromFile("src/data/offices.csv");

        console.log(rows[0]);
        console.log(Object.keys(rows[0]));

        const officeTypes = await OfficeType.find({});
        const officeTypeMap = new Map();

        for (const officeType of officeTypes) {
            officeTypeMap.set(officeType.officeTypeName.trim(), officeType._id);
        }

        const validRows = rows.filter(
            (row) =>
                row.Office?.trim() &&
                row.OfficeType?.trim() &&
                row.RegionType?.trim()
        );

        console.log(`Valid office rows: ${validRows.length}`);
        console.log(`Skipped office rows: ${rows.length - validRows.length}`);

        const officeDocs = validRows.map((row) => {
            const officeTypeId = officeTypeMap.get(row.OfficeType.trim());

            if (!officeTypeId) {
                throw new Error(`OfficeType not found for: ${row.OfficeType}`);
            }

            return {
                officeName: row.Office.trim(),
                officeTypeId: officeTypeId,
                city: row.City?.trim() || "",
                regionType: row.RegionType.trim(),
                isActive: row.Status.trim().toLowerCase() === "active",
                isDeleted: false
            };
        });

        console.log(`Office docs prepared for first pass: ${officeDocs.length}`);

        await Office.deleteMany({});
        await Office.insertMany(officeDocs);

        const insertedOffices = await Office.find({});
        const officeMap = new Map();

        for (const office of insertedOffices) {
            officeMap.set(office.officeName.trim(), office);
        }

        for (const row of validRows) {
            const currentOfficeName = row.Office.trim();
            const superiorOfficeName = row.SuperiorOffice?.trim();

            if (!superiorOfficeName) {
                continue;
            }

            const currentOffice = officeMap.get(currentOfficeName);
            const parentOffice = officeMap.get(superiorOfficeName);

            if (!currentOffice) {
                throw new Error(`Current office not found: ${currentOfficeName}`);
            }

            if (!parentOffice) {
                console.log(
                    `Skipping parent link for "${currentOfficeName}" because parent "${superiorOfficeName}" was not found`
                );
                continue;
            }

            currentOffice.parentOfficeId = parentOffice._id;
            await currentOffice.save();
        }

        console.log("Office seed completed successfully");
        process.exit(0);

    } catch (error) {
        console.error("Error in seeding office data:", error);
        process.exit(1);
    }
};

seedOffice();