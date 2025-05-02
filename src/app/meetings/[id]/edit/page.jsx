import { Metadata } from "next"
import { notFound } from "next/navigation"
import EditMeeting from "@/components/meetings/edit-meeting"
import { getMeetingById } from "@/components/meetings/meetings-data"

export const metadata = {
  title: "Edit Meeting | Financial Dashboard",
  description: "Edit meeting details",
}

export default function EditMeetingPage({ params }) {
  const meeting = getMeetingById(params.id)

  if (!meeting) {
    notFound()
  }

  return <EditMeeting meeting={meeting} />
}
