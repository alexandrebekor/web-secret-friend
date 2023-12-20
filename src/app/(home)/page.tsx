import { FormCreateEvent } from "@/components/Form/CreateEvent";

export default function PageHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gray-100">
      <FormCreateEvent />
    </main>
  )
}
