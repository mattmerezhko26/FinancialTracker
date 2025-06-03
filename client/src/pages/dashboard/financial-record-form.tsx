import {useState} from "react";
import {useUser} from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const FinancialRecordForm =() =>{
  const[description,setDescription] =useState<string>("");
  const[amount,setAmount] =useState<string>("");
  const[category,setCategory] =useState<string>("");
  const[payment,setPayment] =useState<string>("");
  const {addRecord} = useFinancialRecords();


  const {user} = useUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRecord = {
      userId: user?.id ?? "",
      date:new Date(),
      description: description,
      amount:parseFloat(amount),
      category: category,
      payment: payment,
    };
    addRecord(newRecord);
    setDescription("");
    setAmount("");
    setCategory("");
    setPayment("");

  };



  return (
  <div className="form-conteiner">
    <form onSubmit={handleSubmit}>
      <div className = "form-field">
        <label>Description:</label>
        <input type="text" required className ="input" value ={description} onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <div className="form-field">
        <label>Amount:</label>
        <input type="number" required className = "input" value ={amount} onChange={(e) => setAmount(e.target.value) }/>
      </div>
      <div className="form-field">
        <label>Category:</label>
        <select required className = "input" value ={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="other">Other</option>
          <option value="banking">Banking</option>
          <option value="biotech">BioTech</option>
          <option value="engineering">Engineering</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      <div className="form-field">
        <label>Payment Method:</label>
        <select required className = "input" value ={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value="credit-card">Credit Card</option>
          <option value="debit-card">Debit Card</option>
       
          <option value="bank-transfer">Bank Transfer</option>
        </select>
      </div>
      <button type="submit" className = "button">
        Add Record
      </button>
    </form>
    

  </div>
  );
}