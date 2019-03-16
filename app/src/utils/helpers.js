export const delay = (ms) => (result) => new Promise(resolve => setTimeout(()=>resolve(result), ms));
