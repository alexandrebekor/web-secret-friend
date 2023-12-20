import { EventsRowData } from "@/@types/Spreadsheet"
import { doc } from "@/libs/google-spreadsheet"

export const getTicketByIdAction = async ({ id }: { id: string }): Promise<{data?: EventsRowData, error?: string}> => {
  try {
    await doc.loadInfo()
    const sheet = doc.sheetsById[0]

    const rows = await sheet.getRows()

    const data = rows.find(row => row.toObject().page_id == id)

    if(!data) {
      return {
        error: 'Not Found'
      }
    }

    return {
      data: data.toObject()
    }
  } catch (error) {
    if(error instanceof Error) {
      return {
        error: error.message
      }
    }

    throw error
  }
}