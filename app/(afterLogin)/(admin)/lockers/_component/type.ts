export interface LockerItem {
  id: string;
  building: string;
  floor: string;
  zone: string;
  userName?: string;
  userDept?: string;
  userStudentId?: string;
  status: "available" | "inUse" | "broken" | "expired";
  period?: string;
  dDay?: string;
}
