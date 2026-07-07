import csv from "csvtojson";
import { connectDB } from "../config/database.js";
import { Role } from "../models/role.js";

const seedRole = async () => {
    try {
        await connectDB();

        const rows = await csv({ delimiter: "\t" }).fromFile("src/data/roles.csv");

        const roleDocs = rows.map((row) => ({
            roleName: row.roleName.trim(),
            isActive: row.Status.trim().toLowerCase() === "active",
            isDeleted: false
        }));

        await Role.deleteMany({});
        await Role.insertMany(roleDocs);

        console.log("roles data seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("error in seeding the role data", error);
        process.exit(1);
    }
};

seedRole();