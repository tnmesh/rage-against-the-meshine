import mallaAPI from "./ApiClient";

interface StatsResponse {
  active_nodes_24h: number;
}

export async function fetchStats() {
  try {
    return await mallaAPI.get<StatsResponse>(`/stats`);
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}