import mongoose from 'mongoose';

interface FinancialRecord {
  userId:string;
  date:Date;
  description:string;
  amount:number;
  category:string;
  payment:string;
}

const financialSchema = new mongoose.Schema<FinancialRecord>({
  userId:{type:String, required:true},
  date:{type:Date, required:true},
  description:{type:String, required:true},
  amount:{type:Number, required:true},
  category:{type:String, required:true},
  payment:{type:String, required:true},

});

const financialRecordModel = mongoose.model<FinancialRecord>('FinancialRecord', financialSchema);

export default financialRecordModel;