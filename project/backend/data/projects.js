export let projects = [
  {
    id: 1,
    title: "Website Redesign",
    client: "ABC Ltd",
    status: "In Progress",
    budget: 800000
  },
  {
    id: 2,
    title: "Mobile App Development",
    client: "XYZ Corporation",
    status: "In Progress",
    budget: 1500000
  },
  {
    id: 3,
    title: "ERP Implementation",
    client: "Tech Solutions",
    status: "Completed",
    budget: 2000000
  },
  {
    id: 4,
    title: "Cloud Migration",
    client: "Global Industries",
    status: "Planning",
    budget: 1200000
  },
  {
    id: 5,
    title: "Data Analytics Dashboard",
    client: "Finance Corp",
    status: "In Progress",
    budget: 900000
  }
];

export const setProjects = (newProjects) => {
  projects = newProjects;
};
