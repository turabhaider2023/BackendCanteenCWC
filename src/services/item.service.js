import { Item } from "../models/item.js";
import { ItemMaster } from "../models/itemMaster.js";
import { Unit } from "../models/unit.js";
import { Brand } from "../models/brand.js"
import ApiError from "../utils/ApiError.js";

export const createItemService = async (data) => {
    const {
        itemMasterId,
        brandId,
        quantity,
        unitId,
        itemCode,
        description,
        isPerishable,
        minimumStock,
        maximumStock
    } = data;

    const existingItem = await Item.findOne({
        itemCode,
        isDeleted: false
    });

    if (existingItem) {
        
            throw new ApiError(
                409,
                "Item with this code already exists"
            );
        }

      
    const itemMaster = await ItemMaster.findOne({
    _id: itemMasterId,
    isDeleted: false
});

    if (!itemMaster) {
        throw new ApiError(
            404,
            "Item master not found"
        );
    }

   

    const unit = await Unit.findOne({
        _id: unitId,
        isDeleted: false
    });

    if (!unit) {
        throw new ApiError(
            404,
            "Unit not found"
        );
    }

    const brand = await Brand.findOne({
    _id: brandId,
    isDeleted: false
    });

    if (!brand) {
        throw new ApiError(
            404,
            "Brand not found"
        );
    }

    try {
        const newItem = await Item.create({
            itemMasterId,
            brandId,
            quantity,
            unitId,
            itemCode,
            description,
            isPerishable,
            minimumStock,
            maximumStock
        });

        return newItem;
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                409,
                "Item with this code already exists"
            );
        }

        throw error;
    }
}

export const getAllItemsService = async () => {
    const allItems = await Item.find({
        isDeleted: false
    })
        .populate("itemMasterId", "itemName")
        .populate("unitId", "unitName unitCode")
        .populate("brandId","brandName")
        .sort({ itemCode: 1 });

    return allItems;
};

export const getItemByIdService = async (data) => {
    const { itemId } = data;

    const item = await Item.findOne({
        _id: itemId,
        isDeleted: false
    })
        .populate("itemMasterId", "itemName")
        .populate("brandId", "brandName")
        .populate("unitId", "unitName unitCode");

    if (!item) {
        throw new ApiError(
            404,
            "Item not found"
        );
    }

    return item;
};

export const updateItemService = async (data) => {
      const {
        itemId,
        itemMasterId,
        brandId,
        quantity,
        unitId,
        itemCode,
        description,
        isPerishable,
        minimumStock,
        maximumStock,
        isActive
    } = data;

    const existingItem = await Item.findOne({
        _id: itemId,
        isDeleted: false
    });

    if (!existingItem) {
        throw new ApiError(
            404,
            "Item not found"
        );
    }

   


    if (itemCode !== undefined) {
        const duplicateItemCode = await Item.findOne({
            itemCode,
            isDeleted: false,
            _id: { $ne: itemId }
        });

        if (duplicateItemCode) {
            throw new ApiError(
                409,
                "Item with this code already exists"
            );
        }
    }

    if (itemMasterId !== undefined) {
        const itemMaster = await ItemMaster.findOne({
            _id: itemMasterId,
            isDeleted: false
        });

        if (!itemMaster) {
            throw new ApiError(
                404,
                "Item master not found"
            );
        }
    }

    if (unitId !== undefined) {
        const unit = await Unit.findOne({
            _id: unitId,
            isDeleted: false
        });

        if (!unit) {
            throw new ApiError(
                404,
                "Unit not found"
            );
        }
    }

    if (brandId !== undefined) {
    const brand = await Brand.findOne({
        _id: brandId,
        isDeleted: false
    });

    if (!brand) {
        throw new ApiError(
            404,
            "Brand not found"
        );
    }
}



    

    const updatedData = {};
    if(itemMasterId !== undefined) updatedData.itemMasterId = itemMasterId;
    if(brandId !== undefined) updatedData.brandId = brandId;
    if(quantity !== undefined) updatedData.quantity = quantity;
    if (unitId !== undefined) updatedData.unitId = unitId;
    if (itemCode !== undefined) updatedData.itemCode = itemCode;
    if (description !== undefined) updatedData.description = description;
    if (isPerishable !== undefined) updatedData.isPerishable = isPerishable;
    if (minimumStock !== undefined) updatedData.minimumStock = minimumStock;
    if (maximumStock !== undefined) updatedData.maximumStock = maximumStock;
    if (isActive !== undefined) updatedData.isActive = isActive;
    
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            updatedData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        return updatedItem;
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                409,
                "Item with this code already exists"
            );
        }

        throw error;
    }
};

export const deleteItemService = async (data) => {
    const { itemId } = data;

    const existingItem = await Item.findOne({
        _id: itemId,
        isDeleted: false
    });

    if (!existingItem) {
        throw new ApiError(
            404,
            "Item not found"
        );
    }

    const deletedItem = await Item.findByIdAndUpdate(
        itemId,
        {
            isDeleted: true,
            isActive: false
        },
        {
            returnDocument: "after"
        }
    );

    return deletedItem;
};