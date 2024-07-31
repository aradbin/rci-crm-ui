const settings = [
    { label: 'Services', value: 'service', icon: 'fa-solid fa-briefcase' },
    { label: 'Emails', value: 'email', icon: 'fa-solid fa-envelope' },
    { label: 'WhatsApps', value: 'whatsapp', icon: 'fa-brands fa-whatsapp' },
    { label: 'Phone', value: 'phone', icon: 'fa-solid fa-phone' },
    { label: 'VoIP', value: 'voip', icon: 'fa-solid fa-headphones' },
    { label: 'Departments', value: 'department', icon: 'fa-solid fa-building' },
    { label: 'Designations', value: 'designation', icon: 'fa-solid fa-user-tie' },
    { label: 'Task Types', value: 'task', icon: 'fa-solid fa-list-check' },
    { label: 'Customer Informations', value: 'customer', icon: 'fa-solid fa-user' },
]

const cycles = [
    { name: "One Time", id: "onetime" },
    { name: "Daily", id: "daily" },
    { name: "Weekly", id: "weekly" },
    { name: "Monthly", id: "monthly" },
    { name: "Quarterly", id: "quarterly" },
    { name: "Yearly", id: "yearly" },
]

const priorities = [
    { name: "Low", id: 1 },
    { name: "Medium", id: 2 },
    { name: "High", id: 3 }
]

const customerPriorities = [
    { name: "Regular", id: 1 },
    { name: "Medium", id: 2 },
    { name: "High", id: 3 }
]

const statuses = [
    { label: "To Do", value: "todo", color: "dark" },
    { label: "In Progress", value: "inprogress", color: "info" },
    { label: "In Review", value: "inreview", color: "warning" },
    { label: "Done", value: "done", color: "success" },
]

const folders = [
    { label: "Inbox", value: "inbox", color: "success" },
    { label: "Sent", value: "sent", color: "info" },
    { label: "Spam", value: "spam", color: "warning" },
    { label: "Trash", value: "trash", color: "danger" },
]

const email = [
    {
        email: 'info@rciglobal.org',
        password: '$Victoria12',
        smtp: 'auth.smtp.1and1.co.uk',
        port: '465',
        imap: 'imap.1and1.co.uk',
        imap_port: '993'
    },
    {
        email: 'payroll@rciglobal.org',
        password: 'Windsor.123@',
        smtp: 'auth.smtp.1and1.co.uk',
        port: '465',
        imap: 'imap.1and1.co.uk',
        imap_port: '993'
    },
    {
        email: 'vat@rciglobal.org',
        password: '$Windsor12',
        smtp: 'auth.smtp.1and1.co.uk',
        port: '465',
        imap: 'imap.1and1.co.uk',
        imap_port: '993'
    }
]

export { settings, cycles, priorities, customerPriorities, statuses, folders }