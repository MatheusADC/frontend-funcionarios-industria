import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/funcionarios",
});

export default {
  resetar: () => api.post("/resetar"),
  item31: () => api.get("/3-1-inserir"),
  item32: () => api.post("/3-2-remover-joao"),
  item33: () => api.get("/3-3-todos"),
  item34: () => api.post("/3-4-aplicar-aumento"),
  item35: () => api.get("/3-5-agrupar-resumo"),
  item36: () => api.get("/3-6-agrupados"),
  item38: () => api.get("/3-8-aniversariantes"),
  item39: () => api.get("/3-9-mais-velho"),
  item310: () => api.get("/3-10-ordenados"),
  item311: () => api.get("/3-11-total-salarios"),
  item312: () => api.get("/3-12-salarios-minimos"),
};
