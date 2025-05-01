// Mock data for invoices
const invoices = [
    {
      id: "1",
      invoiceNumber: "INV-2023-001",
      client: {
        name: "Acme Corporation",
        email: "billing@acmecorp.com",
        phone: "(555) 123-4567",
        address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
      },
      status: "paid",
      issueDate: "2023-04-15",
      dueDate: "2023-05-15",
      items: [
        {
          description: "Website Development",
          quantity: 1,
          unitPrice: 3500,
        },
        {
          description: "Hosting (Annual)",
          quantity: 1,
          unitPrice: 600,
        },
      ],
      taxRate: 8.25,
      notes: "Thank you for your business!",
      totalAmount: 4435.75,
    },
    {
      id: "2",
      invoiceNumber: "INV-2023-002",
      client: {
        name: "Globex Industries",
        email: "accounts@globex.com",
        phone: "(555) 987-6543",
        address: "456 Corporate Park, Chicago, IL 60601",
      },
      status: "pending",
      issueDate: "2023-04-20",
      dueDate: "2023-05-20",
      items: [
        {
          description: "Consulting Services",
          quantity: 20,
          unitPrice: 150,
        },
        {
          description: "Travel Expenses",
          quantity: 1,
          unitPrice: 350,
        },
      ],
      taxRate: 6.5,
      notes: "Net 30 payment terms",
      totalAmount: 3372.25,
    },
    {
      id: "3",
      invoiceNumber: "INV-2023-003",
      client: {
        name: "Stark Industries",
        email: "finance@stark.com",
        phone: "(555) 555-5555",
        address: "1 Stark Tower, New York, NY 10001",
      },
      status: "overdue",
      issueDate: "2023-03-10",
      dueDate: "2023-04-10",
      items: [
        {
          description: "Advanced Technology Prototype",
          quantity: 1,
          unitPrice: 15000,
        },
        {
          description: "Technical Support (Monthly)",
          quantity: 3,
          unitPrice: 800,
        },
      ],
      taxRate: 8.875,
      notes: "Please remit payment immediately",
      totalAmount: 17712.5,
    },
    {
      id: "4",
      invoiceNumber: "INV-2023-004",
      client: {
        name: "Wayne Enterprises",
        email: "ap@wayne.com",
        phone: "(555) 333-4444",
        address: "1007 Mountain Drive, Gotham City, NJ 08701",
      },
      status: "paid",
      issueDate: "2023-04-05",
      dueDate: "2023-05-05",
      items: [
        {
          description: "Security System Installation",
          quantity: 1,
          unitPrice: 8500,
        },
        {
          description: "Monitoring Service (Annual)",
          quantity: 1,
          unitPrice: 1200,
        },
      ],
      taxRate: 7,
      notes: "Thank you for your prompt payment",
      totalAmount: 10379.0,
    },
    {
      id: "5",
      invoiceNumber: "INV-2023-005",
      client: {
        name: "Oscorp Industries",
        email: "payments@oscorp.com",
        phone: "(555) 777-8888",
        address: "5 Science Parkway, Boston, MA 02110",
      },
      status: "pending",
      issueDate: "2023-04-25",
      dueDate: "2023-05-25",
      items: [
        {
          description: "Research Collaboration",
          quantity: 1,
          unitPrice: 12000,
        },
        {
          description: "Laboratory Equipment",
          quantity: 5,
          unitPrice: 1500,
        },
      ],
      taxRate: 6.25,
      notes: "Please reference invoice number with payment",
      totalAmount: 19987.5,
    },
    {
      id: "6",
      invoiceNumber: "INV-2023-006",
      client: {
        name: "Daily Planet Media",
        email: "accounting@dailyplanet.com",
        phone: "(555) 222-3333",
        address: "1 Media Square, Metropolis, DE 19901",
      },
      status: "overdue",
      issueDate: "2023-03-15",
      dueDate: "2023-04-15",
      items: [
        {
          description: "Advertising Campaign",
          quantity: 1,
          unitPrice: 4500,
        },
        {
          description: "Social Media Management (Monthly)",
          quantity: 3,
          unitPrice: 900,
        },
      ],
      taxRate: 6,
      notes: "Payment is now overdue",
      totalAmount: 7614.0,
    },
  ]
  
  // Function to get all invoices with optional filter
  export const getInvoices = (filter = "all") => {
    if (filter === "all") {
      return invoices
    }
    return invoices.filter((invoice) => invoice.status === filter)
  }
  
  // Function to get a specific invoice by ID
  export const getInvoiceById = (id) => {
    return invoices.find((invoice) => invoice.id === id)
  }
  
  // Function to add a new invoice
  export const addInvoice = (invoiceData) => {
    const newId = (Number.parseInt(invoices[invoices.length - 1].id) + 1).toString()
    const newInvoiceNumber = `INV-2023-${newId.padStart(3, "0")}`
  
    const newInvoice = {
      id: newId,
      invoiceNumber: newInvoiceNumber,
      ...invoiceData,
      totalAmount: calculateInvoiceTotal(invoiceData),
    }
  
    invoices.push(newInvoice)
    return newInvoice
  }
  
  // Function to update an existing invoice
  export const updateInvoice = (id, invoiceData) => {
    const index = invoices.findIndex((invoice) => invoice.id === id)
    if (index === -1) return null
  
    const updatedInvoice = {
      ...invoices[index],
      ...invoiceData,
      totalAmount: calculateInvoiceTotal(invoiceData),
    }
  
    invoices[index] = updatedInvoice
    return updatedInvoice
  }
  
  // Function to delete an invoice
  export const deleteInvoice = (id) => {
    const index = invoices.findIndex((invoice) => invoice.id === id)
    if (index === -1) return false
  
    invoices.splice(index, 1)
    return true
  }
  
  // Helper function to calculate invoice total
  const calculateInvoiceTotal = (invoiceData) => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
    const tax = (subtotal * invoiceData.taxRate) / 100
    return subtotal + tax
  }
  