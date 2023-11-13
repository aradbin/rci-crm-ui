const settings = [
    { label: 'Departments', value: 'department', icon: 'fa-solid fa-building' },
    { label: 'Designations', value: 'designation', icon: 'fa-solid fa-user-tie' },
    { label: 'Emails', value: 'email', icon: 'fa-solid fa-envelope' },
    { label: 'WhatsApps', value: 'whatsapp', icon: 'fa-brands fa-whatsapp' },
]

const priorities = [
    { name: "Low", id: 1 },
    { name: "Medium", id: 2 },
    { name: "High", id: 3 }
]

const statuses = [
    { label: "To Do", value: "todo", color: "dark" },
    { label: "In Progress", value: "inprogress", color: "info" },
    { label: "In Review", value: "inreview", color: "warning" },
    { label: "Done", value: "done", color: "success" },
]

export { settings, priorities, statuses }