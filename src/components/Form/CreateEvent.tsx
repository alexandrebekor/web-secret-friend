'use client'

import { createEventAction } from "@/actions/createEventAction"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserMinus, UserPlus } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  friends: z.array(z.object({
    name: z.string().min(1, 'Required field')
  }))
})

export type FormCreateEventInput = z.infer<typeof schema>

export const FormCreateEvent = () => {
  const { register, handleSubmit, control } = useForm<FormCreateEventInput>({
    resolver: zodResolver(schema)
  })

  const { fields, append, remove } = useFieldArray({
    name: 'friends',
    control
  })

  const handleCreateEvent = async (data: FormCreateEventInput) => {
    const { friends } = data

    let friendsRaffled: string[] = []
    const raffle  = friends.map(friendSelected => {
      const friendsSecret = friends
      .filter(friend => friend.name !== friendSelected.name)
      .filter(friend => !friendsRaffled.includes(friend.name))

      const randomPosition = Math.floor(Math.random() * friendsSecret.length)
      const friendSecret = friendsSecret[randomPosition]
      
      friendsRaffled.push(friendSecret?.name)

      return {
        page_id: self.crypto.randomUUID(),
        friend: friendSelected.name,
        friend_secret: friendSecret?.name
      }
    })

    const response = await createEventAction({
      event_id: self.crypto.randomUUID(),
      friends: raffle
    })

    if(response?.error) {
      console.log({
        error: response.error
      })
    }
  }

  const handleAddFriend = () => {
    append({
      name: ''
    })
  }

  const handleDeleteFriend = (index: number) => {
    remove(index)
  }

  return (
    <form onSubmit={handleSubmit(handleCreateEvent)} className="flex flex-col w-full max-w-md">
      <header className="flex justify-between items-center">
        <label className="font-bold text-lg">Lista de Amigos</label>
        <button onClick={handleAddFriend} className="bg-green-700 p-1 rounded-sm">
          <UserPlus className="w-5 h-5 text-white" />
        </button>
      </header>
      <section className="flex flex-col gap-2 py-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex bg-gray-200 px-4 py-1 rounded-sm">
          <input type="text" {...register(`friends.${index}.name`)} placeholder="Insira o nome" className="grow bg-transparent outline-none" />
          <button onClick={() => handleDeleteFriend(index)}>
            <UserMinus className="w-5 h-5 text-red-700" />
          </button>
        </div>
      ))}
      </section>
      <footer className="flex">
        <button type="submit" className="bg-green-700 w-full py-1 text-white rounded-sm">Sortear</button>
      </footer>
    </form>
  )
}