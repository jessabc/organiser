'use client'

import Card from "./_components/finance/Card";
import IncomeExpenseCard from "./_components/finance/IncomeExpenseCard";
import TransactionSection from "./_components/finance/TransactionSection";
import ProjectsSection from "./_components/projects/ProjectsSection";



export default function Home() {
  const incomeExpenseCardEl = ['Income', 'Expense'].map(item => <IncomeExpenseCard key={item} type={item} />)

  return (
    <>

      
<div>
      {/* <div className='flex flex-col gap-5 md:grid grid-cols-3'>
        <Card/>
        {incomeExpenseCardEl}
      </div> */}
      <div className='md:grid grid-cols-2 gap-7 -mt-10'>
        <TransactionSection/>
        <ProjectsSection/>
      </div>
    </div>

   
    

   
    </>
  );
}
