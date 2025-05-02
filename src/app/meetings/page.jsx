import  { Metadata } from "next"
import MeetingsOverview from "@/components/meetings/meetings-overview"

export const metadata = {
  title: "Meetings | Financial Dashboard",
  description: "Schedule, manage, and join your meetings.",
}

export default function MeetingsPage() {
  return <MeetingsOverview />
}
