'use server'

import { EventsRowData } from "@/@types/Spreadsheet"
import { doc } from "@/libs/google-spreadsheet"

type createEventActionProps = {
  event_id: string
  friends: {
    page_id: string
    friend: string
    friend_secret: string
  }[]
}

export const createEventAction = async ({ event_id, friends }: createEventActionProps) => {
  try {
    await doc.loadInfo()
    const sheet = doc.sheetsById[0]

    const rows: EventsRowData[] = friends.map(friend => {
      return {
        event_id,
        ...friend
      }
    })

    await sheet.addRows(rows) 
  } catch (error) {
    if(error instanceof Error) {
      return {
        error: error.message
      }
    }

    throw error
  }
}