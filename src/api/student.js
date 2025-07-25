import { apiClient } from "@/utils/apiClient";

export const jobDetailById = (id) => {
  return apiClient(`/jobs/${id}`, {
    method: "GET",
  });
};

export const applyToJob = (id) => {
  return apiClient(`/student/jobs/${id}/apply`, {
    method: "POST",
  });
};


export const getStudentProfile = async () => {
  const res = await apiClient("/student/profile", { method: "GET" });
  return res?.data?.profile;
};


export const getStudentJobs = async () => {
  const res = await apiClient("/student/jobs", {
    method: "GET",
  });
  return res?.data;
};

export const updateStudentProfile = async (data) => {
  return apiClient("/student/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};