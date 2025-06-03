import express from 'express';
import { Request, Response } from 'express';

import FinancialRecordModel from "../schema/financial-record";
const router = express.Router();


router.get(
  "/getAllByUserID/:userId", 
  (req: Request, res: Response) => {
    const userId = req.params.userId;
    
    FinancialRecordModel.find({ userId: userId })
      .then(records => {
        if(records.length === 0){
          return res.status(404).send("No records found for this user.");
        }
        res.status(200).json(records);
      })
      .catch(err => {
        console.error("Error fetching financial records:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  }
);

router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("POST request received:", req.body); // 👈 Add this

    const newRecord = new FinancialRecordModel(req.body);
    const savedRecord = await newRecord.save();
    res.status(200).send(savedRecord);
  } catch (err) {
    console.error("Error saving record:", err); // 👈 Add this too
    res.status(500).send(err);
  }
});

router.put("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const newRecordBody = req.body;
  
  // Use promise chaining instead of async/await to avoid TypeScript compilation error
  FinancialRecordModel.findByIdAndUpdate(id, newRecordBody, { new: true })
    .then(record => {
      if (!record) {
        return res.status(404).json({ error: "Record not found" });
      }
      res.status(200).json(record);
    })
    .catch(err => {
      console.error("Error updating financial record:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});


router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  
  // Use promise chaining instead of async/await to avoid TypeScript compilation error
  FinancialRecordModel.findByIdAndDelete(id)
    .then(record => {
      if (!record) {
        return res.status(404).json({ error: "Record not found" });
      }
      // Return the deleted record for confirmation
      res.status(200).json(record);
    })
    .catch(err => {
      // Log error for debugging, send clean response to client
      console.error("Error deleting financial record:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});
export default router;