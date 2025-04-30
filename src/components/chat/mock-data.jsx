// Mock data for conversations
export const mockConversations = [
    {
      id: "conv-1",
      name: "Sarah Wilson",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
      lastMessage: {
        content: "Can you send me the financial report?",
        timestamp: "2023-07-20T14:30:00Z",
      },
      unreadCount: 2,
      isOnline: true,
      isGroup: false,
    },
    {
      id: "conv-2",
      name: "Marketing Team",
      avatar: "",
      lastMessage: {
        content: "Meeting at 3 PM today",
        timestamp: "2023-07-20T10:15:00Z",
      },
      unreadCount: 0,
      isOnline: false,
      isGroup: true,
      participants: [
        {
          id: "user-1",
          name: "Alex Johnson",
          avatar:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
          isAdmin: true,
        },
        {
          id: "user-2",
          name: "Samantha Lee",
          avatar:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
          isAdmin: false,
        },
        {
          id: "user-3",
          name: "Michael Chen",
          avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
          isAdmin: false,
        },
      ],
    },
    {
      id: "conv-3",
      name: "David Kim",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
      lastMessage: {
        content: "Let's discuss the new sales strategy",
        timestamp: "2023-07-19T16:45:00Z",
      },
      unreadCount: 0,
      isOnline: true,
      isGroup: false,
    },
    {
      id: "conv-4",
      name: "Finance Department",
      avatar: "",
      lastMessage: {
        content: "Budget updates for Q3",
        timestamp: "2023-07-19T09:30:00Z",
      },
      unreadCount: 5,
      isOnline: false,
      isGroup: true,
      participants: [
        {
          id: "user-4",
          name: "Emily Rodriguez",
          avatar:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
          isAdmin: true,
        },
        {
          id: "user-5",
          name: "David Kim",
          avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
          isAdmin: false,
        },
        {
          id: "user-6",
          name: "Sarah Wilson",
          avatar:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
          isAdmin: false,
        },
      ],
    },
    {
      id: "conv-5",
      name: "James Taylor",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
      lastMessage: {
        content: "I've updated the operations manual",
        timestamp: "2023-07-18T11:20:00Z",
      },
      unreadCount: 0,
      isOnline: false,
      isGroup: false,
    },
    {
      id: "conv-6",
      name: "Lisa Brown",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
      lastMessage: {
        content: "Customer feedback report is ready",
        timestamp: "2023-07-17T15:10:00Z",
      },
      unreadCount: 0,
      isOnline: true,
      isGroup: false,
    },
  ]
  
  // Mock data for messages
  export const mockMessages = [
    // Conversation 1 - Sarah Wilson
    {
      id: "msg-1-1",
      conversationId: "conv-1",
      senderId: "sarah-wilson",
      content: "Hi there! How's the quarterly financial report coming along?",
      timestamp: "2023-07-20T14:25:00Z",
      status: "read",
      type: "text",
    },
    {
      id: "msg-1-2",
      conversationId: "conv-1",
      senderId: "current-user",
      content: "Hey Sarah! It's almost done. Just finalizing some numbers.",
      timestamp: "2023-07-20T14:27:00Z",
      status: "read",
      type: "text",
    },
    {
      id: "msg-1-3",
      conversationId: "conv-1",
      senderId: "sarah-wilson",
      content: "Great! When do you think you can send it over?",
      timestamp: "2023-07-20T14:28:00Z",
      status: "read",
      type: "text",
    },
    {
      id: "msg-1-4",
      conversationId: "conv-1",
      senderId: "current-user",
      content: "I should have it ready by end of day. I'll email it to you.",
      timestamp: "2023-07-20T14:29:00Z",
      status: "read",
      type: "text",
    },
    {
      id: "msg-1-5",
      conversationId: "conv-1",
      senderId: "sarah-wilson",
      content: "Can you send me the financial report?",
      timestamp: "2023-07-20T14:30:00Z",
      status: "delivered",
      type: "text",
    },
    {
      id: "msg-1-6",
      conversationId: "conv-1",
      senderId: "sarah-wilson",
      content: "Actually, could you share it here instead? It would be easier to discuss.",
      timestamp: "2023-07-20T14:31:00Z",
      status: "delivered",
      type: "text",
    },
  
    // Conversation 2 - Marketing Team
    {
      id: "msg-2-1",
      conversationId: "conv-2",
      senderId: "alex-johnson",
      content: "Hey team, we need to discuss the new campaign strategy.",
      timestamp: "2023-07-20T10:00:00Z",
      status: "read",
      type: "text",
    },
    {
      id: "msg-2-2",
      conversationId: "conv-2",
      senderId: "samantha-lee",
      content: "I've prepared some ideas. Should we meet to go over them?",
      timestamp: "2023-07-20T10:05:00Z",
      status: "read",
      type: "text",
    },
    {
      id: "msg-2-3",
      conversationId: "conv-2",
      senderId: "current-user",
      content: "That sounds good. When are you all available?",
      timestamp: "2023-07-20T10:10:00Z",
      status: "read",
      type: "text",
    },
    {
      id: "msg-2-4",
      conversationId: "conv-2",
      senderId: "alex-johnson",
      content: "How about 3 PM today?",
      timestamp: "2023-07-20T10:12:00Z",
      status: "read",
      type: "text",
    },
    {
      id: "msg-2-5",
      conversationId: "conv-2",
      senderId: "michael-chen",
      content: "Works for me!",
      timestamp: "2023-07-20T10:13:00Z",
      status: "read",
      type: "text",
    },
    {
      id: "msg-2-6",
      conversationId: "conv-2",
      senderId: "samantha-lee",
      content: "Same here.",
      timestamp: "2023-07-20T10:14:00Z",
      status: "read",
      type: "text",
    },
    {
      id: "msg-2-7",
      conversationId: "conv-2",
      senderId: "alex-johnson",
      content: "Meeting at 3 PM today",
      timestamp: "2023-07-20T10:15:00Z",
      status: "read",
      type: "text",
    },
  
    // Conversation 3 - David Kim
    {
      id: "msg-3-1",
      conversationId: "conv-3",
      senderId: "david-kim",
      content: "Hi, I wanted to discuss our sales strategy for the next quarter.",
      timestamp: "2023-07-19T16:40:00Z",
      status: "read",
      type: "text",
    },
    {
      id: "msg-3-2",
      conversationId: "conv-3",
      senderId: "current-user",
      content: "Sure, I've been thinking about that too. What are your thoughts?",
      timestamp: "2023-07-19T16:42:00Z",
      status: "read",
      type: "text",
    },
    {
      id: "msg-3-3",
      conversationId: "conv-3",
      senderId: "david-kim",
      content: "I think we should focus more on enterprise clients. They've been showing more interest lately.",
      timestamp: "2023-07-19T16:44:00Z",
      status: "read",
      type: "text",
    },
    {
      id: "msg-3-4",
      conversationId: "conv-3",
      senderId: "david-kim",
      content: "Let's discuss the new sales strategy",
      timestamp: "2023-07-19T16:45:00Z",
      status: "read",
      type: "text",
    },
  
    // Add more mock messages for other conversations as needed
  ]
  