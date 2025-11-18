import { notFound } from "next/navigation"
import MeetingDetails from "@/components/meetings/meeting-details"
import { getMeetingById } from "@/components/meetings/meetings-data"

export const metadata = {
  title: "Meeting Details | Financial Dashboard",
  description: "View and manage meeting details",
}

export default function MeetingDetailsPage({ params }) {
  const meeting = getMeetingById(params.id)

  if (!meeting) {
    notFound()
  }

  return <MeetingDetails meeting={meeting} />
}
