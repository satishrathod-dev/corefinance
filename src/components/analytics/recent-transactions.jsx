import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const recentTransactions = [
  {
    id: "1",
    name: "Satish Rathod",
    email: "satish@example.com",
    amount: "+$350.00",
    status: "success",
    date: "2023-07-20",
    avatar:
      "/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  },
  {
    id: "2",
    name: "Preeti Pawar",
    email: "preeti@example.com",
    amount: "-$120.50",
    status: "pending",
    date: "2023-07-19",
    avatar:
      "/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
  },
  {
    id: "3",
    name: "Test User",
    email: "test@example.com",
    amount: "+$1,000.00",
    status: "success",
    date: "2023-07-18",
    avatar: "/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
  },
  {
    id: "4",
    name: "Test User",
    email: "test@example.com",
    amount: "-$50.75",
    status: "failed",
    date: "2023-07-17",
    avatar: "/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
  },
  {
    id: "5",
    name: "Test User",
    email: "test@example.com",
    amount: "+$720.00",
    status: "success",
    date: "2023-07-16",
    avatar: "/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {recentTransactions.map((transaction) => (
        <Card key={transaction.id} className="p-4">
          <CardContent className="flex items-center p-0">
            <Avatar className="h-10 w-10">
              <AvatarImage src={transaction.avatar} alt={transaction.name} />
              <AvatarFallback>{transaction.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{transaction.name}</p>
              <p className="text-xs text-muted-foreground">{transaction.email}</p>
            </div>
            <div className="ml-auto text-right">
              <p
                className={`text-sm font-medium ${transaction.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}
              >
                {transaction.amount}
              </p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
