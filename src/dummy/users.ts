import type { User } from "../types";

export const users: User[] = [
  {
    id: "usr-1",
    name: "Nadia Prameswari",
    email: "nadia@cpay.local",
    phone: "+62 812 1000 2010",
    role: "USER",
    status: "ACTIVE",
    createdAt: "2026-01-12T08:30:00.000Z",
  },
  {
    id: "usr-2",
    name: "Rama Putra",
    email: "rama@cpay.local",
    phone: "+62 813 4421 9080",
    role: "USER",
    status: "ACTIVE",
    createdAt: "2026-02-04T10:10:00.000Z",
  },
  {
    id: "adm-1",
    name: "Admin CPay",
    email: "admin@cpay.local",
    phone: "+62 811 7000 0001",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: "2025-12-01T04:00:00.000Z",
  },
];
