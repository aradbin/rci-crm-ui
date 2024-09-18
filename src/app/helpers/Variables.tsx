export const settings = [
    { label: 'Services', value: 'service', icon: 'fa-solid fa-briefcase' },
    { label: 'Emails', value: 'email', icon: 'fa-solid fa-envelope' },
    { label: 'WhatsApps', value: 'whatsapp', icon: 'fa-brands fa-whatsapp' },
    { label: 'Phone', value: 'phone', icon: 'fa-solid fa-phone' },
    { label: 'VoIP', value: 'voip', icon: 'fa-solid fa-headphones' },
    { label: 'Departments', value: 'department', icon: 'fa-solid fa-building' },
    { label: 'Designations', value: 'designation', icon: 'fa-solid fa-user-tie' },
    // { label: 'Task Types', value: 'task', icon: 'fa-solid fa-list-check' },
    { label: 'Customer Informations', value: 'customer', icon: 'fa-solid fa-user' },
]

export const cycles = [
    { label: "One Time", value: "onetime" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly", value: "quarterly" },
    { label: "Yearly", value: "yearly" },
]

export const priorities = [
    { label: "Low", value: 1 },
    { label: "Medium", value: 2 },
    { label: "High", value: 3 }
]

export const customerPriorities = [
    { label: "Regular", value: 1 },
    { label: "Medium", value: 2 },
    { label: "High", value: 3 }
]

export const customerTypes = [
    { label: "Company", value: 'company' },
    { label: "Sole Trader", value: 'sole_trader' },
    { label: "Individual", value: 'individual' },
    { label: "Partnership", value: 'partnership' },
    { label: "Trust", value: 'trust' },
    { label: "Charity", value: 'charity' },
]

export const businessTypes = [
    { label: "Restaurant", value: 'restaurant' },
    { label: "Gym", value: 'gym' },
    { label: "Other", value: 'other' },
]

export const statuses = [
    { label: "To Do", value: "todo", color: "dark" },
    { label: "In Progress", value: "inprogress", color: "info" },
    { label: "In Review", value: "inreview", color: "warning" },
    { label: "Done", value: "done", color: "success" },
]

export const folders = [
    { label: "Inbox", value: "inbox", color: "success" },
    { label: "Sent", value: "sent", color: "info" },
    { label: "Spam", value: "spam", color: "warning" },
    { label: "Trash", value: "trash", color: "danger" },
]
