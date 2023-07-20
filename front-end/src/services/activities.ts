import { Activity, ActivityInput } from "@/utils";
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";

export function getActivities(): Promise<Activity[]> {
  return axiosInstance
    .get("/activities")
    .then((response: AxiosResponse<Activity[]>) => response.data);
}

export function getActivity(id: string): Promise<Activity> {
  return axiosInstance
    .get(`/activities/${id}`)
    .then((response: AxiosResponse<Activity>) => response.data);
}

export function createActivity(input: ActivityInput): Promise<Activity> {
  return axiosInstance
    .post("/activities", input)
    .then((response: AxiosResponse<Activity>) => response.data);
}