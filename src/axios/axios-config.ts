import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dev.tuitionaledu.com",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzI4MzgxNDExfQ.q1espZyAcK-0KgIRtobM4OMI2n_Y4UG8SQkBT0cYfY0",
  },
});

export default axiosInstance;
