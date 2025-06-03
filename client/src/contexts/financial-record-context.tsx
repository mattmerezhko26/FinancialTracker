import {createContext, useContext } from 'react';
import {useState,useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";

export interface FinancialRecord {
  _id?:string;
  userId:string;
  date:Date;
  description:string;
  amount:number;
  category:string;
  payment:string;
}

export interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord:(record:FinancialRecord) => void;
  updateRecord:(id:string,newRecord:FinancialRecord) => void;
  deleteRecord:(id:string) => void; 

}

export const FinancialRecordsContext = createContext<FinancialRecordsContextType | undefined>(undefined);

export const FinancialRecordsProvider = ({
  children,
} : {
  children:React.ReactNode;
}) => {
  const [records,setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();

  const fetchRecords = async () =>{
    if(!user) return;
    const response = await fetch(`http://localhost:3001/financial-records/getAllByUserID/${user?.id}`);

    if(response.ok){
      const records = await response.json();
      console.log(records);
      setRecords(records);
    }
  };

  useEffect(() => {
    fetchRecords();
  },[user]);

  const addRecord = async (record:FinancialRecord) =>{
    const response = await fetch("http://localhost:3001/financial-records",{
      method: "POST", 
      body:JSON.stringify(record),
      headers:{
        "Content-Type":"application/json",
      },
    });
    try {
    if(response.ok){
      const newRecord = await response.json()
      setRecords((prev) => [...prev,newRecord]);

    }
  } catch (error) {}
  };


  const updateRecord = async (id: string, newRecord: FinancialRecord) => {
    if (!user) return;
  
    try {
      const response = await fetch(`http://localhost:3001/financial-records/${id}`, {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const updatedRecord = await response.json();
  
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return updatedRecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (error) {
      console.error("Failed to update record:", error);
    }
  };


  const deleteRecord = async (id:string) => {
    const response = await fetch(`http://localhost:3001/financial-records/${id}`,
      {
      method: "DELETE", 
      },
    );
    try {
    if(response.ok){
      const deletedRecord = await response.json()
      setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id));

    }
  } catch (error) {}

  };
  return (
    <FinancialRecordsContext.Provider value ={{records,addRecord,updateRecord,deleteRecord}}>
      
      {children}
      </FinancialRecordsContext.Provider>
  );

};

export const useFinancialRecords =() => {
  const context = useContext<FinancialRecordsContextType | undefined>(FinancialRecordsContext);
  if(!context){
    throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider");
  }
  return context;
}


