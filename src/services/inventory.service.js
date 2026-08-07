import { generateSequenceNumber } from "../utils/sequence.helper.js"
import { COUNTER_MODULE } from "../constants/counter.constants.js"
import { INVENTORY_TRANSACTION_TYPE
    ,INVENTORY_MOVEMENT_TYPE} from "../constants/inventory.constants.js"

export const receiveStock = async (purchase,
    purchaseItems,
    receivedDate,
    performedBy,
    session)=>{

    for (const purchaseItem of purchaseItems){
           const {inventory,inventoryBatch} =
        await createInventoryBatch(
            purchaseItem,
            receivedDate,
            session
        )

        await updateInventoryBalance(
            inventory,
            purchaseItem,
            receivedDate,
            session)

        await createInventoryTransaction(
            purchase,
            inventory,
            inventoryBatch,
            purchaseItem,
            receivedDate,
            performedBy,
            session
        )

    }
}


const createInventoryBatch = async(
    purchaseItem,
    receivedDate,
    session
)=>{

    let inventory = await Inventory.findOne({
        itemId:purchaseItem.itemId
    }).session(session)

    if(!inventory){
         inventory = new Inventory({
            itemId:purchaseItem.itemId
        })

        await inventory.save({session})
    }

    const batchNumber =await generateSequenceNumber(
        COUNTER_MODULE.INVENTORY_BATCH,
        "BAT",
        session
    )

    const unitCost=calculateUnitCost(purchaseItem)
    
    const totalReceivedQuantity =
    purchaseItem.receivedQuantity +
    purchaseItem.freeQuantity;

    const inventoryBatch = new InventoryBatch({
        inventoryId:inventory._id,
        purchaseItemId:purchaseItem._id,
        batchNumber,
        originalQuantity:totalReceivedQuantity,
        availableQuantity:totalReceivedQuantity,
        unitCost,
        receivedDate,
    })

     await inventoryBatch.save({session})

     return {inventory,inventoryBatch
        };

}

const updateInventoryBalance =  async(
    inventory,
    purchaseItem,
    receivedDate,
    session
)=>{

    const totalReceivedQuantity = purchaseItem.receivedQuantity+purchaseItem.freeQuantity

   inventory.currentStock += totalReceivedQuantity

    inventory.isAvailable = true
    inventory.lastReceivedDate = receivedDate

    await inventory.save({session})
}

const createInventoryTransaction = async (
    purchase,
    inventory,
    inventoryBatch,
    purchaseItem,
    receivedDate,
    performedBy,
    session
) => {

    const totalReceivedQuantity =
        purchaseItem.receivedQuantity +
        purchaseItem.freeQuantity;

    const inventoryTransaction = new InventoryTransaction({
        inventoryId: inventory._id,

        inventoryBatchId: inventoryBatch._id,

        transactionType:
            INVENTORY_TRANSACTION_TYPE.PURCHASE_RECEIVE,

        movementType:
            INVENTORY_MOVEMENT_TYPE.IN,

        quantity: totalReceivedQuantity,

        unitCost: inventoryBatch.unitCost,

        balanceAfterTransaction:
            inventory.currentStock,

        referenceId: purchase._id,
        
        performedBy,


        transactionDate: receivedDate
    });

    await inventoryTransaction.save({ session });
}



const calculateUnitCost = (purchaseItem)=>{
 const {purchasePrice,receivedQuantity,freeQuantity} =purchaseItem

 const totalQuantity = receivedQuantity+freeQuantity

 if(totalQuantity===0 ){
    return 0
 }

 const unitCost = (purchasePrice*receivedQuantity)/totalQuantity

 return unitCost
}