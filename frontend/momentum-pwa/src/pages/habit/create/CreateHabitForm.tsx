// import { ErrorSection, MessageCard } from "@/components/commons";
import HabitForm from "@/pages/habit/shared/HabitForms";


export default function CreateHabitForm() {
//   const habit

  return (
    <>
      {/* {isError && <ErrorSection title="Update habit failed" error={formError} />} */}
      {/* Form */}
      <HabitForm 
        onSubmit={() => {console.log('Tesing')}} 
        isLoading={false}
        submitText="Create Habit"
      />
    </>
  )
}