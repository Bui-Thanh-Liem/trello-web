// console.log('import.meta.env.BUILD_MODE: ', import.meta.env);
// console.log('process.env.BUILD_MODE: ', process.env.BUILD_MODE);

let API_ROOT = 'localhost:3000';
if (process.env.BUILD_MODE === 'production') {
  API_ROOT = 'https://trello-api-wh8j.onrender.com';
}
export default API_ROOT;
