"use client"

import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"
import { addDays, addHours, subDays, subHours } from "date-fns"


// Generate sample meetings data
const now = new Date()
const sampleMeetings= [
  {
    id: "1",
    title: "Weekly Team Standup",
    description: "Regular team meeting to discuss progress and blockers",
    startTime: addHours(now, 1).toISOString(),
    endTime: addHours(now, 2).toISOString(),
    status: "scheduled",
    type: "team",
    organizer: "Jane Smith",
    participants: ["John Doe", "Alice Johnson", "Bob Brown", "You"],
    agenda: ["Review last week's progress", "Discuss current blockers", "Plan for the upcoming week"],
    resources: [
      { name: "Meeting Slides", url: "#" },
      { name: "Project Roadmap", url: "#" },
    ],
  },
  {
    id: "2",
    title: "Project Kickoff",
    description: "Initial meeting to start the new financial dashboard project",
    startTime: addDays(now, 1).toISOString(),
    endTime: addDays(addHours(now, 1), 1).toISOString(),
    status: "scheduled",
    type: "client",
    organizer: "You",
    participants: ["John Doe", "Alice Johnson", "Client Team"],
    agenda: ["Project overview", "Timeline discussion", "Resource allocation", "Next steps"],
  },
  {
    id: "3",
    title: "One-on-One with Manager",
    description: "Regular check-in with manager",
    startTime: subDays(now, 1).toISOString(),
    endTime: subDays(addHours(now, 1), 1).toISOString(),
    status: "completed",
    type: "one-on-one",
    organizer: "Jane Smith",
    participants: ["You", "Jane Smith"],
    notes:
      "Discussed career growth opportunities and current project challenges. Action items:\n- Research new visualization libraries\n- Schedule training for next month\n- Prepare quarterly review presentation",
  },
  {
    id: "4",
    title: "Product Demo",
    description: "Demonstrate new features to the client",
    startTime: addDays(now, 2).toISOString(),
    endTime: addDays(addHours(now, 1), 2).toISOString(),
    status: "scheduled",
    type: "presentation",
    organizer: "You",
    participants: ["Client Team", "Sales Team", "Product Team"],
    agenda: ["Introduction", "Feature demonstration", "Q&A", "Next steps"],
  },
  {
    id: "5",
    title: "Design Workshop",
    description: "Collaborative session to finalize UI designs",
    startTime: addDays(now, 3).toISOString(),
    endTime: addDays(addHours(now, 3), 3).toISOString(),
    status: "scheduled",
    type: "workshop",
    organizer: "Alice Johnson",
    participants: ["Design Team", "Product Team", "You"],
    agenda: [
      "Review current designs",
      "Identify improvement areas",
      "Collaborative design session",
      "Finalize designs",
    ],
  },
  {
    id: "6",
    title: "Budget Review",
    description: "Quarterly budget review meeting",
    startTime: subDays(now, 2).toISOString(),
    endTime: subDays(addHours(now, 2), 2).toISOString(),
    status: "completed",
    type: "team",
    organizer: "Finance Team",
    participants: ["Department Heads", "Finance Team", "You"],
    notes:
      "Reviewed Q2 expenses and planned budget for Q3. All departments are currently under budget except for Marketing which is 5% over due to the new campaign.",
  },
  {
    id: "7",
    title: "Interview: Senior Developer",
    description: "Interview candidate for the senior developer position",
    startTime: addHours(now, 4).toISOString(),
    endTime: addHours(now, 5).toISOString(),
    status: "scheduled",
    type: "one-on-one",
    organizer: "HR Team",
    participants: ["You", "HR Representative", "Candidate"],
    agenda: ["Introduction", "Technical assessment", "Culture fit discussion", "Candidate questions"],
  },
  {
    id: "8",
    title: "Emergency System Outage",
    description: "Address the current system outage",
    startTime: subHours(now, 3).toISOString(),
    endTime: subHours(now, 1).toISOString(),
    status: "completed",
    type: "team",
    organizer: "IT Support",
    participants: ["IT Team", "Development Team", "You"],
    notes:
      "Identified database connection issue as the root cause. Applied temporary fix and scheduled maintenance for permanent resolution.",
  },
]

// Create Zustand store
const useMeetingsStore = create((set) => ({
  meetings: sampleMeetings,
  addMeeting: (meeting) => {
    const id = uuidv4()
    set((state) => ({
      meetings: [...state.meetings, { ...meeting, id }],
    }))
    return id
  },
  updateMeeting: (id, updatedMeeting) => {
    set((state) => ({
      meetings: state.meetings.map((meeting) => (meeting.id === id ? updatedMeeting : meeting)),
    }))
  },
  deleteMeeting: (id) => {
    set((state) => ({
      meetings: state.meetings.filter((meeting) => meeting.id !== id),
    }))
  },
}))

// Export functions to interact with the store
export const getMeetings = () => useMeetingsStore.getState().meetings
export const getMeetingById = (id) => useMeetingsStore.getState().meetings.find((meeting) => meeting.id === id)
export const addMeeting = (meeting) => useMeetingsStore.getState().addMeeting(meeting)
export const updateMeeting = (id, meeting) => useMeetingsStore.getState().updateMeeting(id, meeting)
export const deleteMeeting = (id) => useMeetingsStore.getState().deleteMeeting(id)