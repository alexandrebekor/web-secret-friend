import { getTicketByIdAction } from "@/actions/getTicketByIdAction"

export default async function PageEventId({ params }: { params: { id: string } }) {
  const getRows = await getTicketByIdAction({
    id: params.id
  })

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      {getRows.error ? (
        <section>
          <p className="font-bold text-2xl">Essa página não existe</p>
        </section>
      ): null}

      {getRows.data ? (
          <div className="pt-4">
            <h2 className="text-xl font-bold pb-4">Amigo Secreto</h2>
            <p>Olá, <strong className="font-semibold">{getRows.data?.friend}</strong></p>
            <p>Seu amigo secreto é <span className="font-semibold">{getRows.data?.friend_secret}</span></p>
          </div>
      ): null}
    </section>
  )
}